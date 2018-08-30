import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalMessage, MsgType } from '../../../../components/modal-util/modal-message.component';
import { PATH_USUARIO } from '../../../../config';
import { Usuario } from '../../../../shared/models';
import { UsuariosService } from '../../../../shared/services';
import { ListPage } from '../../../../shared/abstract/list.component';

@Component({
  selector: 'app-usuarios-list',
  templateUrl: './usuarios-list.component.html',
  styleUrls: ['./usuarios-list.component.css']
})
export class UsuariosListComponent extends ListPage<Usuario> implements OnInit {

  constructor(private usuariosService: UsuariosService) {
    super();
  }

  ngOnInit() {
    this.getList();
  }

  getList() {
    if (this.subscription) { this.subscription.unsubscribe(); }
    this.subscription = this.usuariosService.getList(PATH_USUARIO)
                          .subscribe(resultado => {
                              this.objetos = resultado;
                              this.fillTable();
                          });
  }

  deletar(evento) {
    if (evento === true) {
        this.usuariosService.delete(PATH_USUARIO, this.idObj);
        this.getList();
    }
  }

  resetPassword(email) {
    this.usuariosService.resetPassword(email);
    this.modalMsg.showMessage(`Redefinição de senha solicitada, verifique seu e-mail: ${email}`, MsgType.SUCCESS);
  }

  isAtivo(status, key) {
    if (status === false) {
      this.usuariosService.update(PATH_USUARIO, key, {isAtivo: true});
    } else {
      this.usuariosService.update(PATH_USUARIO, key, {isAtivo: false});
    }
  }

}
