import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@Angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { tap, map, switchMap } from 'rxjs/operators';
import { empty } from 'rxjs';

import { Cidade, Empresa, Endereco, EstadoBr, Listas, Usuario } from '../../../../shared/models'
import { CheckboxItem, ModalMessage, MsgType } from '../../../../components'
import { UsuariosService, EmpresasService, ConsultaCepService } from '../../../../shared/services';
import { PATH_USUARIO, PATH_EMPRESA } from '../../../../config';

@Component({
  selector: 'app-usuarios-create',
  templateUrl: './usuarios-create.component.html',
  styleUrls: ['./usuarios-create.component.css']
})
export class UsuariosCreateComponent implements OnInit {

  @ViewChild(ModalMessage) modalMsg: ModalMessage
  formulario: FormGroup
  usuario: Usuario
  id: string
  pathUpload = PATH_USUARIO
  empresas: Empresa[]
  perfis: string[]
  userPerfis = new Array<CheckboxItem>();
  endereco: Endereco
  estados: EstadoBr[];
  cidades: Cidade[];


  constructor(
    private formBuilder: FormBuilder,
    private usuariosService: UsuariosService,
    private empresasService: EmpresasService,
    private cepService: ConsultaCepService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.route.params.subscribe((parametros: Params) => {
      if (parametros['id'] === '0') {
        this.newRecord()
      } else {
        this.editRecord(parametros)
      }
    })
  }

  newRecord() {
    this.listFactory()
    this.userPerfis = Listas._perfil.map(x => new CheckboxItem(x.perfil, x.perfil));

    this.formulario = this.formBuilder.group({
      id: [null],
      nome: [null, [Validators.required, Validators.minLength(3)]],
      email: [null, [Validators.required, Validators.email]],
      empresa: [null, [Validators.required]],
      endereco: this.formBuilder.group({
        cep: [null, [Validators.required]],
        numero: [null],
        complemento: [null],
        logradouro: [null, Validators.required],
        bairro: [null, Validators.required],
        cidade: [null, Validators.required],
        estado: [null, Validators.required]
      }),
    })
    this.chageCitys()
  }

  onSubmite() {
    if(this.formulario.value.id === null){
      this.usuario = new Usuario(
        btoa(this.formulario.value.email),
        this.formulario.value.nome,
        "A23456",
        this.formulario.value.email,
        this.perfis,
        true,
        this.formulario.value.endereco,
        this.formulario.value.empresa,
        ""
      )
      this.save(this.usuario)
    }else{
      this.usuario = this.formulario.value
      this.update(this.usuario)
    }
  }

  save(usuario: Usuario): void {
    this.usuariosService.create(PATH_USUARIO, usuario)
      .then(() => {
        this.openModal("Cadastro realizado com sucesso!!", MsgType.SUCCESS)
        this.resetForm()
      })
      .catch((error: Error) => { this.openModal(`Falha ao realizar cadastro!! (${error.message})`, MsgType.ERROR) })
  }

  editRecord(parametros) {
    this.usuariosService.findId(PATH_USUARIO, parametros['id'])
      .subscribe((usuario) => {
        this.usuario = usuario
        this.cepService.getCidadeNome(this.usuario.endereco.cidade).subscribe(dados => this.cidades = dados)
        this.userPerfis = Listas._perfil.map(x => {
          if (this.usuario.perfis.includes(x.perfil)) {
            return new CheckboxItem(x.perfil, x.perfil, true)
          } else {
            return new CheckboxItem(x.perfil, x.perfil, false)
          }
        })

        this.onRolesChange(this.usuario.perfis)

        this.listFactory()

        this.formulario = this.formBuilder.group({
          id: [this.usuario.id],
          nome: [this.usuario.nome, [Validators.required, Validators.minLength(3)]],
          email: [this.usuario.email, [Validators.required, Validators.email]],
          empresa: [this.usuario.empresa, [Validators.required]],

          endereco: this.formBuilder.group({
            cep: [this.usuario.endereco.cep, [Validators.required]],
            numero: [this.usuario.endereco.numero, Validators.required],
            complemento: [this.usuario.endereco.complemento],
            logradouro: [this.usuario.endereco.logradouro, Validators.required],
            bairro: [this.usuario.endereco.bairro, Validators.required],
            estado: [this.usuario.endereco.estado, Validators.required],
            cidade: [this.usuario.endereco.cidade, Validators.required],
          }),
        })
        this.chageCitys()
        this.id = this.formulario.value.id
      })
  }

  update(usuario: Usuario){
    this.usuariosService.update(PATH_USUARIO,usuario.id, usuario)
    .then(()=>{this.openModal("Dados editados com sucesso!!", MsgType.SUCCESS)})
    .catch(()=>{this.openModal("Falha ao editar!!", MsgType.ERROR)})
  }

  receiveUrl(evento){
   this.usuariosService.update(PATH_USUARIO, this.id, {url_perfil:evento})
  }

  listFactory() {
    this.empresasService.getList(PATH_EMPRESA).subscribe(empresas => this.empresas = empresas)
    this.cepService.getEstadosBr().subscribe(dados => this.estados = dados);
  }

  openModal(msg, type) {
    this.modalMsg.showMessage(msg, type)
  }

  onRolesChange(value) {
    this.perfis = value
  }

  resetForm() {
    this.formulario.reset()
    this.userPerfis = Listas._perfil.map(x => new CheckboxItem(x.perfil, x.perfil));
  }

  chageCitys(){
    this.formulario.get('endereco.estado').valueChanges
      .pipe(
        map(estado => this.estados.filter(e => e.sigla === estado)),
        map(estados => estados && estados.length > 0 ? estados[0].id : empty()),
        switchMap((estadoId: number) => this.cepService.getCidades(estadoId)),
      )
      .subscribe(cidades => this.cidades = cidades);
  }

  consultaCEP() {
    const cep = this.formulario.get('endereco.cep').value;

    if (cep != null && cep !== '') {
      this.cepService.consultaCEP(cep).subscribe((endereco: Endereco) => {
        this.populaDadosForm(endereco)
      })
    }
  }

  populaDadosForm(endereco) {
    this.formulario.patchValue({
      endereco: {
        cep: endereco.cep,
        logradouro: endereco.logradouro,
        complemento: endereco.complemento,
        bairro: endereco.bairro,
        cidade: endereco.localidade,
        estado: endereco.uf
      }
    });
  }

  testEmpresa(emp1: Empresa, emp2: Empresa){
    return emp1 && emp2 ? (emp1.nome === emp2.nome && emp1.id === emp2.id) : emp1 === emp2
  }
}