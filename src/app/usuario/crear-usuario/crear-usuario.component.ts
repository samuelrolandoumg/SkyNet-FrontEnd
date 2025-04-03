// import { Component } from '@angular/core';
// import { Router } from '@angular/router';
// import { FormsModule } from '@angular/forms';
// import { CommonModule } from '@angular/common';
// import { UsuarioService } from '../../services/usuario.service';
// import { ToastrService } from 'ngx-toastr';

// @Component({
//   selector: 'app-crear-usuario',
//   templateUrl: './crear-usuario.component.html',
//   styleUrls: ['./crear-usuario.component.css'],
//   standalone: true,
//   imports: [CommonModule, FormsModule]
// })
// export class CrearUsuarioComponent {
//   nombre: string = '';
//   email: string = '';
//   password: string = '';
//   telefono: string = '';
//   rol: string = '';
//   mensajeError: string = '';
//   mensajeExito: string = ''; 


//   rolesDisponibles = ['operador', 'vendedor', 'admin', 'ccagent'];

//   constructor(
//     private usuariosService: UsuarioService,
//     private router: Router,
//     private toastr: ToastrService
//   ) {}

//   crearUsuario() {
//     const nuevoUsuario = {
//       nombre: this.nombre,
//       email: this.email,
//       password: this.password,
//       telefono: this.telefono,
//       rol: this.rol
//     };

//     this.usuariosService.crearUsuario(nuevoUsuario).subscribe({
//       next: (res) => {
//         this.mensajeError = '';
//         this.mensajeExito = res.message || 'Usuario creado con éxito.';

//         this.nombre = '';
//         this.email = '';
//         this.password = '';
//         this.telefono = '';
//         this.rol = '';
//       },
//       error: (err) => {
//         this.mensajeError = err?.error?.message || 'Ocurrió un error inesperado';
//         console.error('Error backend:', this.mensajeError);
//       }
//     });
//   }
// }

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UsuarioService } from '../../services/usuario.service';
import { FarmaciaService } from '../../services/farmacia.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class CrearUsuarioComponent implements OnInit {
  nombre: string = '';
  email: string = '';
  password: string = '';
  telefono: string = '';
  rol: string = '';
  idFarmacia: number | null = null;

  mensajeError: string = '';
  mensajeExito: string = '';

  rolesDisponibles = ['operador', 'vendedor', 'admin', 'ccagent', 'supervisor'];
  farmacias: any[] = [];

  constructor(
    private usuariosService: UsuarioService,
    private farmaciaService: FarmaciaService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.farmaciaService.obtenerFarmacias().subscribe({
      next: (res) => {
        this.farmacias = res.farmacias;
      },
      error: () => {
        this.toastr.error('Error al cargar farmacias');
      }
    });
  }

  crearUsuario() {
    const nuevoUsuario = {
      nombre: this.nombre,
      email: this.email,
      password: this.password,
      telefono: this.telefono,
      rol: this.rol,
      idFarmacia: this.idFarmacia
    };

    this.usuariosService.crearUsuario(nuevoUsuario).subscribe({
      next: (res) => {
        this.mensajeError = '';
        this.mensajeExito = res.message || 'Usuario creado con éxito.';
        this.toastr.success(this.mensajeExito);

        this.nombre = '';
        this.email = '';
        this.password = '';
        this.telefono = '';
        this.rol = '';
        this.idFarmacia = null;
      },
      error: (err) => {
        this.mensajeError = err?.error?.message || 'Ocurrió un error inesperado';
        this.toastr.error(this.mensajeError);
      }
    });
  }
}
