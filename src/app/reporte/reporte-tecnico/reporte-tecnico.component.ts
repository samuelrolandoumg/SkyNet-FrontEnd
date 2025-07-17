import { Component, OnInit } from '@angular/core';
import { DetalleVisitaService } from '../../services/detalle-visita.service';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-reporte-tecnico',
  templateUrl: './reporte-tecnico.component.html',
  styleUrls: ['./reporte-tecnico.component.css'],
  imports: [CommonModule]
})
export class ReporteTecnicoComponent implements OnInit {
  usuario: any;
  reportes: any[] = [];

  constructor(
    private detalleVisitaService: DetalleVisitaService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.usuario = this.authService.obtenerUsuario();

    if (!this.usuario || this.usuario.rol !== 'TECNICO') return;

    this.detalleVisitaService.getReportesPorTecnico(this.usuario.id).subscribe({
      next: (data) => this.reportes = data,
      error: (err) => console.error('Error al obtener reportes del técnico', err)
    });
  }

  
  descargarPDF(url: string, nombre: string): void {
    fetch(url)
      .then(res => res.blob())
      .then(blob => {
        const enlace = document.createElement('a');
        enlace.href = window.URL.createObjectURL(blob);
        enlace.download = nombre; // Aquí sí tendrá .pdf por el nombreDocumento
        enlace.click();
        URL.revokeObjectURL(enlace.href);
      });
  }


}
