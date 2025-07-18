import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClienteService } from '../../services/cliente.service';
import { ClienteDto, ClienteUpdateDto, SupervisorDto } from '../../interfaces/cliente.interface';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

declare var google: any;

@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.component.html',
  styleUrls: ['./editar-cliente.component.css'],
  imports: [CommonModule, ReactiveFormsModule, FormsModule]
})
export class EditarClienteComponent implements OnInit, AfterViewInit {
  clienteForm!: FormGroup;
  clienteId!: number;
  cargando = true;
  clienteOriginal!: ClienteDto;
  supervisores: SupervisorDto[] = [];
  formEditado = false;
  usuario: any;
  rolUsuario: string = '';
  deshabilitarSupervisor: boolean = false;

  latitud!: number;
  longitud!: number;
  map: any;
  marker: any;

  @ViewChild('mapElement') mapElement!: ElementRef;
  @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;

  constructor(
    private route: ActivatedRoute,
    private clienteService: ClienteService,
    private fb: FormBuilder,
    private router: Router,
    private zone: NgZone,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.usuario = this.authService.obtenerUsuario();

    if (!this.usuario) return;

    // 👇 Aquí marcamos si se debe deshabilitar el campo
    if (this.usuario.rol === 'SUPERVISOR') {
      this.deshabilitarSupervisor = true;
    }

    this.route.queryParams.subscribe(params => {
      this.clienteId = +params['idCliente'];
      if (this.clienteId > 0) {
        this.inicializarFormulario();
        this.cargarCliente();
      }
    });

    this.cargarTecnicos();
  }


  ngAfterViewInit(): void {
    // Mapa se inicializa después de cargar datos del cliente
  }

  inicializarFormulario(): void {
    this.clienteForm = this.fb.group({
      nombreCliente: ['', Validators.required],
      nombreNegocio: ['', Validators.required],
      telefono: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      nit: ['', Validators.required],
      estado: [true, Validators.required],
      idRol: [null, Validators.required],
      idSupervisor: [{ value: null, disabled: this.deshabilitarSupervisor }, Validators.required],
      nombreSupervisor: ['']

    });

    this.clienteForm.valueChanges.subscribe(() => {
      if (!this.clienteOriginal) return;

      const actual = this.clienteForm.getRawValue();

      this.formEditado =
        actual.nombreCliente !== this.clienteOriginal.nombreCliente ||
        actual.nombreNegocio !== this.clienteOriginal.nombreNegocio ||
        actual.telefono !== this.clienteOriginal.telefono ||
        actual.correo !== this.clienteOriginal.correo ||
        actual.nit !== this.clienteOriginal.nit ||
        actual.estado !== this.clienteOriginal.estado ||
        actual.idRol !== this.clienteOriginal.idRol ||
        actual.idSupervisor !== this.clienteOriginal.idSupervisor ||
        this.coordenadasCambiaron(); // 🔥 se evalúan también
    });

  }

  cargarCliente(): void {
    this.clienteService.obtenerClientePorId(this.clienteId).subscribe({
      next: (cliente: ClienteDto) => {
        this.clienteOriginal = cliente;

        this.latitud = parseFloat(cliente.latitud);
        this.longitud = parseFloat(cliente.longitud);

        this.clienteForm.patchValue({
          nombreCliente: cliente.nombreCliente,
          nombreNegocio: cliente.nombreNegocio,
          telefono: cliente.telefono,
          correo: cliente.correo,
          nit: cliente.nit,
          estado: cliente.estado,
          idRol: cliente.idRol,
          idSupervisor: cliente.idSupervisor,
          nombreSupervisor: cliente.nombreSupervisor
        });

        this.cargando = false;

        // Inicializar mapa después de que la vista esté lista
        setTimeout(() => this.initMap(), 0);
      },
      error: err => {
        console.error('Error al cargar cliente:', err);
        this.cargando = false;
      }
    });
  }


  initMap(): void {
    if (!this.latitud || !this.longitud) return;

    const center = { lat: this.latitud, lng: this.longitud };

    this.map = new google.maps.Map(this.mapElement.nativeElement, {
      center,
      zoom: 15
    });

    this.marker = new google.maps.Marker({
      position: center,
      map: this.map,
      draggable: true
    });

    this.marker.addListener('dragend', (event: any) => {
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();

      this.latitud = lat;
      this.longitud = lng;

      if (this.coordenadasCambiaron()) {
        this.formEditado = true;
      }
    });

    const autocomplete = new google.maps.places.Autocomplete(this.searchInput.nativeElement, {
      fields: ['geometry'],
      types: ['establishment']
    });

    autocomplete.addListener('place_changed', () => {
      this.zone.run(() => {
        const place = autocomplete.getPlace();
        if (!place.geometry || !place.geometry.location) return;

        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();

        this.latitud = lat;
        this.longitud = lng;

        const newPosition = { lat, lng };
        this.map.setCenter(newPosition);
        this.marker.setPosition(newPosition);
      });
    });
  }

  guardarCambios(): void {
    const form = this.clienteForm.value;

    const payload: ClienteUpdateDto = {
      id: this.clienteId,
      nombreCliente: form.nombreCliente,
      nombreNegocio: form.nombreNegocio,
      telefono: form.telefono,
      correo: form.correo,
      nit: form.nit,
      estado: form.estado,
      idRol: form.idRol,
      latitud: this.latitud.toString(),
      longitud: this.longitud.toString(),
      idSupervisor: form.idSupervisor || this.clienteOriginal.idSupervisor
    };

    this.clienteService.actualizarCliente(payload).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Actualización exitosa',
          text: 'El cliente fue actualizado correctamente',
          confirmButtonColor: '#28a745'
        }).then(result => {
          if (result.isConfirmed) {
            this.router.navigate(['/listar-clientes']);
          }
        });
        this.formEditado = false;
      },
      error: err => {
        console.error('❌ Error al actualizar cliente:', err);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo actualizar el cliente',
          confirmButtonColor: '#dc3545'
        });
      }
    });
  }

  cargarTecnicos(): void {
    this.clienteService.obtenerSupervisoresExistentes().subscribe({
      next: data => {
        this.supervisores = data;
      },
      error: err => {
        console.error('Error al cargar técnicos:', err);
      }
    });
  }

  onSupervisorSeleccionado(): void {
    const idSeleccionado = this.clienteForm.get('idSupervisor')?.value;
    const supervisorSeleccionado = this.supervisores.find(
      t => t.idUsuario === idSeleccionado
    );

    if (supervisorSeleccionado) {
      this.clienteForm.patchValue({
        nombreSupervisor: supervisorSeleccionado.nombreSupervisor
      });
    }
  }


  private coordenadasCambiaron(): boolean {
    return (
      parseFloat(this.clienteOriginal.latitud) !== this.latitud ||
      parseFloat(this.clienteOriginal.longitud) !== this.longitud
    );
  }

}