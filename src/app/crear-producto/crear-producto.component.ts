import { Component } from '@angular/core';
import { ProductosService } from '../services/productos.service';
import { CategoriasService } from '../services/categorias.service';

import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css'],
  standalone: true, 
  imports: [CommonModule, RouterModule, FormsModule],
})
export class CrearProductoComponent {
  nombre = '';
  descripcion = '';
  precio: number = 0;
  stock: number = 0;
  categoria_id: number = 1;
  categorias: any[] = []; 
  imagen!: File;

  constructor(private productosService: ProductosService,private categoriasService: CategoriasService, private router: Router) {}

  ngOnInit() {
    this.obtenerCategorias(); 
  }

  obtenerCategorias() {
    this.categoriasService.obtenerCategorias().subscribe(
      (response) => {
        this.categorias = response.categorias;
      },
      (error) => {
        console.error('Error al obtener categorías:', error);
      }
    );
  }

  seleccionarImagen(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.imagen = event.target.files[0];
      console.log('Imagen seleccionada:', this.imagen);
    }
  }

  crearProducto() {
    const formData = new FormData();
    formData.append('nombre', this.nombre);
    formData.append('descripcion', this.descripcion);
    formData.append('precio', this.precio.toString());
    formData.append('stock', this.stock.toString());
    formData.append('categoria_id', this.categoria_id.toString());

    if (this.imagen) {
      formData.append('file', this.imagen);
    } else {
      console.warn('No se ha seleccionado ninguna imagen.');
    }

    this.productosService.crearProducto(formData).subscribe(
      (response) => {
        console.log('Producto creado correctamente:', response);
        this.router.navigate(['/productos']); 
      },
      (error) => {
        console.error('Error al crear producto:', error);
      }
    );
  }
}
