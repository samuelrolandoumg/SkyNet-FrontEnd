// import { CommonModule } from '@angular/common';
// import { Component, OnInit } from '@angular/core';
// import { FormsModule } from '@angular/forms';
// import { RouterModule } from '@angular/router';
// import { Usuario } from '../../interfaces/usuario.interface';
// import { AuthService } from '../../services/auth.service';
// import { Output, EventEmitter } from '@angular/core';


// @Component({
//   selector: 'app-sidebar',
//   standalone: true,
//   imports: [CommonModule, FormsModule, RouterModule],
//   templateUrl: './sidebar.component.html',
//   styleUrl: './sidebar.component.css'
// })
// export class SidebarComponent implements OnInit {
//   isCollapsed = false;
//   usuario: Usuario | null = null;
//   modulosVisibles: { path: string; label: string; icon: string }[] = [];
//   @Output() colapsado = new EventEmitter<boolean>();
//   constructor(private authService: AuthService) { }

//   ngOnInit() {
//     this.usuario = this.authService.obtenerUsuario();


//     const modulos = [
//       { path: '/dashboard', label: 'Dashboard', icon: 'fa-chart-line' },
//       { path: '/agregar-ubicacion', label: 'Clientes', icon: 'fa-users' },
//       { path: '/reportes', label: 'Reportes', icon: 'fa-file-lines' },
//       { path: '/configuracion', label: 'Configuración', icon: 'fa-gear' },
//     ];

//     if (this.usuario?.rol === 'ADMIN') {
//       this.modulosVisibles = modulos;
//     } else if (this.usuario?.rol === 'SUPERVISOR') {
//       this.modulosVisibles = modulos.filter(m =>
//         ['/dashboard', '/reportes'].includes(m.path)
//       );
//     }
//     // Si no hay rol válido o nulo, no muestra nada
//   }


//   toggleSidebar() {
//     this.isCollapsed = !this.isCollapsed;
//     this.colapsado.emit(this.isCollapsed);
//   }
// }

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
  usuario: Usuario | null = null;
  @Output() colapsado = new EventEmitter<boolean>();

  // Variables para controlar la visibilidad del submenu
  puedeAgregarEditar = false;
  puedeConsultar = false;

  constructor(private authService: AuthService) {}

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
}
