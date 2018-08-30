import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from 'angularfire2/firestore';

export abstract class BasicService<T>{

    private dbPath = "/empresas" 
    public objRef: AngularFirestoreCollection<T>
         
    constructor(private dbf: AngularFirestore) {
      this.objRef = dbf.collection(this.dbPath)
    }

    create(_path, objeto: any): Promise<any> {
      return this.dbf.collection<T>(`${_path}`).add({...objeto})
                .then((resposta: DocumentReference)=> {
                  this.dbf.collection<T>(`${_path}`).doc(resposta.id).update({ "id": resposta.id})
                })
    }
   
    update(_path, key: string, value: any):Promise<any>{
      return this.dbf.collection<T>(`${_path}`).doc<T>(key).update(value)
                  .catch(error => this.handleError(error))
    }
   
    delete(_path, key: string): void{ 
      this.dbf.collection<T>(`${_path}`).doc<T>(key).delete().catch(error => this.handleError(error));
    }
    
    getList(_path): Observable<T[]> {
      let lista: Observable<T[]> = this.dbf.collection<T>(`${_path}`, ref=>
                                        ref.orderBy("nome")
                                      ).valueChanges()
      return lista                                
    }
   
    findId(_path, key: any): Observable<T>{
      return this.dbf.collection<T>(`${_path}`).doc<T>(key).valueChanges()
    }
   
    private handleError(error) {
      console.log(error);
    }
}