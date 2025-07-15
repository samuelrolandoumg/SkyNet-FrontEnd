import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../layout/sidebar/sidebar.component';
import { Usuario } from '../interfaces/usuario.interface';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { AlertasService } from '../services/alertas.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class DashboardComponent implements OnInit {
  usuario: Usuario | null = null;
  alertas: any[] = [];

  constructor(private authService: AuthService,
    private router: Router,
    private alertasService: AlertasService) { }

  ngOnInit(): void {
    this.usuario = this.authService.obtenerUsuario();
    if (this.usuario?.rol === 'TECNICO') {
      this.alertasService.getAlertasTecnico(this.usuario.id).subscribe({
        next: (data) => this.alertas = data,
        error: (err) => console.error('Error al obtener alertas del técnico', err)
      });
    }
  }

  cerrarSesion(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  redirigirAgregarUbicacion() {
    this.router.navigate(['/agregar-ubicacion']);
  }
}

