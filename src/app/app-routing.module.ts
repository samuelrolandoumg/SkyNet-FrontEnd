import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { IniciarSesionComponent } from './login/iniciar-sesion/iniciar-sesion.component';
import { authGuard } from './guards/auth.guard'; // Importar el guard
import { AgregarUbicacionComponent } from './api-maps/agregar-ubicacion/agregar-ubicacion.component';
import { VerUbicacionClienteComponent } from './api-maps/ver-ubicacion-cliente/ver-ubicacion-cliente.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: IniciarSesionComponent },
  { path: 'agregar-ubicacion', component: AgregarUbicacionComponent },
  { path: 'ver-ubicacion-cliente', component: VerUbicacionClienteComponent },

  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard]
  },
  { path: '**', redirectTo: '/login' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
