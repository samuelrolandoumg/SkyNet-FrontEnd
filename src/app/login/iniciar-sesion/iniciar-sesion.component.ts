import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { LoginRequest } from '../../interfaces/login-request.interface';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-iniciar-sesion',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './iniciar-sesion.component.html',
  styleUrl: './iniciar-sesion.component.css'
})
export class IniciarSesionComponent {
  datos: LoginRequest = { correo: '', contrasena: '' };
  error: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  iniciarSesion(): void {
    this.authService.login(this.datos).subscribe({
      next: (usuario) => {
        console.log('Login OK:', usuario);
        if (usuario?.token) {
          this.authService.guardarUsuario(usuario);
          this.router.navigate(['/dashboard']);
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Respuesta inválida del servidor.'
          });
        }
      },
      error: (err) => {
        console.error('Error capturado:', err);

        // Validación si viene mensaje específico del backend
        const mensaje = err?.error?.mensaje || 'Correo o contraseña incorrectos.';

        Swal.fire({
          icon: 'error',
          title: 'Credenciales inválidas',
          text: 'Credenciales de usuario inválidas.',
          backdrop: false
        });

      }
    });
  }


}
