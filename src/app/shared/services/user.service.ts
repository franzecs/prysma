import { Injectable, EventEmitter } from '@angular/core';
import { Usuario } from '../models/usuario.model';
import { Observable } from 'rxjs';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from 'angularfire2/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  static emailCurrentUser: string;
  private dbPath = '/usuarios';
  public objRef: AngularFirestoreCollection<Usuario>;

  constructor(private dbf: AngularFirestore) {
    this.objRef = dbf.collection(this.dbPath);
  }

  findUser(): Observable<any> {
    return this.objRef.doc(localStorage.getItem('idUser')).valueChanges();
  }
}
