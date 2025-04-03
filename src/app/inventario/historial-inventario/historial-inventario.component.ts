import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InventarioService } from '../../services/inventario.service';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-historial-inventario',
  templateUrl: './historial-inventario.component.html',
  styleUrls: ['./historial-inventario.component.css'],
  imports: [CommonModule, RouterModule, FormsModule],
  
})
export class HistorialInventarioComponent implements OnInit {
  historial: any[] = [];
  idProducto!: number;
  mensaje: string = '';

  constructor(
    private route: ActivatedRoute,
    private inventarioService: InventarioService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.idProducto = +params['idProducto'];
      this.obtenerHistorial();
    });
  }

  obtenerHistorial(): void {
    this.inventarioService.obtenerHistorialPorProducto(this.idProducto).subscribe({
      next: (res) => {
        this.historial = res.historial;
        this.mensaje = '';
      },
      error: (err) => {
        this.mensaje = err.error?.message || 'Error al cargar historial.';
        this.historial = [];
      }
    });
  }
}
