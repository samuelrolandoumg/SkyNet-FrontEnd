import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Usuario } from '../../interfaces/usuario.interface';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  isCollapsed = false;
  clienteExpanded = false;
  usuarioExpanded = false;
  visitasExpanded: boolean = false;

  usuario: Usuario | null = null;
  @Output() colapsado = new EventEmitter<boolean>();

  // Variables para controlar la visibilidad del submenu
  puedeAgregarEditar = false;
  puedeConsultar = false;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.usuario = this.authService.obtenerUsuario();

    if (this.usuario?.rol === 'ADMIN') {
      this.puedeAgregarEditar = true;
      this.puedeConsultar = true;
    } else if (this.usuario?.rol === 'SUPERVISOR') {
      this.puedeAgregarEditar = false;
      this.puedeConsultar = true;
    }
  }

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
    this.colapsado.emit(this.isCollapsed);
  }

  toggleClientes() {
    this.clienteExpanded = !this.clienteExpanded;
  }

  toggleUsuarios() {
    this.usuarioExpanded = !this.usuarioExpanded;
  }

  toggleVisitas(): void {
    this.visitasExpanded = !this.visitasExpanded;
  }

  rutaDashboard(): string {
    if (this.usuario?.rol === 'TECNICO') return '/reporte-tecnico';
    if (this.usuario?.rol === 'SUPERVISOR') return '/reporte-supervisor';
    if (this.usuario?.rol === 'ADMIN') return '/reporte-admin';
    return '/dashboard-admin';
  }

  rutaConsultarVisitas(): string {
    if (this.usuario?.rol === 'SUPERVISOR') {
      return '/consultar-visitas-supervisor';
    };
    if (this.usuario?.rol === 'ADMIN') {
      return '/consultar-visitas-supervisor';
    }
    return '/consultar-visitas';
  }

}
