import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AccessDeniedComponent } from './access-denied/access-denied.component';
import { ListarProductosComponent } from './listar-productos/listar-productos.component';
import { CrearProductoComponent } from './crear-producto/crear-producto.component';
import { EditarProductoComponent } from './editar-producto/editar-producto.component';
import { LogoutComponent } from './logout/logout.component';
import { CrearCategoriaComponent } from './crear-categoria/crear-categoria.component';

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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
