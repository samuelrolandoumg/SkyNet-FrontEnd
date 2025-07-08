import { Component, OnInit } from '@angular/core';
import { VisitaService } from '../../services/visita.service';
import { ClienteService } from '../../services/cliente.service';
import { VisitaDto } from '../../interfaces/visita.interface';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-consultar-visitas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './consultar-visitas.component.html',
  styleUrl: './consultar-visitas.component.css'
})
export class ConsultarVisitasComponent implements OnInit {
  visitas: VisitaDto[] = [];
  idTecnico: number = 0;

  constructor(
    private visitaSrv: VisitaService,
    private clienteSrv: ClienteService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.clienteSrv.obtenerUsuarioDesdeToken().subscribe(usuario => {
      this.idTecnico = usuario.id;
      this.obtenerVisitas();
    });
  }

  obtenerVisitas(): void {
    this.visitaSrv.obtenerVisitasPorTecnico(this.idTecnico).subscribe(data => {
      this.visitas = data;
    });
  }

  verRuta(cliente: VisitaDto): void {
    this.router.navigate(['/ver-ubicacion-cliente'], {
      state: { cliente: cliente }
    });
  }

  verDetalles(visita: VisitaDto): void {
    this.router.navigate(['/detalle-visita'], {
      state: {
        idVisita: visita.idVisita,
        estado: visita.estado,
        nombreCliente: visita.nombreCliente,
        nombreNegocio: visita.nombreNegocio
      }
    });
  }
}
