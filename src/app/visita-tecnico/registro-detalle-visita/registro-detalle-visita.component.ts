import { Component } from '@angular/core';
import { DetalleVisitaService } from '../../services/detalle-visita.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IniciarServicioDto } from '../../interfaces/visita.interface';
import { VisitaService } from '../../services/visita.service';

@Component({
  selector: 'app-registro-detalle-visita',
  templateUrl: './registro-detalle-visita.component.html',
  styleUrls: ['./registro-detalle-visita.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class RegistroDetalleVisitaComponent {
  idVisita!: number;
  resultadoVisita = '';
  observaciones = '';
  comentarioAdicional = '';
  fotos: File[] = [];
  opcionesResultado = ['Incidencia', 'Exitoso'];

  constructor(
    private detalleSrv: DetalleVisitaService,
    private route: ActivatedRoute,
    private router: Router,
    private visitaSrv: VisitaService
  ) {
    const nav = history.state;
    this.idVisita = nav?.idVisita;
  }

  onFileChange(event: any): void {
    const selectedFiles = Array.from(event.target.files) as File[];

    selectedFiles.forEach(file => {
      if (!this.fotos.find(f => f.name === file.name)) {
        this.fotos.push(file);
      }
    });

    //event.target.value = '';
  }

  quitarFoto(index: number): void {
    this.fotos.splice(index, 1);
  }


  enviar(): void {
    if (!this.resultadoVisita || this.fotos.length === 0) {
      Swal.fire('Faltan datos requeridos', '', 'warning');
      return;
    }

    navigator.geolocation.getCurrentPosition(position => {
      const estado =
        this.resultadoVisita === 'Exitoso'
          ? 'FINALIZADO CON EXITO'
          : 'FINALIZADO CON INCIDENCIA';

      const data: IniciarServicioDto = {
        idVisita: this.idVisita,
        latitud: position.coords.latitude.toString(),
        longitud: position.coords.longitude.toString(),
        estado: estado
      };

      this.visitaSrv.finalizarServicio(data).subscribe({
        next: () => {
          this.detalleSrv.crearDetalleVisita(
            this.idVisita,
            this.resultadoVisita,
            this.observaciones,
            this.comentarioAdicional,
            this.fotos
          ).subscribe({
            next: () => {
              Swal.fire('Éxito', 'Registro creado', 'success').then(() => {
                this.router.navigate(['/consultar-visitas']);
              });
            },
            error: () => {
              Swal.fire('Error', 'No se pudo registrar el detalle', 'error');
            }
          });
        },
        error: () => {
          Swal.fire('Error', 'No se pudo finalizar el servicio', 'error');
        }
      });

    }, () => {
      Swal.fire('Error', 'No se pudo obtener tu ubicación actual.', 'error');
    });
  }

}
