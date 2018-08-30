import { Component, OnInit, ViewChild } from '@angular/core';
import { ProdutosService } from '../../../../shared/services';
import { ListPage } from '../../../../shared/abstract/list.component';
import { Produto } from '../../../../shared/models';
import { PATH_PRODUTOS } from '../../../../config';

@Component({
  selector: 'app-produtos-list',
  templateUrl: './produtos-list.component.html',
  styleUrls: ['./produtos-list.component.css']
})
export class ProdutosListComponent extends ListPage<Produto> implements OnInit {
   
  constructor(private produtosService: ProdutosService) {
    super()
  }

  ngOnInit() {
    this.getList()
  }
  
  getList() {
    if (this.subscription) this.subscription.unsubscribe()  
    this.subscription = this.produtosService.getList(PATH_PRODUTOS)
                          .subscribe(resultado => {
                              this.objetos = resultado                              
                              this.fillTable()
                          })
  }

  deletar(evento){
    if(evento === true){
        this.produtosService.delete(PATH_PRODUTOS, this.idObj)
        this.getList()
    }
  }
}
