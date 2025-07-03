import { HttpClient } from '@angular/common/http';
import {
  Component,
  ElementRef,
  NgZone,
  OnInit,
  ViewChild,
  AfterViewInit
} from '@angular/core';
import { ClienteService } from '../../services/cliente.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CrearClienteDto } from '../../interfaces/cliente.interface';
import Swal from 'sweetalert2';

declare var google: any;

@Component({
  selector: 'app-agregar-cliente',
  templateUrl: './agregar-cliente.component.html',
  imports: [CommonModule, FormsModule, RouterModule],
  styleUrls: ['./agregar-cliente.component.css'],
  standalone: true
})
export class AgregarClienteComponent implements OnInit, AfterViewInit {
  direccionBuscada: string = '';
  latitud: number | null = null;
  longitud: number | null = null;
  supervisores: any[] = [];
  idSupervisorSeleccionado: number | null = null;
  idSupervisor: number | null = null;
  nombreCliente: string = '';
  nombreNegocio: string = '';
  nit: string = '';
  telefono: string = '';
  correo: string = '';
  estado: boolean = true;

  @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;

  map: any;
  marker: any;

  constructor(
    private http: HttpClient,
    private zone: NgZone,
    private clienteSrv: ClienteService
  ) { }

  ngOnInit(): void {
    this.obtenerSupervisores();
  }

  ngAfterViewInit(): void {
    const input = this.searchInput.nativeElement;

    this.map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
      center: { lat: 14.6349, lng: -90.5069 },
      zoom: 14,
    });

    this.marker = new google.maps.Marker({
      map: this.map,
      draggable: true
    });

    const autocomplete = new google.maps.places.Autocomplete(input, {
      fields: ['geometry', 'name', 'formatted_address'],
      types: ['establishment'], // 🔥 permite negocios y lugares específicos
    });
    autocomplete.addListener('place_changed', () => {
      this.zone.run(() => {
        const place = autocomplete.getPlace();
        if (!place.geometry || !place.geometry.location) return;

        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();

        this.latitud = lat;
        this.longitud = lng;

        this.map.setCenter({ lat, lng });
        this.marker.setPosition({ lat, lng });
      });
    });

    this.map.addListener("click", (e: google.maps.MapMouseEvent) => {
      if (!e.latLng) return;

      const lat = e.latLng.lat();
      const lng = e.latLng.lng();

      this.marker.setPosition({ lat, lng });
      this.map.setCenter({ lat, lng });

      this.zone.run(() => {
        this.latitud = lat;
        this.longitud = lng;
      });
    });
  }

  obtenerSupervisores(): void {
    this.clienteSrv.obtenerSupervisores().subscribe({
      next: (data) => {
        this.supervisores = data;
      },
      error: () => {
        console.error('No se pudieron cargar los supervisores');
      }
    });
  }
  guardar(): void {
    if (
      this.latitud && this.longitud &&
      this.nombreCliente.trim() &&
      this.nombreNegocio.trim() &&
      this.nit.trim() &&
      this.telefono.trim() &&
      this.correo.trim() &&
      this.idSupervisorSeleccionado !== null
    ) {
      const cliente: CrearClienteDto = {
        nombreCliente: this.nombreCliente,
        nombreNegocio: this.nombreNegocio,
        latitud: this.latitud.toString(),
        longitud: this.longitud.toString(),
        idRol: 6,
        idSupervisor: this.idSupervisorSeleccionado,
        nit: this.nit,
        telefono: this.telefono,
        correo: this.correo,
        estado: this.estado
      };

      this.clienteSrv.crearCliente(cliente).subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: 'Cliente guardado correctamente',
            confirmButtonText: 'Aceptar',
            backdrop: false
          }).then(() => this.limpiarCampos());
        },
        error: () => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Ocurrió un error al guardar el cliente',
            backdrop: false
          });
        }
      });
    }
  }


  limpiarCampos(): void {
    this.nombreCliente = '';
    this.nombreNegocio = '';
    this.nit = '';
    this.telefono = '';
    this.correo = '';
    this.latitud = null;
    this.longitud = null;
    this.idSupervisorSeleccionado = null;
    if (this.marker) this.marker.setMap(null);
    this.searchInput.nativeElement.value = '';
  }

}
