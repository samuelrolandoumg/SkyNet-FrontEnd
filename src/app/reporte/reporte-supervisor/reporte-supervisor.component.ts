import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { DetalleVisitaService } from '../../services/detalle-visita.service';
import { ReporteSupervisorProjection } from '../../interfaces/visita.interface';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-reporte-supervisor',
  templateUrl: './reporte-supervisor.component.html',
  styleUrls: ['./reporte-supervisor.component.css'],
  standalone: true,
  imports: [CommonModule, MatIconModule]
})
export class ReporteSupervisorComponent implements OnInit {
  reportes: ReporteSupervisorProjection[] = [];
  usuario: any;

  constructor(private detalleVisitaService: DetalleVisitaService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.usuario = this.authService.obtenerUsuario();
    const idSupervisor = +(localStorage.getItem('idSupervisor') || '7');
    this.detalleVisitaService.obtenerReportesSupervisor(this.usuario.id).subscribe({
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
