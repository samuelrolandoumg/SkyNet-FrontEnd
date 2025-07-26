import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { UsuarioService } from '../../services/usuario.service';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-cambiar-password',
  templateUrl: './cambiar-password.component.html',
  styleUrl: './cambiar-password.component.css',
  imports: [CommonModule, ReactiveFormsModule, FormsModule]

})
export class CambiarPasswordComponent implements OnInit {
  contrasenaActual: string = '';
  nuevaContrasena: string = '';
  usuario: any;

  constructor(
    private usuarioService: UsuarioService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.usuario = this.authService.obtenerUsuario();
    this.obtenerContrasenaActual();
  }

  obtenerContrasenaActual(): void {
    this.usuarioService.obtenerContrasena(this.usuario.id).subscribe({
      next: (resp) => {
        this.contrasenaActual = resp;
      },
      error: () => {
        Swal.fire('Error', 'No se pudo obtener la contraseña.', 'error');
      }
    });
  }

  cambiarContrasena(): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Deseas cambiar tu contraseña?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, cambiar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioService.actualizarContrasena(this.usuario.id, this.nuevaContrasena).subscribe({
          next: () => {
            Swal.fire('Éxito', 'Contraseña actualizada correctamente.', 'success');
            this.nuevaContrasena = '';
            this.obtenerContrasenaActual();
          },
          error: () => {
            Swal.fire('Error', 'No se pudo actualizar la contraseña.', 'error');
          }
        });
      }
    });
  }
}
