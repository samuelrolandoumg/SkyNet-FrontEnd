import { Component } from '@angular/core';
import { ProductosService } from '../services/productos.service';

@Component({
  selector: 'app-eliminar-producto',
  templateUrl: './eliminar-producto.component.html',
  styleUrls: ['./eliminar-producto.component.css'],
})
export class EliminarProductoComponent {
  id!: number;

  constructor(private productosService: ProductosService) {}

  eliminarProducto() {
    this.productosService.eliminarProducto(this.id).subscribe(
      (response) => {
        console.log('Producto eliminado:', response);
      },
      (error) => {
        console.error('Error al eliminar producto:', error);
      }
    );
  }
}
