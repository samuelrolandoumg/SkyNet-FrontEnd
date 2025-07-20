import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { VisitaPorClienteProjection } from '../../interfaces/visita.interface';
import { VisitaService } from '../../services/visita.service';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import html2pdf from 'html2pdf.js';

@Component({
  selector: 'app-consultar-visitas-tecnico',
  templateUrl: './consultar-visitas-tecnico.component.html',
  styleUrls: ['./consultar-visitas-tecnico.component.css'],
  imports: [CommonModule]
})
export class ConsultarVisitasTecnicoComponent implements OnInit {

  visitas: VisitaPorClienteProjection[] = [];
  usuario: any;
  @ViewChild('contenidoPDF', { static: false }) contenidoPDF!: ElementRef;

  constructor(
    private visitaService: VisitaService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.usuario = this.authService.obtenerUsuario();

    if (this.usuario.id) {
      this.visitaService.getVisitasTecnico(this.usuario.id).subscribe({
        next: (data) => this.visitas = data,
        error: (err) => console.error('Error al obtener visitas', err)
      });
    } else {
      console.warn('No se encontró el ID del técnico');
    }
  }

  descargarPDF() {
    const element = this.contenidoPDF?.nativeElement;
    if (!element) {
      console.error('Elemento no definido');
      return;
    }

    const opt = {
      margin: 0.3,
      filename: 'reporte-visitas.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(element).save();
  }


}
