
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth-guard.service';
import { AcessoComponent } from '../pages/acesso/acesso.component';
import { HomeComponent } from '../pages/layout/home/home.component';

const routes: Routes = [

    {   path: 'admin', component: HomeComponent, canActivate: [AuthGuard],
        children: [
            {
                path: 'otika',
                loadChildren: '../pages/otika/otika.module#OtikaModule',
                canActivate: [AuthGuard]
            },
            {
                path: 'root',
                loadChildren: '../pages/root-user/rootUser.module#RootUserModule',
                canActivate: [AuthGuard]
            },
        ]
    },
    {   path: '', component: AcessoComponent },
    {   path: '**', component: AcessoComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
