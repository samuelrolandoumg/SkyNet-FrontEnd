import { Component, OnInit } from '@angular/core';
import { InventarioService } from '../../services/inventario.service';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-listar-inventario',
  templateUrl: './listar-inventario.component.html',
  styleUrls: ['./listar-inventario.component.css'],
    imports: [CommonModule, RouterModule, FormsModule],
})
export class ListarInventarioComponent implements OnInit {
  inventario: any[] = [];
  busqueda: string = '';

  constructor(private inventarioService: InventarioService, private router: Router  ) {}

  ngOnInit(): void {
    this.inventarioService.obtenerInventarioGeneral().subscribe({
      next: (res) => {
        this.inventario = res.inventario || [];
      },
      error: (err) => {
        console.error('Error al obtener inventario general:', err);
      }
    });
  }

  inventarioFiltrado() {
    return this.inventario.filter(item =>
      item.nombreProducto.toLowerCase().includes(this.busqueda.toLowerCase()) ||
      item.nombreProveedor.toLowerCase().includes(this.busqueda.toLowerCase())
    );
  }
  verHistorial(idProducto: number) {
    this.router.navigate(['/historial-inventario'], { queryParams: { idProducto } });
  }
}
