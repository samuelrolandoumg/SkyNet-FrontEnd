import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../layout/sidebar/sidebar.component';
import { Usuario } from '../interfaces/usuario.interface';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { AlertasService } from '../services/alertas.service';
import { ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective, NgChartsModule } from 'ng2-charts';
import { VisitaService } from '../services/visita.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: true,
  imports: [CommonModule, NgChartsModule],
})
export class DashboardComponent implements OnInit {
  usuario: Usuario | null = null;
  alertas: any[] = [];

  barChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      legend: {
        display: true
      }
    }
  };

  barChartData = {
    labels: [] as string[],
    datasets: [
      {
        label: '',
        data: [] as number[]
      }
    ]
  };

  totalVisitas: number = 0;

  constructor(private authService: AuthService,
    private router: Router,
    private alertasService: AlertasService,
    private visitaService: VisitaService
  ) { }

  ngOnInit(): void {
    this.usuario = this.authService.obtenerUsuario();

    if (this.usuario?.rol === 'TECNICO') {
      this.alertasService.getAlertasTecnico(this.usuario.id).subscribe({
        next: (data) => this.alertas = data,
        error: (err) => console.error('Error al obtener alertas del técnico', err)
      });
    }

    if (this.usuario?.rol === 'SUPERVISOR') {
      this.visitaService.getVisitasPorTecnico(this.usuario.id).subscribe({
        next: (data) => {
          const labels = data.map(d => d.nombreTecnico);
          const values = data.map(d => +d.cantidad);
          this.totalVisitas = values.reduce((a, b) => a + b, 0);

          this.barChartData = {
            labels,
            datasets: [{
              label: 'Visitas por técnico',
              data: values
            }]
          };
        },
        error: (err) => console.error('Error al obtener visitas por técnico', err)
      });
    }

    if (this.usuario?.rol === 'ADMIN') {
      this.visitaService.getVisitasPorSupervisor(this.usuario.id).subscribe({
        next: (data) => {
          const labels = data.map(d => d.nombreSupervisor);
          const values = data.map(d => +d.cantidad);
          this.totalVisitas = values.reduce((a, b) => a + b, 0);

          this.barChartData = {
            labels,
            datasets: [{
              label: 'Visitas por supervisor',
              data: values
            }]
          };
        },
        error: (err) => console.error('Error al obtener visitas por supervisor', err)
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

