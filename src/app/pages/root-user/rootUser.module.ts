import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentsModule } from '../../components/components.module';
import { RootUserRoutingModule } from './rootUser.routing';
import { RootUserComponent } from './root-user.component';
import { EmpresasCreateComponent } from './empresas/empresas-create/empresas-create.component';
import { EmpresasListComponent } from './empresas/empresas-list/empresas-list.component';
import { EmpresasEditComponent } from './empresas/empresas-edit/empresas-edit.component';
import { UsuariosListComponent } from './usuarios/usuarios-list/usuarios-list.component';
import { UsuariosCreateComponent } from './usuarios/usuarios-create/usuarios-create.component';
import { ReactiveFormsModule } from '@Angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ComponentsModule,
    ReactiveFormsModule,
    RootUserRoutingModule
  ],
  declarations: [RootUserComponent, EmpresasCreateComponent, EmpresasListComponent,
                 EmpresasEditComponent, UsuariosListComponent, UsuariosCreateComponent],
  exports: [RootUserComponent]
})
export class RootUserModule { }
