import { importProvidersFrom } from '@angular/core';
import { provideRouter, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { provideHttpClient,withFetch } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms'; // IMPORTA FormsModule y ReactiveFormsModule
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AccessDeniedComponent } from './access-denied/access-denied.component';
import { ListarProductosComponent } from './listar-productos/listar-productos.component';
import { CrearProductoComponent } from './crear-producto/crear-producto.component';
import { EditarProductoComponent } from './editar-producto/editar-producto.component';
import { LogoutComponent } from './logout/logout.component';
import { CrearCategoriaComponent } from './crear-categoria/crear-categoria.component';
import { ListarCCComponent } from './listar-cc/listar-cc.component';

const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'dashboard', component: DashboardComponent }, 
    { path: 'access-denied', component: AccessDeniedComponent },
    { path: 'productos', component: ListarProductosComponent },
    { path: 'crear-productos', component: CrearProductoComponent },
    { path: 'editar-productos', component: EditarProductoComponent },
    { path: 'logout', component: LogoutComponent },
    { path: 'crear-categoria', component: CrearCategoriaComponent },
    { path: 'productoscc', component: ListarCCComponent },

];

export const appConfig = {
  providers: [
    provideRouter(routes),               
    provideHttpClient(withFetch()),                 
    importProvidersFrom(FormsModule,ReactiveFormsModule),    
  ],
};
