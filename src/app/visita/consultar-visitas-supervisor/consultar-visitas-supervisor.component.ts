import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetalleVisitaService } from '../../services/detalle-visita.service';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { ConsultaVisitaSupervisor } from '../../interfaces/usuario.interface';
import { AlertasService } from '../../services/alertas.service';
import Swal from 'sweetalert2';
import html2pdf from 'html2pdf.js';
import { VisitaService } from '../../services/visita.service';

@Component({
  selector: 'app-consultar-visitas-supervisor',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './consultar-visitas-supervisor.component.html',
  styleUrls: ['./consultar-visitas-supervisor.component.css']
})
export class ConsultarVisitasSupervisorComponent implements OnInit {
  visitas: ConsultaVisitaSupervisor[] = [];
  visitasFiltradas: ConsultaVisitaSupervisor[] = [];
  fechaFiltro: string = '';
  usuario: any;
  @ViewChild('contenidoPDF', { static: false }) contenidoPDF!: ElementRef;


  constructor(
    private authService: AuthService,
    private detallevisitaService: DetalleVisitaService,
    private visitaService: VisitaService,
    private alertaService: AlertasService
  ) { }

  ngOnInit(): void {
    this.usuario = this.authService.obtenerUsuario();
    if (this.usuario?.id) {
      this.detallevisitaService.obtenerVisitasPorSupervisor(this.usuario.id).subscribe({
        next: (data) => {
          this.visitas = data;
          this.visitasFiltradas = data;
        },
        error: (err) => {
          console.error('Error cargando visitas:', err);
        }
      });
    }
  }

  filtrarPorFecha() {
    if (this.fechaFiltro) {
      this.visitasFiltradas = this.visitas.filter(
        v => v.fechaVisita === this.fechaFiltro
      );
    } else {
      this.visitasFiltradas = this.visitas;
    }
  }

  alertarRetraso(visitaId: number): void {
    this.alertaService.alertarRetrasoTecnico(visitaId).subscribe({
      next: () => {
        Swal.fire({
          title: 'Alerta enviada',
          text: 'Se ha generado la alerta de retraso al técnico.',
          icon: 'success',
          confirmButtonText: 'OK'
        }).then(() => {
          window.location.reload();
        });
      },
      error: (err) => {
        console.error(err);
        Swal.fire('Error', 'No se pudo generar la alerta.', 'error');
      }
    });
  }

  esRetraso(visita: any): boolean {
    const valor = visita?.enTiempo;
    const enTiempo = valor?.trim().toLowerCase();
    return enTiempo === 'fuera de tiempo';
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

  confirmarCancelacion(idVisita: number): void {
    Swal.fire({
      title: '¿Está seguro?',
      text: '¿Desea cancelar esta visita?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, cancelar',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        this.solicitarMotivoCancelacion(idVisita);
      }
    });
  }

  solicitarMotivoCancelacion(idVisita: number): void {
    Swal.fire({
      title: 'Motivo de cancelación',
      input: 'text',
      inputLabel: 'Ingrese el motivo',
      inputPlaceholder: 'Escriba el motivo aquí',
      inputValidator: (value) => {
        if (!value) {
          return 'Debe ingresar un motivo';
        }
        return null;
      },
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        const data = {
          idVisita: idVisita,
          motivoCancelacion: result.value,
          usuarioCancelo: this.usuario.id
        };

        this.visitaService.cancelarVisita(data).subscribe({
          next: () => {
            Swal.fire('Cancelado', 'La visita fue cancelada exitosamente.', 'success')
              .then(() => window.location.reload());
          },
          error: (err) => {
            console.error('Error al cancelar la visita:', err);
            Swal.fire('Error', 'No se pudo cancelar la visita.', 'error');
          }
        });
      }
    });
  }

  confirmarPosponer(idVisita: number): void {
    Swal.fire({
      title: '¿Desea posponer la visita?',
      text: 'Esto cambiará la fecha de la visita.',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, continuar',
      cancelButtonText: 'Cancelar'
    }).then(result => {
      if (result.isConfirmed) {
        this.solicitarFechaYMotivo(idVisita);
      }
    });
  }

  solicitarFechaYMotivo(idVisita: number): void {
    const today = new Date().toISOString().split('T')[0];

    let fechaSeleccionada = '';
    let motivoIngresado = '';

    Swal.fire({
      title: 'Nueva fecha de la visita',
      html: `
      <input type="date" id="swal-input-fecha" class="swal2-input" min="${today}" />
      <input type="text" id="swal-input-motivo" class="swal2-input" placeholder="Motivo de la posposición" />
    `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      didOpen: () => {
        const inputFecha = document.getElementById('swal-input-fecha') as HTMLInputElement;
        inputFecha.value = today;

        const inputMotivo = document.getElementById('swal-input-motivo') as HTMLInputElement;
        inputFecha.addEventListener('change', () => {
          fechaSeleccionada = inputFecha.value;
        });
        inputMotivo.addEventListener('input', () => {
          motivoIngresado = inputMotivo.value.trim();
        });
      },
      preConfirm: () => {
        const fecha = (document.getElementById('swal-input-fecha') as HTMLInputElement)?.value?.trim();
        const motivo = (document.getElementById('swal-input-motivo') as HTMLInputElement)?.value?.trim();

        console.log('FECHA:', fecha);
        console.log('MOTIVO:', motivo);

        if (!fecha || !motivo || motivo.length < 3) {
          Swal.showValidationMessage('Debe ingresar fecha válida y motivo de al menos 3 caracteres');
          return false;
        }

        return { fecha, motivo };
      }
    }).then(result => {
      if (result.isConfirmed && result.value) {
        const data = {
          idVisita: idVisita,
          nuevaFecha: result.value.fecha,
          motivoPosposicion: result.value.motivo
        };

        console.log("🚀 Enviando data:", data);

        this.visitaService.posponerVisita(data).subscribe({
          next: () => {
            Swal.fire('Pospuesta', 'La visita fue reprogramada.', 'success')
              .then(() => window.location.reload());
          },
          error: () => {
            Swal.fire('Error', 'No se pudo posponer la visita.', 'error');
          }
        });
      }
    });
  }

}
