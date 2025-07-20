import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { SupervisorVisitaResumen, TecnicoVisitaResumen } from '../../interfaces/visita.interface';
import { AuthService } from '../../services/auth.service';
import { VisitaService } from '../../services/visita.service';
import { CommonModule } from '@angular/common';
import { trigger, style, transition, animate } from '@angular/animations';
import html2pdf from 'html2pdf.js';

@Component({
  selector: 'app-reporte-admin',
  templateUrl: './reporte-admin.component.html',
  styleUrls: ['./reporte-admin.component.css'],
  imports: [CommonModule],
  animations: [
    trigger('expandirContraer', [
      transition(':enter', [
        style({ height: 0, opacity: 0 }),
        animate('300ms ease-out', style({ height: '*', opacity: 1 }))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ height: 0, opacity: 0 }))
      ])
    ])
  ]
})
export class ReporteAdminComponent implements OnInit {
  usuario: any;
  resumenSupervisores: SupervisorVisitaResumen[] = [];
  tecnicosMap: { [idSupervisor: number]: TecnicoVisitaResumen[] } = {};
  supervisoresExpandido: number[] = [];
  @ViewChild('contenidoPDF', { static: false }) contenidoPDF!: ElementRef;

  constructor(
    private authService: AuthService,
    private visitaService: VisitaService
  ) { }

  ngOnInit(): void {
    this.usuario = this.authService.obtenerUsuario();
    if (!this.usuario || this.usuario.rol !== 'ADMIN') return;

    this.visitaService.getResumenSupervisores(this.usuario.id).subscribe({
      next: (data) => this.resumenSupervisores = data,
      error: (err) => console.error('Error al obtener resumen de supervisores', err)
    });
  }

  toggleSupervisor(supervisor: SupervisorVisitaResumen): void {
    const index = this.supervisoresExpandido.indexOf(supervisor.idSupervisor);

    if (index !== -1) {
      this.supervisoresExpandido.splice(index, 1);
    } else {
      this.supervisoresExpandido.push(supervisor.idSupervisor);

      if (!this.tecnicosMap[supervisor.idSupervisor]) {
        this.visitaService.getResumenTecnicos(supervisor.idSupervisor).subscribe({
          next: (data) => this.tecnicosMap[supervisor.idSupervisor] = data,
          error: (err) => console.error('Error al obtener técnicos del supervisor', err)
        });
      }
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
      filename: 'reporte-supervisores.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(element).save();
  }

  getCanceladasTotales(idSupervisor: number): number {
    const tecnicos = this.tecnicosMap[idSupervisor] || [];
    return tecnicos.reduce((acc, tecnico) => acc + (tecnico.cancelada || 0), 0);
  }

}