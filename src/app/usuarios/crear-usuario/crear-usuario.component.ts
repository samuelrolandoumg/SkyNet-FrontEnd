import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { UsuarioDto } from '../../interfaces/usuario.interface';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Supervisor } from '../../interfaces/cliente.interface';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule]
})
export class CrearUsuarioComponent implements OnInit {
  usuarioForm!: FormGroup;
  supervisores: Supervisor[] = [];
  admins: Supervisor[] = [];
  mostrarSupervisores = false;
  mostrarAdmins = false;

  roles = [
    { id: 1, nombre: 'ADMIN' },
    { id: 2, nombre: 'SUPERVISOR' },
    { id: 3, nombre: 'TECNICO' }
  ];

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.usuarioForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      usuario: ['', Validators.required],
      contrasena: ['', Validators.required],
      idRol: [null, Validators.required],
      dpi: ['', Validators.required],
      nit: ['', Validators.required],
      direccion: ['', Validators.required],
      idSupervisor: [null],
      idAdmin: [null]
    });

    this.usuarioForm.get('idRol')?.valueChanges.subscribe(idRolSeleccionado => {
      const rol = Number(idRolSeleccionado);

      this.mostrarSupervisores = rol === 3; // TECNICO
      this.mostrarAdmins = rol === 2;       // SUPERVISOR

      const idSupervisorControl = this.usuarioForm.get('idSupervisor');
      const idAdminControl = this.usuarioForm.get('idAdmin');

      // Supervisores
      if (this.mostrarSupervisores) {
        idSupervisorControl?.setValidators(Validators.required);
        this.usuarioService.obtenerSupervisores().subscribe({
          next: (res) => this.supervisores = res,
          error: (err) => console.error('Error al obtener supervisores', err)
        });
      } else {
        idSupervisorControl?.clearValidators();
        idSupervisorControl?.setValue(null);
      }

      // Admins
      if (this.mostrarAdmins) {
        idAdminControl?.setValidators(Validators.required);
        this.usuarioService.getAdmins().subscribe({
          next: (res) => this.admins = res,
          error: (err) => console.error('Error al obtener admins', err)
        });
      } else {
        idAdminControl?.clearValidators();
        idAdminControl?.setValue(null);
      }

      idSupervisorControl?.updateValueAndValidity();
      idAdminControl?.updateValueAndValidity();
    });
  }

  crearUsuario(): void {
    if (this.usuarioForm.invalid) return;

    const usuario: UsuarioDto = {
      ...this.usuarioForm.value,
      estado: true,
      fechaCreacion: new Date().toISOString()
    };

    this.usuarioService.crearUsuario(usuario).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Usuario creado correctamente',
          confirmButtonColor: '#28a745'
        }).then(() => this.router.navigate(['/listar-usuario']));
      },
      error: (err) => {
        console.error('Error al crear usuario:', err);
        Swal.fire({
          icon: 'error',
          title: 'Error al crear usuario',
          text: 'Intente nuevamente más tarde.',
          confirmButtonColor: '#dc3545'
        });
      }
    });
  }
}