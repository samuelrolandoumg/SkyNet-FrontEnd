import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AccessDeniedComponent } from './access-denied/access-denied.component';
import { IniciarSesionComponent } from './login/iniciar-sesion/iniciar-sesion.component';

const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: IniciarSesionComponent },
    { path: 'dashboard', component: DashboardComponent }, 
    { path: 'access-denied', component: AccessDeniedComponent }, 

  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
