import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../layout/sidebar/sidebar.component';
import { Usuario } from '../interfaces/usuario.interface';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class DashboardComponent implements OnInit {
  usuario: Usuario | null = null;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.usuario = this.authService.obtenerUsuario();
  }

  cerrarSesion(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  redirigirAgregarUbicacion() {
    this.router.navigate(['/agregar-ubicacion']);
  }
}

