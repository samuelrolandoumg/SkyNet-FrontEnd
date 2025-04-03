import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FarmaciaService } from '../../services/farmacia.service';

@Component({
  selector: 'app-crear-farmacia',
  templateUrl: './crear-farmacia.component.html',
  styleUrls: ['./crear-farmacia.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class CrearFarmaciaComponent {
  nombre: string = '';
  direccion: string = '';
  telefono: string = '';
  mensaje: string = '';
  tipoMensaje: string = ''; // 'exito' | 'error'

  constructor(private farmaciaService: FarmaciaService) {}

  crearFarmacia() {
    const nuevaFarmacia = {
      nombre: this.nombre,
      direccion: this.direccion,
      telefono: this.telefono
    };

    this.farmaciaService.crearFarmacia(nuevaFarmacia).subscribe({
      next: (res) => {
        this.tipoMensaje = 'exito';
        this.mensaje = res.message || 'Farmacia creada con éxito.';
        this.nombre = '';
        this.direccion = '';
        this.telefono = '';
        setTimeout(() => this.mensaje = '', 3000);
      },
      error: (err) => {
        this.tipoMensaje = 'error';
        this.mensaje = err?.error?.message || 'Error al crear farmacia.';
      }
    });
  }
}
