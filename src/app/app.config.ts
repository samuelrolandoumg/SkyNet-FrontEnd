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
import { DetallesVisitaComponent } from './visita-tecnico/detalles-visita/detalles-visita.component';
import { RegistroDetalleVisitaComponent } from './visita-tecnico/registro-detalle-visita/registro-detalle-visita.component';
import { ListarClientesComponent } from './clientes/listar-clientes/listar-clientes.component';
import { EditarClienteComponent } from './clientes/editar-cliente/editar-cliente.component';
import { CrearUsuarioComponent } from './usuarios/crear-usuario/crear-usuario.component';
import { ListarUsuariosComponent } from './usuarios/listar-usuarios/listar-usuarios.component';
import { EditarUsuarioComponent } from './usuarios/editar-usuario/editar-usuario.component';
import { DashboardTecnicoComponent } from './dashboard/dashboard-tecnico/dashboard-tecnico.component';
import { ConsultarVisitasSupervisorComponent } from './visita/consultar-visitas-supervisor/consultar-visitas-supervisor.component';
import { ReporteTecnicoComponent } from './reporte/reporte-tecnico/reporte-tecnico.component';
import { ReporteSupervisorComponent } from './reporte/reporte-supervisor/reporte-supervisor.component';
import { ReporteAdminComponent } from './reporte/reporte-admin/reporte-admin.component';
import { ReporteSupervisorVisitasComponent } from './reporte/reporte-supervisor-visitas/reporte-supervisor-visitas.component';
import { ConsultarVisitasTecnicoComponent } from './visita/consultar-visitas-tecnico/consultar-visitas-tecnico.component';
import { CambiarPasswordComponent } from './configuracion/cambiar-password/cambiar-password.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: IniciarSesionComponent },

  {
    path: '',
    component: LayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent },

      { path: 'registrar-visita', component: RegistrarVisitaComponent },
      { path: 'consultar-visitas', component: ConsultarVisitasComponent },
      { path: 'detalle-visita', component: DetallesVisitaComponent },
      { path: 'registro-detalle-visita', component: RegistroDetalleVisitaComponent },
      { path: 'consultar-visitas-supervisor', component: ConsultarVisitasSupervisorComponent },


      { path: 'listar-clientes', component: ListarClientesComponent },
      { path: 'editar-cliente', component: EditarClienteComponent },
      { path: 'agregar-cliente', component: AgregarClienteComponent },
      { path: 'ver-ubicacion-cliente', component: VerUbicacionClienteComponent },
      { path: 'consultar-clientes', component: ConsultarClientesComponent },

      { path: 'crear-usuario', component: CrearUsuarioComponent },
      { path: 'listar-usuario', component: ListarUsuariosComponent },
      { path: 'editar-usuario', component: EditarUsuarioComponent },

      { path: 'dashboard-tecnico', component: DashboardTecnicoComponent },

      { path: 'reporte-tecnico', component: ReporteTecnicoComponent },
      { path: 'reporte-supervisor', component: ReporteSupervisorComponent },
      { path: 'reporte-admin', component: ReporteAdminComponent },
      { path: 'reporte-supervisor-visitas', component: ReporteSupervisorVisitasComponent },
      { path: 'reporte-tecnico-visitas', component: ConsultarVisitasTecnicoComponent },

      { path: 'cambiar-contraseña', component: CambiarPasswordComponent },

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
