import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InventarioService } from '../../services/inventario.service';
import { ProductosService } from '../../services/productos.service';
import { ProveedorService } from '../../services/proveedor.service';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-agregar-inventario',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './agregar-inventario.component.html',
  styleUrls: ['./agregar-inventario.component.css'],
})
export class AgregarInventarioComponent implements OnInit {
  idProducto!: number;
  idProveedor!: number;
  cantidad!: number;
  precioUnitario!: number;

  mensaje = '';
  tipoMensaje = '';

  productos: any[] = [];
  proveedores: any[] = [];

  constructor(
    private inventarioService: InventarioService,
    private productosService: ProductosService,
    private proveedorService: ProveedorService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.productosService.obtenerProductos().subscribe({
      next: (res) => (this.productos = res.productos),
      error: () => console.error('Error al cargar productos'),
    });

    this.proveedorService.obtenerProveedores().subscribe({
      next: (res) => (this.proveedores = res.proveedores),
      error: () => console.error('Error al cargar proveedores'),
    });
  }

  registrarInventario() {
    const data = {
      idProducto: this.idProducto,
      idProveedor: this.idProveedor,
      cantidad: this.cantidad,
      precioUnitario: this.precioUnitario,
    };

    this.inventarioService.crearInventario(data).subscribe({
      next: (res) => {
        this.tipoMensaje = 'exito';
        this.mensaje = res.message || 'Inventario registrado con éxito.';
        this.idProducto = 0;
        this.idProveedor = 0;
        this.cantidad = 0;
        this.precioUnitario = 0;
      },
      error: (err) => {
        this.tipoMensaje = 'error';
        this.mensaje = err.error.message || 'Error al registrar inventario.';
        console.error(err);
      },
    });
  }
}
