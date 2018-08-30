import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from 'angularfire2/firestore';

import { Produto } from '../models';
import { BasicService } from './basic.service';

@Injectable({
  providedIn: 'root'
})
export class ProdutosService extends BasicService<Produto> {
  
  constructor(private db: AngularFirestore) {
    super(db)
   }
}