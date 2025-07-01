import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { LoginRequest } from '../../interfaces/login-request.interface';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
          this.error = 'Respuesta inválida del servidor.';
        }
      },
      error: (err) => {
        console.error('Error capturado:', err);
        this.error = 'Correo o contraseña incorrectos.';
      }
    });
  }

}
