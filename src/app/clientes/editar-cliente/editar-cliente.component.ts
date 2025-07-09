import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClienteService } from '../../services/cliente.service';
import { ClienteDto, ClienteUpdateDto, TecnicoDto } from '../../interfaces/cliente.interface';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.component.html',
  styleUrls: ['./editar-cliente.component.css'],
  imports: [CommonModule, ReactiveFormsModule, FormsModule]
})
export class EditarClienteComponent implements OnInit {
  clienteForm!: FormGroup;
  clienteId!: number;
  cargando = true;
  clienteOriginal!: ClienteDto;
  tecnicos: TecnicoDto[] = [];
  formEditado = false;

  constructor(
    private route: ActivatedRoute,
    private clienteService: ClienteService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.clienteId = +params['idCliente'];
      if (this.clienteId > 0) {
        this.inicializarFormulario();
        this.cargarCliente();
      }
    });

    this.cargarTecnicos();
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
      idTecnico: [null, Validators.required],
      nombreTecnico: ['']
    });

    this.clienteForm.valueChanges.subscribe(() => {
      if (!this.clienteOriginal) return;

      const actual = this.clienteForm.getRawValue();

      // Compara campo por campo con el original
      this.formEditado =
        actual.nombreCliente !== this.clienteOriginal.nombreCliente ||
        actual.nombreNegocio !== this.clienteOriginal.nombreNegocio ||
        actual.telefono !== this.clienteOriginal.telefono ||
        actual.correo !== this.clienteOriginal.correo ||
        actual.nit !== this.clienteOriginal.nit ||
        actual.estado !== this.clienteOriginal.estado ||
        actual.idRol !== this.clienteOriginal.idRol ||
        actual.idTecnico !== this.clienteOriginal.idTecnico;
    });
  }

  cargarCliente(): void {
    this.clienteService.obtenerClientePorId(this.clienteId).subscribe({
      next: (cliente: ClienteDto) => {
        this.clienteOriginal = cliente;
        this.clienteForm.patchValue({
          nombreCliente: cliente.nombreCliente,
          nombreNegocio: cliente.nombreNegocio,
          telefono: cliente.telefono,
          correo: cliente.correo,
          nit: cliente.nit,
          estado: cliente.estado,
          idRol: cliente.idRol,
          idTecnico: cliente.idTecnico,
          nombreTecnico: cliente.nombreTecnico
        });
        this.cargando = false;
      },
      error: err => {
        console.error('Error al cargar cliente:', err);
        this.cargando = false;
      }
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
      latitud: this.clienteOriginal.latitud || '',
      longitud: this.clienteOriginal.longitud || '',
      idTecnico: form.idTecnico || this.clienteOriginal.idTecnico
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
    this.clienteService.obtenerTecnicosPorRol().subscribe({
      next: (data) => {
        this.tecnicos = data;
      },
      error: (err) => {
        console.error('Error al cargar técnicos:', err);
      }
    });
  }

  onTecnicoSeleccionado(): void {
    const idSeleccionado = this.clienteForm.get('idTecnico')?.value;
    const tecnicoSeleccionado = this.tecnicos.find(t => t.idUsuario === idSeleccionado);

    if (tecnicoSeleccionado) {
      this.clienteForm.patchValue({
        nombreTecnico: tecnicoSeleccionado.nombreTecnico
      });
    }
  }
}