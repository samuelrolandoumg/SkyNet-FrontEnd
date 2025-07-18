import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { UsuarioDto, UsuarioUpdateDto } from '../../interfaces/usuario.interface';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { Supervisor } from '../../interfaces/cliente.interface';

@Component({
  selector: 'app-editar-usuario',
  standalone: true,
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css'],
  imports: [CommonModule, ReactiveFormsModule, FormsModule]
})
export class EditarUsuarioComponent implements OnInit {
  usuarioForm!: FormGroup;
  idUsuario!: number;
  formEditado = false;
  usuarioOriginal!: UsuarioDto;
  supervisorActual: { idUsuario: number; usuario: string } | null = null;
  listaSupervisores: Supervisor[] = [];
  rolUsuarioLogueado: string = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private usuarioService: UsuarioService
  ) { }

  ngOnInit(): void {
    const usuario = JSON.parse(localStorage.getItem('usuario')!);
    this.rolUsuarioLogueado = usuario?.rol || '';

    this.idUsuario = Number(this.route.snapshot.queryParams['id']);
    if (isNaN(this.idUsuario)) return;

    this.usuarioService.obtenerUsuarioPorId(this.idUsuario).subscribe({
      next: (usuario) => {
        this.usuarioOriginal = usuario;

        const crearFormulario = () => {
          this.usuarioForm = this.fb.group({
            nombre: [usuario.nombre, Validators.required],
            apellido: [usuario.apellido, Validators.required],
            correo: [usuario.correo, [Validators.required, Validators.email]],
            usuario: [usuario.usuario, Validators.required],
            rol: [usuario.rol],
            dpi: [usuario.dpi, Validators.required],
            nit: [usuario.nit, Validators.required],
            direccion: [usuario.direccion, Validators.required],
            idSupervisor: [usuario.idSupervisor ?? null],
            puestoTecnico: [usuario.rol === 'TECNICO' ? usuario.puestoTecnico : null]
          });

          // Agregar validación solo si es técnico
          if (usuario.rol === 'TECNICO') {
            this.usuarioForm.get('puestoTecnico')?.setValidators(Validators.required);
          }

          this.usuarioForm.valueChanges.subscribe(() => {
            const actual = this.usuarioForm.getRawValue();
            this.formEditado =
              actual.nombre !== usuario.nombre ||
              actual.apellido !== usuario.apellido ||
              actual.correo !== usuario.correo ||
              actual.usuario !== usuario.usuario ||
              actual.dpi !== usuario.dpi ||
              actual.nit !== usuario.nit ||
              actual.direccion !== usuario.direccion ||
              actual.idSupervisor !== usuario.idSupervisor ||
              actual.puestoTecnico !== usuario.puestoTecnico;
          });
        };

        // Si es técnico, primero carga supervisores y luego el form
        if (usuario.rol === 'TECNICO') {
          this.usuarioService.obtenerSupervisores().subscribe({
            next: (data) => {
              this.listaSupervisores = data;
              crearFormulario();
            },
            error: (err) => console.error('Error al cargar supervisores:', err)
          });
        } else {
          crearFormulario();
        }
      },
      error: (err) => console.error('Error al obtener usuario:', err)
    });
  }


  actualizarUsuario(): void {
    if (this.usuarioForm.invalid) return;
    const form = this.usuarioForm.getRawValue();

    const datosActualizados: UsuarioUpdateDto = {
      id: this.idUsuario,
      nombre: form.nombre,
      apellido: form.apellido,
      correo: form.correo,
      usuario: form.usuario,
      direccion: form.direccion,
      dpi: form.dpi,
      nit: form.nit,
      idRol: this.usuarioOriginal.idRol,
      idSupervisor: form.idSupervisor,
      estado: this.usuarioOriginal.estado,
      rol: this.usuarioOriginal.rol,
      puestoTecnico: this.usuarioOriginal.rol === 'TECNICO' ? form.puestoTecnico : null
    };

    this.usuarioService.actualizarUsuario(datosActualizados).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Usuario actualizado correctamente',
          confirmButtonColor: '#28a745'
        }).then(() => this.router.navigate(['/listar-usuario']));
        this.formEditado = false;
      },
      error: (err) => {
        console.error('Error al actualizar usuario:', err);
        Swal.fire({
          icon: 'error',
          title: 'Error al actualizar',
          text: 'Intente nuevamente.',
          confirmButtonColor: '#dc3545'
        });
      }
    });
  }


  onSupervisorSeleccionado(event: Event): void {
    const idSeleccionado = (event.target as HTMLSelectElement).value;
    this.usuarioOriginal.idSupervisor = Number(idSeleccionado);
    this.formEditado = true;
  }
}
