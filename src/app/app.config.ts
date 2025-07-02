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

export const appConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withFetch()),
    importProvidersFrom(FormsModule, ReactiveFormsModule),
    importProvidersFrom(BrowserAnimationsModule),
    provideToastr(),
  ],
};
