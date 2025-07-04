import { importProvidersFrom } from '@angular/core';
import { provideRouter, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { provideToastr } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { IniciarSesionComponent } from './login/iniciar-sesion/iniciar-sesion.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { authGuard } from './guards/auth.guard';
import { AgregarClienteComponent } from './api-maps/agregar-cliente/agregar-cliente.component';
import { VerUbicacionClienteComponent } from './api-maps/ver-ubicacion-cliente/ver-ubicacion-cliente.component';
import { LayoutComponent } from './layout/layout.component';
import { ConsultarClientesComponent } from './api-maps/consultar-clientes/consultar-clientes.component';
import { RegistrarVisitaComponent } from './visita/registrar-visita/registrar-visita.component';
import { ConsultarVisitasComponent } from './visita/consultar-visitas/consultar-visitas.component';

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
      { path: 'consultar-visitas', component: ConsultarVisitasComponent }
    ]
  },

  { path: '**', redirectTo: '/login' }
];

export const appConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withFetch()),
    importProvidersFrom(FormsModule, ReactiveFormsModule),
    importProvidersFrom(BrowserAnimationsModule),
    provideToastr(),
  ],
};
