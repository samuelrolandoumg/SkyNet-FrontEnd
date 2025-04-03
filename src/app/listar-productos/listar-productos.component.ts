import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../services/productos.service';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-listar-productos',
  templateUrl: './listar-productos.component.html',
  styleUrls: ['./listar-productos.component.css'],
  standalone: true, 
  imports: [CommonModule, RouterModule, FormsModule],
})
export class ListarProductosComponent implements OnInit {
  productos: any[] = [];
  busqueda: string = '';

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
        console.error('Error al obtener productos:', error);
      }
    );
  }

  irCrearProducto() {
    this.router.navigate(['/crear-productos']);
  }

  editarProducto(id: number) {
    this.router.navigate(['/editar-productos'], { queryParams: { idProducto: id } });
  }

  eliminarProducto(id: number) {
    if (confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      this.productosService.eliminarProducto(id).subscribe(
        () => {
          console.log('Producto eliminado correctamente');
          this.obtenerProductos(); 
        },
        (error) => {
          console.error('Error al eliminar producto:', error);
        }
      );
    }
  }

  productosFiltrados() {
    if (!this.busqueda.trim()) return this.productos;
  
    const filtro = this.busqueda.toLowerCase();
    return this.productos.filter(p =>
      p.nombre.toLowerCase().includes(filtro) ||
      p.descripcion?.toLowerCase().includes(filtro) ||
      String(p.id).includes(filtro)
    );
  }
  
}
