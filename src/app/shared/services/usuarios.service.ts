import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';

import { Usuario } from '../models';
import { BasicService } from '../services/basic.service';
import { AuthService } from '../../config/auth.service';
import { UsuarioDTO } from '../dto/usuario.dto';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService extends BasicService<Usuario> {

  constructor(
    private auth: AuthService,
    private db: AngularFirestore) {
    super(db);
  }

  create(_path, usuario: Usuario): Promise<any> {
    return this.auth.createUser(usuario)
      .then(() => {
        delete usuario.senha;
        this.db.collection(`${_path}`).doc(btoa(usuario.email)).set({ ...usuario });
      });
  }

  resetPassword(email) {
    this.auth.ResetPassword(email);
  }
}
