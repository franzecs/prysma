import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@Angular/forms';

import { EmpresasService } from '../../../../shared/services';
import { Empresa } from '../../../../shared/models';
import { ModalMessage, MsgType } from '../../../../components';


@Component({
  selector: 'app-empresas-create',
  templateUrl: './empresas-create.component.html',
  styleUrls: ['./empresas-create.component.css']
})
export class EmpresasCreateComponent implements OnInit {

  @ViewChild(ModalMessage) modalMsg: ModalMessage;
  public formulario: FormGroup;
  private empresa: Empresa;

  constructor(
    private formBuilder: FormBuilder,
    private empresasService: EmpresasService,
  ) { }

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      id: [null],
      nome: [null, [Validators.required, Validators.minLength(3)]],
      cnpj: [null, [Validators.required, Validators.minLength(11)]],
      endereco: [null, [Validators.required, Validators.minLength(3)]],
      telefone: [null, [, Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      tipo: ['Matriz', [Validators.required]],
      matriz: [null],
      url_logo: [''],
    });

  }

  onSubmite() {
    this.empresa = this.formulario.value;
    this.save(this.empresa);
  }

  save(empresa: Empresa): void {
     this.empresasService.create('/empresas', empresa)
    .then(() => {this.openModal('Cadastrado realizado com sucesso!!', MsgType.SUCCESS); })
    .catch((error: Error) => {this.openModal(`Falha ao realizar o cadastro!! (${error.message})`, MsgType.ERROR); });
  }

  openModal(msg, type) {
    this.modalMsg.showMessage(msg, type);
  }
}
