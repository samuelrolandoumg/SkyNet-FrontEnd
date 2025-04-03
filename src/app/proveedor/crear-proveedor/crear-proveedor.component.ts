import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProveedorService } from '../../services/proveedor.service';

@Component({
  selector: 'app-crear-proveedor',
  templateUrl: './crear-proveedor.component.html',
  styleUrls: ['./crear-proveedor.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class CrearProveedorComponent {
  nombre = '';
  empresa = '';
  telefono = '';
  direccion = '';
  fechaNacimiento = '';

  mensajeError = '';
  mensajeExito = '';

  constructor(private proveedorService: ProveedorService) {}

  crearProveedor() {
    const proveedor = {
      nombre: this.nombre,
      empresa: this.empresa,
      telefono: this.telefono,
      direccion: this.direccion,
      fechaNacimiento: this.fechaNacimiento,
    };

    this.proveedorService.crearProveedor(proveedor).subscribe({
      next: (res) => {
        this.mensajeError = '';
        this.mensajeExito = 'Proveedor creado con éxito.';

        this.nombre = '';
        this.empresa = '';
        this.telefono = '';
        this.direccion = '';
        this.fechaNacimiento = '';
      },
      error: (err) => {
        this.mensajeExito = '';
        this.mensajeError = err?.error?.message || 'Error al crear el proveedor.';
      },
    });
  }
}
