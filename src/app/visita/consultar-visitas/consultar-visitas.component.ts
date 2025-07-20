import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { VisitaService } from '../../services/visita.service';
import { ClienteService } from '../../services/cliente.service';
import { VisitaDto } from '../../interfaces/visita.interface';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { formatDate } from '@angular/common';
import html2pdf from 'html2pdf.js';

@Component({
  selector: 'app-consultar-visitas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './consultar-visitas.component.html',
  styleUrl: './consultar-visitas.component.css'
})
export class ConsultarVisitasComponent implements OnInit {
  visitas: VisitaDto[] = [];
  idTecnico: number = 0;
  fechaSeleccionada: string = new Date().toISOString().substring(0, 10);
  @ViewChild('contenidoPDF', { static: false }) contenidoPDF!: ElementRef;

  constructor(
    private visitaSrv: VisitaService,
    private clienteSrv: ClienteService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const hoy = new Date();
    this.fechaSeleccionada = formatDate(hoy, 'yyyy-MM-dd', 'en-US');

    this.clienteSrv.obtenerUsuarioDesdeToken().subscribe(usuario => {
      this.idTecnico = usuario.id;
      this.obtenerVisitas();
    });
  }


  obtenerVisitas(): void {
    this.visitaSrv.obtenerVisitasPorTecnico(this.idTecnico).subscribe(data => {
      if (!this.fechaSeleccionada) {
        // Si se borró la fecha, mostrar todas las visitas del técnico
        this.visitas = data;
      } else {
        // Si hay fecha seleccionada, filtrar por esa fecha
        this.visitas = data.filter(v => v.fechaVisita === this.fechaSeleccionada);
      }
    });
  }


  verRuta(cliente: VisitaDto): void {
    this.router.navigate(['/ver-ubicacion-cliente'], {
      state: { cliente: cliente }
    });
  }

  verDetalles(visita: VisitaDto): void {
    this.router.navigate(['/detalle-visita'], {
      state: {
        idVisita: visita.idVisita,
        estado: visita.estado,
        nombreCliente: visita.nombreCliente,
        nombreNegocio: visita.nombreNegocio,
        tipoVisita: visita.tipoVisita
      }
    });
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
