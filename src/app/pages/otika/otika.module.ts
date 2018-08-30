import { ReactiveFormsModule } from '@Angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentsModule } from '../../components/components.module';
import { OtikaComponent } from './otika.component';
import { OtikaRoutingModule } from './otika.routing';
import { ProdutosCreateUpdateComponent } from './produtos/produtos-create-update/produtos-create-update.component';
import { ProdutosListComponent } from './produtos/produtos-list/produtos-list.component';
import { PedidosCreateUpdateComponent } from './pedidos/pedidos-create-update/pedidos-create-update.component';
import { ClientesCreateUpdateComponent } from './clientes/clientes-create-update/clientes-create-update.component';
import { PedidosListComponent } from './pedidos/pedidos-list/pedidos-list.component';
import { ClientesListComponent } from './clientes/clientes-list/clientes-list.component';

@NgModule({
  imports: [
    CommonModule,
    ComponentsModule,
    ReactiveFormsModule,
    OtikaRoutingModule
  ],
  declarations: [
    OtikaComponent,
    ProdutosListComponent,
    ProdutosCreateUpdateComponent,
    PedidosListComponent,
    PedidosCreateUpdateComponent,
    ClientesListComponent,
    ClientesCreateUpdateComponent],
  exports: [OtikaComponent]
})
export class OtikaModule {}
