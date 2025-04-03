import { Component, OnInit } from '@angular/core';
import { FarmaciaService } from '../../services/farmacia.service';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-listar-farmacias',
  templateUrl: './listar-farmacias.component.html',
  styleUrls: ['./listar-farmacias.component.css'],
  imports: [CommonModule, RouterModule, FormsModule],
})
export class ListarFarmaciasComponent implements OnInit {
  farmacias: any[] = [];
  busqueda: string = '';

  constructor(private farmaciaService: FarmaciaService, private router: Router) {}

  ngOnInit(): void {
    this.farmaciaService.obtenerFarmacias().subscribe({
      next: (res) => {
        this.farmacias = res.farmacias || [];
      },
      error: (err) => {
        console.error('Error al cargar farmacias:', err);
      }
    });
  }

  irCrearFarmacia() {
    this.router.navigate(['/crear-farmacia']);
  }

  farmaciasFiltradas() {
    const filtro = this.busqueda.toLowerCase();
    return this.farmacias.filter(f =>
      f.nombre.toLowerCase().includes(filtro) ||
      f.direccion.toLowerCase().includes(filtro) ||
      f.telefono.includes(filtro)
    );
  }
}
