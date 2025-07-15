import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetalleVisitaService } from '../../services/detalle-visita.service';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { ConsultaVisitaSupervisor } from '../../interfaces/usuario.interface';
import { AlertasService } from '../../services/alertas.service';
import Swal from 'sweetalert2';

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
    private visitaService: DetalleVisitaService,
    private alertaService: AlertasService
  ) { }

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

  alertarRetraso(visitaId: number): void {
    this.alertaService.alertarRetrasoTecnico(visitaId).subscribe({
      next: () => {
        Swal.fire({
          title: 'Alerta enviada',
          text: 'Se ha generado la alerta de retraso al técnico.',
          icon: 'success',
          confirmButtonText: 'OK'
        }).then(() => {
          window.location.reload(); 
        });
      },
      error: (err) => {
        console.error(err);
        Swal.fire('Error', 'No se pudo generar la alerta.', 'error');
      }
    });
  }

}
