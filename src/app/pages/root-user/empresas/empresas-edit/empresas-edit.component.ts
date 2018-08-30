import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@Angular/forms';
import { Params, ActivatedRoute } from '@angular/router';

import { Empresa } from '../../../../shared/models';
import { EmpresasService } from '../../../../shared/services';
import { ModalMessage, MsgType } from '../../../../components';
import { PATH_EMPRESA } from '../../../../config';

@Component({
  selector: 'app-empresas-edit',
  templateUrl: './empresas-edit.component.html',
  styleUrls: ['./empresas-edit.component.css']
})
export class EmpresasEditComponent implements OnInit {

  @ViewChild(ModalMessage) modalMsg: ModalMessage;
  public empresa: Empresa;
  public id: string;
  public basePath = PATH_EMPRESA;
  public formulario: FormGroup;

  constructor(
    public empresasService: EmpresasService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute, ) { }

  ngOnInit() {
    this.route.params.subscribe((parametros: Params) => {
      this.empresasService.findId(PATH_EMPRESA, parametros['id'])
        .subscribe((objeto) => {
          this.empresa = objeto;

          this.formulario = this.formBuilder.group({
            id: [this.empresa.id],
            nome: [this.empresa.nome, [Validators.required]],
            cnpj: [this.empresa.cnpj, [Validators.required]],
            endereco: [this.empresa.cnpj, [Validators.required]],
            telefone: [this.empresa.telefone],
            email: [this.empresa.email, [Validators.required, Validators.email]],
            tipo: [this.empresa.tipo, [Validators.required]],
            matriz: [this.empresa.matriz],
            url_logo: [this.empresa.url_logo],
          });
          this.id = this.formulario.value.id;
        });
    });
  }

  preparaObjeto() {
    this.empresa = this.formulario.value;
    this.update(this.empresa);
  }

  update(empresa: Empresa) {
    this.empresasService.update(PATH_EMPRESA, empresa.id, empresa)
    .then(() => {this.openModal('Dados editados com sucesso!!', MsgType.SUCCESS); })
    .catch(() => {this.openModal('Falha ao editar!!', MsgType.ERROR); });
  }

  openModal(msg, type) {
    this.modalMsg.showMessage(msg, type);
  }

  receiveUrl(evento) {
   this.empresasService.update(PATH_EMPRESA, this.id, {url_logo: evento});
  }

  form() {
    console.log(this.formulario);
  }
}
