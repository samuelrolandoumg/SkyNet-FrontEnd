import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProveedorService } from '../../services/proveedor.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-editar-proveedor',
  templateUrl: './editar-proveedor.component.html',
  styleUrls: ['./editar-proveedor.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule]
})
export class EditarProveedorComponent implements OnInit {
  idProveedor!: number;
  nombre: string = '';
  empresa: string = '';
  telefono: string = '';
  direccion: string = '';
  fechaNacimiento: string = '';

  mensajeError: string = '';
  mensajeExito: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private proveedorService: ProveedorService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      if (params['idProveedor']) {
        this.idProveedor = +params['idProveedor'];
        this.obtenerProveedor();
      }
    });
  }

  obtenerProveedor() {
    this.proveedorService.obtenerProveedorPorId(this.idProveedor).subscribe({
      next: (res) => {
        const proveedor = res.proveedor;
        this.nombre = proveedor.nombre;
        this.empresa = proveedor.empresa;
        this.telefono = proveedor.telefono;
        this.direccion = proveedor.direccion;
        this.fechaNacimiento = proveedor.fechaNacimiento;
      },
      error: (err) => {
        this.mensajeError = 'Error al obtener el proveedor.';
        console.error(err);
      }
    });
  }

  actualizarProveedor() {
    const datos = {
      nombre: this.nombre,
      empresa: this.empresa,
      telefono: this.telefono,
      direccion: this.direccion,
      fechaNacimiento: this.fechaNacimiento
    };

    this.proveedorService.actualizarProveedor(this.idProveedor, datos).subscribe({
      next: (res) => {
        this.mensajeError = '';
        this.mensajeExito = res.message || 'Proveedor actualizado exitosamente.';
        setTimeout(() => this.router.navigate(['/proveedores']), 1500);
      },
      error: (err) => {
        this.mensajeExito = '';
        this.mensajeError = err?.error?.message || 'Error al actualizar proveedor.';
        console.error(err);
      }
    });
  }
}
