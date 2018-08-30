import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@Angular/forms'
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AcessoComponent } from './acesso.component';
import { LoginComponent } from './login/login.component';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ComponentsModule,
  ],
  providers: [],
  declarations: [AcessoComponent, LoginComponent],
  exports: [AcessoComponent, LoginComponent]
})
export class AcessoModule { }
