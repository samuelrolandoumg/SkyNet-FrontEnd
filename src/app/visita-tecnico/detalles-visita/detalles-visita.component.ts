import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { VisitaService } from '../../services/visita.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { IniciarServicioDto } from '../../interfaces/visita.interface';

@Component({
  selector: 'app-detalles-visita',
  templateUrl: './detalles-visita.component.html',
  styleUrls: ['./detalles-visita.component.css'],
  imports: [CommonModule]
})
export class DetallesVisitaComponent implements OnInit {

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

    if (!this.idVisita) {
      this.mensaje = 'ID de visita no proporcionado';
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
      if (result.isConfirmed) {
        navigator.geolocation.getCurrentPosition(position => {
          const data: IniciarServicioDto = {
            idVisita: this.idVisita,
            latitud: position.coords.latitude.toString(),
            longitud: position.coords.longitude.toString(),
            estado: 'SERVICIO INICIADO'
          };

          this.visitaSrv.iniciarServicio(data).subscribe({
            next: () => {
              Swal.fire('Éxito', 'El servicio ha sido iniciado correctamente.', 'success');
            },
            error: (err) => {
              const mensaje = err?.error?.mensaje || 'Ocurrió un error al iniciar el servicio.';
              Swal.fire('Error', mensaje, 'error');
            }
          });
        }, err => {
          Swal.fire('Error', 'No se pudo obtener tu ubicación actual.', 'error');
        });
      }
    });
  }


  finalizarServicio(): void {
    this.router.navigate(['/registro-detalle-visita'], {
      state: { idVisita: this.idVisita }
    });
  }

}
