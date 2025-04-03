import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriasService } from '../services/categorias.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-editar-categoria',
  templateUrl: './editar-categoria.component.html',
  styleUrls: ['./editar-categoria.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule]
})
export class EditarCategoriaComponent implements OnInit {
  idCategoria!: number;
  nombre = '';
  descripcion = '';
  estado: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private categoriasService: CategoriasService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.queryParamMap.get('idCategoria');
    if (id) {
      this.idCategoria = +id;
      this.obtenerCategoriaPorId(this.idCategoria);
    }
  }

  obtenerCategoriaPorId(id: number) {
    this.categoriasService.obtenerCategoriaPorId(id).subscribe({
      next: (res: any) => {
        const categoria = res.categoria;
        this.nombre = categoria.nombre;
        this.descripcion = categoria.descripcion;
        this.estado = categoria.estado;
      },
      error: err => {
        console.error('Error al obtener la categoría', err);
      }
    });
  }

  actualizarCategoria() {
    const datos = {
      nombre: this.nombre,
      descripcion: this.descripcion,
      estado: this.estado
    };

    this.categoriasService.editarCategoria(this.idCategoria, datos).subscribe({
      next: () => {
        console.log('Categoría actualizada correctamente');
        this.router.navigate(['/categorias']);
      },
      error: err => {
        console.error('Error al actualizar la categoría:', err);
      }
    });
  }
}
