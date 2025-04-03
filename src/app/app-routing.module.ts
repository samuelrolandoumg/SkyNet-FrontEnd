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
import { ListarCCComponent } from './listar-cc/listar-cc.component';
import { SignupComponent } from './signup/signup.component';
import { ListarCategoriaComponent } from './listar-categoria/listar-categoria.component';
import { EditarCategoriaComponent } from './editar-categoria/editar-categoria.component';
import { CrearUsuarioComponent } from './usuario/crear-usuario/crear-usuario.component'; 
import { ListarUsuarioComponent } from './usuario/listar-usuario/listar-usuario.component'; 
import { CrearFarmaciaComponent } from './farmacia/crear-farmacia/crear-farmacia.component';
import { ListarFarmaciasComponent } from './farmacia/listar-farmacias/listar-farmacias.component'; 
import { EditarUsuarioComponent } from './usuario/editar-usuario/editar-usuario.component';
import { CrearProveedorComponent } from './proveedor/crear-proveedor/crear-proveedor.component';
import { ListarProveedoresComponent } from './proveedor/listar-proveedores/listar-proveedores.component';
import { EditarProveedorComponent } from './proveedor/editar-proveedor/editar-proveedor.component';
import { AgregarInventarioComponent } from './inventario/agregar-inventario/agregar-inventario.component';
import { ListarInventarioComponent } from './inventario/listar-inventario/listar-inventario.component';
import { HistorialInventarioComponent } from './inventario/historial-inventario/historial-inventario.component';

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
    { path: 'singup', component: SignupComponent },
    { path: 'categorias', component: ListarCategoriaComponent },
    { path: 'editar-categoria', component: EditarCategoriaComponent },
    { path: 'crear-usuario', component: CrearUsuarioComponent }, 
    { path: 'usuarios', component: ListarUsuarioComponent }, 
    { path: 'crear-farmacia', component: CrearFarmaciaComponent },
    { path: 'farmacias', component: ListarFarmaciasComponent },
    { path: 'editar-usuario', component: EditarUsuarioComponent },
    { path: 'crear-proveedor', component: CrearProveedorComponent },
    { path: 'proveedores', component: ListarProveedoresComponent },
    { path: 'editar-proveedor', component: EditarProveedorComponent },
    { path: 'agregar-inventario', component: AgregarInventarioComponent },
    { path: 'inventario-general', component: ListarInventarioComponent },
    { path: 'historial-inventario', component: HistorialInventarioComponent },

  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
