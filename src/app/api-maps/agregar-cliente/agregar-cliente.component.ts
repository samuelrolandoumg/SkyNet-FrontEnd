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
import { AuthService } from '../../services/auth.service';

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
  nombreCliente: string = '';
  nombreNegocio: string = '';
  nit: string = '';
  telefono: string = '';
  correo: string = '';
  estado: boolean = true;

  @ViewChild('mapElement') mapElement!: ElementRef;
  @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;

  map: any;
  marker: any;
  usuario: any;

  constructor(
    private http: HttpClient,
    private zone: NgZone,
    private clienteSrv: ClienteService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.usuario = this.authService.obtenerUsuario();

    if (this.usuario.rol === 'ADMIN') {
      this.obtenerSupervisores();
    } else if (this.usuario.rol === 'SUPERVISOR') {
      this.obtenerSoloSupervisor(this.usuario.id);
    }
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
      types: ['establishment'],
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

  obtenerSoloSupervisor(idSupervisor: number): void {
    this.clienteSrv.obtenerSupervisorByid(idSupervisor).subscribe({
      next: (data) => {
        this.supervisores = [data];
      },
      error: () => {
        console.error('Error al obtener supervisor por ID');
      }
    });
  }

  guardar(): void {
    if (
      this.latitud && this.longitud &&
      this.nombreCliente.trim() && this.nombreNegocio.trim() &&
      this.nit.trim() && this.telefono.trim() && this.correo.trim() &&
      this.idSupervisorSeleccionado !== null
    ) {
      const cliente: CrearClienteDto = {
        nombreCliente: this.nombreCliente,
        nombreNegocio: this.nombreNegocio,
        latitud: this.latitud.toString(),
        longitud: this.longitud.toString(),
        nit: this.nit,
        telefono: this.telefono,
        correo: this.correo,
        estado: this.estado,
        idRol: 4,
        idSupervisor: this.idSupervisorSeleccionado
      };

      this.clienteSrv.crearCliente(cliente).subscribe({
        next: () => {
          Swal.fire('Éxito', 'Cliente guardado correctamente', 'success');
          this.limpiarCampos();
        },
        error: () => Swal.fire('Error', 'No se pudo guardar el cliente', 'error')
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
