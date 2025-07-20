import { Component, OnInit } from '@angular/core';
import { TecnicoVisitaResumen } from '../../interfaces/visita.interface';
import { VisitaService } from '../../services/visita.service';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

interface SupervisorGrupo {
  nombreSupervisor: string;
  tecnicos: TecnicoVisitaResumen[];
}

@Component({
  selector: 'app-reporte-supervisor-visitas',
  templateUrl: './reporte-supervisor-visitas.component.html',
  styleUrls: ['./reporte-supervisor-visitas.component.css'],
  imports: [CommonModule]
})
export class ReporteSupervisorVisitasComponent implements OnInit {

  tecnicoResumenes: TecnicoVisitaResumen[] = [];
  resumenSupervisores: SupervisorGrupo[] = [];
  usuario: any;

  constructor(
    private visitaService: VisitaService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.usuario = this.authService.obtenerUsuario();
    const idSupervisor = this.usuario?.id;

    if (idSupervisor) {
      this.visitaService.getResumenTecnicos(idSupervisor).subscribe({
        next: (resumenes) => {
          this.tecnicoResumenes = resumenes;
          this.resumenSupervisores = this.agruparPorSupervisor(resumenes);
        },
        error: (error) => {
          console.error('Error al obtener resumen de técnicos:', error);
        }
      });
    }
  }

  agruparPorSupervisor(resumenes: TecnicoVisitaResumen[]): SupervisorGrupo[] {
    const grupos: { [supervisor: string]: TecnicoVisitaResumen[] } = {};

    for (const resumen of resumenes) {
      const supervisor = resumen.nombreSupervisor;
      if (!grupos[supervisor]) {
        grupos[supervisor] = [];
      }
      grupos[supervisor].push(resumen);
    }

    return Object.keys(grupos).map(nombreSupervisor => ({
      nombreSupervisor,
      tecnicos: grupos[nombreSupervisor]
    }));
  }

  getTotalVisitas(supervisor: SupervisorGrupo): number {
    return supervisor.tecnicos.reduce((sum, t) => sum + t.totalVisitas, 0);
  }

  getEstadoCount(supervisor: SupervisorGrupo, estado: string): number {
    return supervisor.tecnicos.reduce((sum, t) => {
      switch (estado) {
        case 'CREADO':
          return sum + t.creadas;
        case 'SERVICIO INICIADO':
          return sum + t.iniciadas;
        case 'FINALIZADO':
          return sum + (t.finalizadasExito || 0) + (t.finalizadasIncidencia || 0);
        case 'CANCELADA':
          return sum + t.cancelada;
        default:
          return sum;
      }
    }, 0);
  }


}
