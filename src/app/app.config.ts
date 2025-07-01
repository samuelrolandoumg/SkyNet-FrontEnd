import { importProvidersFrom } from '@angular/core';
import { provideRouter, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { provideToastr } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideHttpClient,withFetch } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms'; 
import { DashboardComponent } from './dashboard/dashboard.component';
import { AccessDeniedComponent } from './access-denied/access-denied.component';
import { IniciarSesionComponent } from './login/iniciar-sesion/iniciar-sesion.component';


const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardComponent }, 
    { path: 'access-denied', component: AccessDeniedComponent },
    { path: 'login', component: IniciarSesionComponent   }, 

];

export const appConfig = {
  providers: [
    provideRouter(routes),               
    provideHttpClient(withFetch()),                 
    importProvidersFrom(FormsModule,ReactiveFormsModule),    
    importProvidersFrom(BrowserAnimationsModule),
    provideToastr(), 
  ],
};
