import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductosService } from '../services/productos.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-listar-productos',
  templateUrl: './listar-productos.component.html',
  styleUrls: ['./listar-productos.component.css'],
  standalone: true, 
  imports: [CommonModule], 
})
export class ListarProductosComponent implements OnInit {
  productos: any[] = [];

  constructor(private router: Router, private productosService: ProductosService) {}

  ngOnInit() {
    this.obtenerProductos();
  }

  obtenerProductos() {
    this.productosService.obtenerProductos().subscribe(
      (response: any) => {
        this.productos = response.productos;
      },
      (error) => {
        console.error('🔥 Error al obtener productos:', error);
      }
    );
  }

  irCrearProducto() {
    this.router.navigate(['/crear-productos']);
  }

  // Redirigir a editar con queryParams
  editarProducto(id: number) {
    this.router.navigate(['/editar-productos'], { queryParams: { idProducto: id } });
  }

  // **Eliminar producto**
  eliminarProducto(id: number) {
    if (confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      this.productosService.eliminarProducto(id).subscribe(
        () => {
          console.log('Producto eliminado correctamente');
          this.obtenerProductos(); // Refrescar la lista
        },
        (error) => {
          console.error('Error al eliminar producto:', error);
        }
      );
    }
  }
}
