import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IniciarSesionComponent } from './login/iniciar-sesion/iniciar-sesion.component';
import { authGuard } from './guards/auth.guard';
import { LayoutComponent } from './layout/layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AgregarClienteComponent } from './api-maps/agregar-cliente/agregar-cliente.component';
import { VerUbicacionClienteComponent } from './api-maps/ver-ubicacion-cliente/ver-ubicacion-cliente.component';
import { ConsultarClientesComponent } from './api-maps/consultar-clientes/consultar-clientes.component';
import { RegistrarVisitaComponent } from './visita/registrar-visita/registrar-visita.component';
import { ConsultarVisitasComponent } from './visita/consultar-visitas/consultar-visitas.component';
import { DetallesVisitaComponent } from './visita-tecnico/detalles-visita/detalles-visita.component';
import { RegistroDetalleVisitaComponent } from './visita-tecnico/registro-detalle-visita/registro-detalle-visita.component';
import { ListarClientesComponent } from './clientes/listar-clientes/listar-clientes.component';
import { EditarClienteComponent } from './clientes/editar-cliente/editar-cliente.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: IniciarSesionComponent },

  {
    path: '',
    component: LayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'agregar-cliente', component: AgregarClienteComponent },
      { path: 'ver-ubicacion-cliente', component: VerUbicacionClienteComponent },
      { path: 'consultar-clientes', component: ConsultarClientesComponent },
      { path: 'registrar-visita', component: RegistrarVisitaComponent },
      { path: 'consultar-visitas', component: ConsultarVisitasComponent },
      { path: 'detalle-visita', component: DetallesVisitaComponent },
      { path: 'registro-detalle-visita', component: RegistroDetalleVisitaComponent },
      { path: 'listar-clientes', component: ListarClientesComponent },
      { path: 'editar-cliente', component: EditarClienteComponent },
    ]
  },

  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
