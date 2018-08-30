import { Component, OnInit, ViewChild } from '@angular/core';

import { EmpresasService } from '../../../../shared/services';
import { Empresa } from '../../../../shared/models';
import { pageConfig, ModalMessage, MsgType } from '../../../../components';
import { PATH_EMPRESA } from '../../../../config';

@Component({
  selector: 'app-empresas-list',
  templateUrl: './empresas-list.component.html',
  styleUrls: ['./empresas-list.component.css']
})
export class EmpresasListComponent implements OnInit, pageConfig {
  public empresas: Empresa[];

  objFilter: Empresa[];

  @ViewChild(ModalMessage)
  modalMsg: ModalMessage;
  idObj: string;
  subscription: any;

  tableObj: any[];
  pagina: number;
  qtdPorPagina: number;
  totalReg: number;

  constructor(private empresasService: EmpresasService) {}

  ngOnInit() {
    this.getList();
  }

  getList() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.subscription = this.empresasService
      .getList(PATH_EMPRESA)
      .subscribe(resultado => {
        this.empresas = resultado;
        this.objFilter = resultado;
        this.fillTable();
      });
  }

  deletar(evento) {
    if (evento === true) {
      this.empresasService.delete(PATH_EMPRESA, this.idObj);
      this.getList();
    }
  }

  page($event: any) {
    this.pagina = $event - 1;
    this.fillTable();
  }

  fillTable() {
    this.tableObj = this.objFilter;
    for (
      let i = this.pagina * this.qtdPorPagina;
      i < this.pagina * this.qtdPorPagina + this.qtdPorPagina;
      i++
    ) {
      if (i >= this.objFilter.length) {
        break;
      }
      this.tableObj.push(this.objFilter[i]);
    }
  }

  openModal(idOBJ, nome) {
    this.idObj = idOBJ;
    this.modalMsg.showMessage(
      'Deseja realmente exluir a Empresa: ' + nome,
      MsgType.DELETE
    );
  }

  filter(evento) {
    this.objFilter = this.empresas.filter(obj =>
      new RegExp(evento).test(obj['nome'])
    );
    this.fillTable();
  }
}
