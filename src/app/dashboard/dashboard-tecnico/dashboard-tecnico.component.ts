import { Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartData } from 'chart.js';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import { Usuario } from '../../interfaces/usuario.interface';
import { DetalleVisitaService } from '../../services/detalle-visita.service';
import { ChartEvent, ActiveElement } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-dashboard-tecnico',
  standalone: true,
  templateUrl: './dashboard-tecnico.component.html',
  styleUrls: ['./dashboard-tecnico.component.css'],
  imports: [CommonModule, NgChartsModule]
})
export class DashboardTecnicoComponent implements OnInit {
  usuario: Usuario | null = null;

  visitasFiltradas: any[] = [];
  estadoSeleccionado: string = '';
  chartBarEstado: ChartData<'bar'> = {
    labels: [],
    datasets: []
  };

  chartData: ChartData<'bar'> = {
    labels: [],
    datasets: [{ data: [], label: 'Cantidad de Visitas', backgroundColor: '#3b82f6' }]
  };

  donutData: ChartData<'doughnut'> = {
    labels: [],
    datasets: [{ data: [], backgroundColor: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#6366f1', '#8b5cf6'] }]
  };


  chartBarOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          font: {
            weight: 'bold'
          }
        }
      },
      title: {
        display: true,
        text: 'Visitas por Estado y Tiempo',
        font: {
          size: 16
        }
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const index = context.dataIndex;
            const visita = this.visitasFiltradas[index];
            return [
              `👤 Cliente: ${visita.nombreCliente}`,
              `📅 Fecha: ${visita.fechaVisita}`,
              `📌 Estado: ${visita.estado}`
            ];
          }
        }
      }
    },
    scales: {
      x: {
        ticks: {
          font: {
            weight: 'bold'
          }
        }
      },
      y: {
        beginAtZero: true
      }
    }
  };

  chartOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            weight: 'bold'
          }
        }
      },
      title: {
        display: true,
        text: 'Resumen de Estados de Visitas',
        font: {
          size: 18
        }
      }
    }
  };


  constructor(
    private dashboardService: DetalleVisitaService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.usuario = this.authService.obtenerUsuario();

    if (this.usuario) {
      this.dashboardService.obtenerResumenEstados(this.usuario.id).subscribe({
        next: (data) => {
          const labels = data.map(item => item.estado);
          const cantidades = data.map(item => Number(item.cantidad));

          this.chartData = {
            labels,
            datasets: [{ data: cantidades, label: 'Cantidad de Visitas', backgroundColor: '#3b82f6' }]
          };

          this.donutData = {
            labels,
            datasets: [{ data: cantidades, backgroundColor: this.generarColores(labels.length) }]
          };
        },
        error: (err) => {
          console.error('Error al obtener resumen de visitas:', err);
        }
      });
    }
  }

  private generarColores(cantidad: number): string[] {
    const colores = [
      '#3b82f6', '#10b981', '#f59e0b',
      '#ef4444', '#6366f1', '#8b5cf6',
      '#ec4899', '#14b8a6', '#f97316'
    ];
    return colores.slice(0, cantidad);
  }


  mostrarDetalleEstado(estado: string): void {
    this.estadoSeleccionado = estado;
    this.dashboardService.obtenerVisitasPorEstadoYTecnico(this.usuario!.id, estado).subscribe({
      next: (visitas) => {
        this.visitasFiltradas = visitas;

        const labels = visitas.map(v => `${v.nombreCliente}`);
        const datos = visitas.map(v => 1);
        const colores = visitas.map(v =>
          v.enTiempo === 'Fuera de tiempo' ? '#dc2626' : '#38bdf8' // rojo o celeste
        );

        this.chartBarEstado = {
          labels,
          datasets: [
            {
              label: estado,
              data: datos,
              backgroundColor: colores
            }
          ]
        };
      },
      error: (err) => {
        console.error('Error cargando visitas por estado:', err);
      }
    });
  }

  onChartClick(event: any): void {
    const activePoints = event?.active as ActiveElement[];
    const activePoint = activePoints?.[0];

    if (activePoint && this.donutData.labels) {
      const index = activePoint.index;
      const estado = this.donutData.labels[index];
      if (typeof estado === 'string') {
        this.mostrarDetalleEstado(estado);
      }
    }
  }

}
