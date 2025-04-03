import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProveedorService } from '../../services/proveedor.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-listar-proveedores',
  templateUrl: './listar-proveedores.component.html',
  styleUrls: ['./listar-proveedores.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule]
})
export class ListarProveedoresComponent implements OnInit {
  proveedores: any[] = [];
  busqueda: string = '';

  constructor(private proveedorService: ProveedorService, private router: Router) {}

  ngOnInit(): void {
    this.obtenerProveedores();
  }

  obtenerProveedores() {
    this.proveedorService.obtenerProveedores().subscribe({
      next: (res) => {
        this.proveedores = res.proveedores || [];
      },
      error: (err) => {
        console.error('Error al obtener proveedores:', err);
      }
    });
  }

  irCrearProveedor() {
    this.router.navigate(['/crear-proveedor']);
  }

  editarProveedor(id: number) {
    this.router.navigate(['/editar-proveedor'], { queryParams: { idProveedor: id } });
  }

  eliminarProveedor(id: number) {
    if (confirm('¿Estás seguro de eliminar este proveedor?')) {
      this.proveedorService.eliminarProveedor(id).subscribe({
        next: () => this.obtenerProveedores(),
        error: (err) => console.error('Error al eliminar proveedor:', err)
      });
    }
  }

  proveedoresFiltrados() {
    if (!this.busqueda.trim()) return this.proveedores;

    const filtro = this.busqueda.toLowerCase();
    return this.proveedores.filter(p =>
      p.nombre.toLowerCase().includes(filtro) ||
      p.empresa?.toLowerCase().includes(filtro) ||
      p.telefono?.toLowerCase().includes(filtro)
    );
  }
}
