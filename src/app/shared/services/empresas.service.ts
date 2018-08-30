import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Empresa } from '../models';
import { BasicService } from '../services/basic.service';

@Injectable({
  providedIn: "root"
})
export class EmpresasService extends BasicService<Empresa> {
  
  constructor(private db: AngularFirestore) {
    super(db)
   }
}
