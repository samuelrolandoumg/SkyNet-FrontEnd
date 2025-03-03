import { Component } from '@angular/core';
import { CategoriasService } from '../services/categorias.service';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-crear-categoria',
  templateUrl: './crear-categoria.component.html',
  styleUrl: './crear-categoria.component.css',
  standalone: true, 
  imports: [CommonModule, RouterModule, FormsModule],
})
export class CrearCategoriaComponent {
  categoria = {
    nombre: '',
    descripcion: '',
    estado: true
  };
  mensaje = '';

  constructor(private categoriasService: CategoriasService) {}

  crearCategoria() {
    this.categoriasService.agregarCategoria(this.categoria).subscribe(
      (response) => {
        this.mensaje = 'Categoría creada con éxito';
        this.categoria = { nombre: '', descripcion: '', estado: true }; 
      },
      (error) => {
        this.mensaje = 'Error al crear la categoría';
      }
    );
  }
}