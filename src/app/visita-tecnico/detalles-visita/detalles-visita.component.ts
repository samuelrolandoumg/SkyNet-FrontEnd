import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { VisitaService } from '../../services/visita.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { IniciarServicioDto } from '../../interfaces/visita.interface';

@Component({
  selector: 'app-detalles-visita',
  templateUrl: './detalles-visita.component.html',
  styleUrls: ['./detalles-visita.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class DetallesVisitaComponent implements OnInit {

  estado: string = '';
  nombreCliente: string = '';
  nombreNegocio: string = '';
  idVisita!: number;
  mensaje: string = '';
  loading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private visitaSrv: VisitaService,
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit(): void {
    const nav = history.state;
    this.idVisita = nav?.idVisita;
    this.estado = nav?.estado;
    this.nombreCliente = nav?.nombreCliente;
    this.nombreNegocio = nav?.nombreNegocio;

    if (!this.idVisita) {
      this.mensaje = 'ID de visita no proporcionado';
      return;
    }
  }


  iniciarServicio(): void {
    Swal.fire({
      title: '¿Estás seguro de iniciar la revisión?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, iniciar',
      cancelButtonText: 'Cancelar'
    }).then(result => {
      if (!result.isConfirmed) return;

      this.loading = true;

      // Paso 1: verificar si ya se ha iniciado
      this.visitaSrv.consultarEstadoVisita(this.idVisita).subscribe({
        next: () => {
          // Si responde 200, significa que NO se ha iniciado: continuamos
          this.obtenerUbicacion()
            .then(({ latitud, longitud }) => {
              const data: IniciarServicioDto = {
                idVisita: this.idVisita,
                latitud,
                longitud,
                estado: 'SERVICIO INICIADO'
              };

              this.visitaSrv.iniciarServicio(data).subscribe({
                next: () => {
                  this.loading = false;
                  Swal.fire('Éxito', 'El servicio ha sido iniciado correctamente.', 'success');
                },
                error: () => {
                  this.loading = false;
                  Swal.fire('Error', 'Ocurrió un error al iniciar el servicio.', 'error');
                }
              });
            })
            .catch(() => {
              this.loading = false;
              Swal.fire('Error', 'No se pudo obtener tu ubicación.', 'error');
            });
        },
        error: (err) => {
          this.loading = false;

          const mensaje = err?.error?.mensaje || 'Error al consultar el estado de la visita.';

          // Si ya fue iniciado, mostramos error inmediato
          if (err.status === 400 && mensaje.includes('Ya se ha registrado')) {
            Swal.fire('Error', mensaje, 'error');
          } else {
            Swal.fire('Error', mensaje, 'error');
          }
        }
      });
    });
  }

  finalizarServicio(): void {
    this.router.navigate(['/registro-detalle-visita'], {
      state: { idVisita: this.idVisita }
    });
  }

  private obtenerUbicacion(): Promise<{ latitud: string, longitud: string }> {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        return reject();
      }

      navigator.geolocation.getCurrentPosition(
        position => {
          resolve({
            latitud: position.coords.latitude.toString(),
            longitud: position.coords.longitude.toString()
          });
        },
        error => reject(error),
        { timeout: 10000 }
      );
    });
  }
}
