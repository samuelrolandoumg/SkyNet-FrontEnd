import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetalleVisitaService } from '../../services/detalle-visita.service';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { ConsultaVisitaSupervisor } from '../../interfaces/usuario.interface';

@Component({
  selector: 'app-consultar-visitas-supervisor',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './consultar-visitas-supervisor.component.html',
  styleUrls: ['./consultar-visitas-supervisor.component.css']
})
export class ConsultarVisitasSupervisorComponent implements OnInit {
  visitas: ConsultaVisitaSupervisor[] = [];
  visitasFiltradas: ConsultaVisitaSupervisor[] = [];
  fechaFiltro: string = '';
  usuario: any;

  constructor(
    private authService: AuthService,
    private visitaService: DetalleVisitaService
  ) {}

  ngOnInit(): void {
    this.usuario = this.authService.obtenerUsuario();
    if (this.usuario?.id) {
      this.visitaService.obtenerVisitasPorSupervisor(this.usuario.id).subscribe({
        next: (data) => {
          this.visitas = data;
          this.visitasFiltradas = data;
        },
        error: (err) => {
          console.error('Error cargando visitas:', err);
        }
      });
    }
  }

  filtrarPorFecha() {
    if (this.fechaFiltro) {
      this.visitasFiltradas = this.visitas.filter(
        v => v.fechaVisita === this.fechaFiltro
      );
    } else {
      this.visitasFiltradas = this.visitas;
    }
  }
}
