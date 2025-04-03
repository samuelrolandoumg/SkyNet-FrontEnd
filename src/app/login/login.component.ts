
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [CommonModule, RouterModule, FormsModule],
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  showPassword: boolean = false;
  constructor(private usuarioService: UsuarioService,private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['token']) {
        localStorage.setItem('authToken', params['token']);
        localStorage.setItem('nombreUsuario', params['nombre']);
        localStorage.setItem('rolUsuario', params['rol']);

        const rol = params['rol'];
        if (rol === 'admin') {
          this.router.navigate(['/dashboard']);
        } else if (rol === 'operador') {
          window.location.href = 'https://www.canva.com/design/DAGgoUenicg/saXqUNtbKWJQzjXweUWliw/view?mode=prototype#pantalla-principal-tf';
        }
      }

      if (params['error'] === '403') {
        this.router.navigate(['/access-denied']);
      }
    });
  }

  loginWithGoogle() {
    window.location.href = 'http://localhost:3000/auth/google';
  }

  iniciarSesion() {
    if (!this.email || !this.password) {
      this.errorMessage = 'Por favor, ingrese su email y contraseña.';
      return;
    }

    this.usuarioService.login(this.email, this.password).subscribe(
      (response) => {
        localStorage.setItem('authToken', response.authToken);
        localStorage.setItem('nombreUsuario', response.nombre);
        localStorage.setItem('rolUsuario', response.rol);

        if (response.rol === 'operadorCC') {
          this.router.navigate(['/productoscc']);
        } else {
          this.errorMessage = 'No tienes permisos para acceder.';
        }
      },
      (error) => {
        this.errorMessage = error.error.message || 'Error en la autenticación.';
      }
    );
  }

  togglePassword() {
    this.showPassword = !this.showPassword; 
  }
}


