import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FarmaciaService } from '../../services/farmacia.service';

@Component({
  selector: 'app-editar-farmacia',
  templateUrl: './editar-farmacia.component.html',
  styleUrls: ['./editar-farmacia.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class EditarFarmaciaComponent implements OnInit {
  nombre: string = '';
  direccion: string = '';
  telefono: string = '';
  mensaje: string = '';
  tipoMensaje: string = '';
  id: number = 0;

  constructor(
    private route: ActivatedRoute,
    private farmaciaService: FarmaciaService
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.obtenerFarmacia();
  }

  obtenerFarmacia() {
    this.farmaciaService.obtenerFarmaciaPorId(this.id).subscribe({
      next: (res) => {
        this.nombre = res.nombre;
        this.direccion = res.direccion;
        this.telefono = res.telefono;
      },
      error: (err) => {
        this.mensaje = err.error.message || 'Error al obtener la farmacia.';
        this.tipoMensaje = 'error';
      }
    });
  }

  actualizarFarmacia() {
    const farmaciaActualizada = {
      nombre: this.nombre,
      direccion: this.direccion,
      telefono: this.telefono
    };

    // this.farmaciaService.actualizarFarmacia(this.id, farmaciaActualizada).subscribe({
    //   next: (res) => {
    //     this.mensaje = res.message || 'Farmacia actualizada correctamente.';
    //     this.tipoMensaje = 'exito';
    //   },
    //   error: (err) => {
    //     this.mensaje = err.error.message || 'Error al actualizar la farmacia.';
    //     this.tipoMensaje = 'error';
    //   }
    // });
  }
}
