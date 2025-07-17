import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ChartOptions, ChartData } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';

import { Usuario } from '../interfaces/usuario.interface';
import { AuthService } from '../services/auth.service';
import { AlertasService } from '../services/alertas.service';
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
  totalVisitas: number = 0;

  // Donut
  doughnutChartData: ChartData<'doughnut'> = {
    labels: [],
    datasets: []
  };

  // Barras
  barChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      legend: {
        display: true
      }
    }
  };

  barChartData: ChartData<'bar'> = {
    labels: [],
    datasets: []
  };

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertasService: AlertasService,
    private visitaService: VisitaService
  ) {}

  ngOnInit(): void {
    this.usuario = this.authService.obtenerUsuario();

    if (!this.usuario) return;

    // Alertas para técnicos
    if (this.usuario.rol === 'TECNICO') {
      this.alertasService.getAlertasTecnico(this.usuario.id).subscribe({
        next: (data) => this.alertas = data,
        error: (err) => console.error('Error al obtener alertas del técnico', err)
      });

      this.visitaService.getVisitasPorEstadoTecnico(this.usuario.id).subscribe({
        next: (data) => {
          const labels = data.map(d => d.estado);
          const values = data.map(d => +d.cantidad);
          this.totalVisitas = values.reduce((a, b) => a + b, 0);

          this.doughnutChartData = {
            labels,
            datasets: [{
              data: values,
              backgroundColor: ['#ffb6c1', '#add8e6', '#90ee90', '#f08080']
            }]
          };
        },
        error: (err) => console.error('Error al obtener visitas por estado para técnico', err)
      });
    }

    // Supervisores
    if (this.usuario.rol === 'SUPERVISOR') {
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

    // Administradores
    if (this.usuario.rol === 'ADMIN') {
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

  redirigirAgregarUbicacion(): void {
    this.router.navigate(['/agregar-ubicacion']);
  }
}
