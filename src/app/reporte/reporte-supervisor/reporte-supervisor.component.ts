import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { DetalleVisitaService } from '../../services/detalle-visita.service';
import { ReporteSupervisorProjection } from '../../interfaces/visita.interface';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-reporte-supervisor',
  templateUrl: './reporte-supervisor.component.html',
  styleUrls: ['./reporte-supervisor.component.css'],
  standalone: true,
  imports: [CommonModule, MatIconModule]
})
export class ReporteSupervisorComponent implements OnInit {
  reportes: ReporteSupervisorProjection[] = [];

  constructor(private detalleVisitaService: DetalleVisitaService) { }

  ngOnInit(): void {
    const idSupervisor = +(localStorage.getItem('idSupervisor') || '7');
    this.detalleVisitaService.obtenerReportesSupervisor(idSupervisor).subscribe({
      next: (data: ReporteSupervisorProjection[]) => {
        this.reportes = data;
      },
      error: (error: any) => {
        console.error('Error al obtener reportes del supervisor:', error);
      }
    });
  }

  descargar(url: string, nombre: string): void {
    fetch(url)
      .then(res => res.blob())
      .then(blob => {
        const enlace = document.createElement('a');
        enlace.href = window.URL.createObjectURL(blob);
        enlace.download = nombre;
        enlace.click();
        URL.revokeObjectURL(enlace.href);
      });
  }
}
