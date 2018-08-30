import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { OtikaComponent } from './otika.component';
import { ProdutosListComponent } from './produtos/produtos-list/produtos-list.component';
import { ProdutosCreateUpdateComponent } from './produtos/produtos-create-update/produtos-create-update.component';
import { ClientesListComponent } from './clientes/clientes-list/clientes-list.component';
import { ClientesCreateUpdateComponent } from './clientes/clientes-create-update/clientes-create-update.component';
import { PedidosListComponent } from './pedidos/pedidos-list/pedidos-list.component';
import { PedidosCreateUpdateComponent } from './pedidos/pedidos-create-update/pedidos-create-update.component';

const otikaRoutes = [
    { path: '', component: OtikaComponent,
        children: [
            { path: 'produtos', component: ProdutosListComponent },
            { path: 'produtos/:id/add', component: ProdutosCreateUpdateComponent },
            { path: 'produtos/:id/edit', component: ProdutosCreateUpdateComponent },

            { path: 'clientes', component: ClientesListComponent },
            { path: 'clientes/:id/add', component: ClientesCreateUpdateComponent },
            { path: 'clientes/:id/edit', component: ClientesCreateUpdateComponent },

            { path: 'pedidos', component: PedidosListComponent },
            { path: 'pedidos/:id/add', component: PedidosCreateUpdateComponent },
            { path: 'pedidos/:id/edit', component: PedidosCreateUpdateComponent },
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(otikaRoutes)],
    exports: [RouterModule]
})
export class OtikaRoutingModule { }
