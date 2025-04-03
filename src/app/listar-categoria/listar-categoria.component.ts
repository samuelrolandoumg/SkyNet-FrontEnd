import { Component, OnInit } from '@angular/core';
import { CategoriasService } from '../services/categorias.service';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-listar-categoria',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './listar-categoria.component.html',
  styleUrl: './listar-categoria.component.css'
})
export class ListarCategoriaComponent implements OnInit {
  categorias: any[] = [];
  busqueda: string = '';

  constructor(private categoriasService: CategoriasService, private router: Router) {}

  ngOnInit() {
    this.obtenerCategorias();
  }

  obtenerCategorias() {
    this.categoriasService.obtenerCategorias().subscribe(
      (response: any) => {
        this.categorias = response.categorias;
      },
      (error) => {
        console.error('Error al obtener categorías:', error);
      }
    );
  }

  editarCategoria(id: number) {
    this.router.navigate(['/editar-categoria'], { queryParams: { idCategoria: id } });
  }
  
  irCrearCategoria() {
    this.router.navigate(['/crear-categorias']);
  }
  categoriasFiltradas() {
    if (!this.busqueda.trim()) return this.categorias;

    const filtro = this.busqueda.toLowerCase();
    return this.categorias.filter(c =>
      c.nombre.toLowerCase().includes(filtro) ||
      c.descripcion?.toLowerCase().includes(filtro) ||
      String(c.id).includes(filtro)
    );
  }
}