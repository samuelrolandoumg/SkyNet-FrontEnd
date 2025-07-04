import { Component, OnInit } from '@angular/core';
import { ClienteTecnico, Supervisor } from '../../interfaces/cliente.interface';
import { VisitaService } from '../../services/visita.service';
import { CrearVisitaDto } from '../../interfaces/visita.interface';
import Swal from 'sweetalert2';
import { ClienteService } from '../../services/cliente.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-registrar-visita',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './registrar-visita.component.html',
  styleUrl: './registrar-visita.component.css'
})
export class RegistrarVisitaComponent implements OnInit {

  tecnicos: any[] = [];
  clientes: any[] = [];

  idTecnicoSeleccionado: number | null = null;
  idClienteSeleccionado: number | null = null;
  fechaVisita: string = '';

  idSupervisor: number = 0;

  constructor(
    private clienteService: ClienteService,
    private visitaService: VisitaService
  ) {}

  ngOnInit(): void {
    this.clienteService.obtenerUsuarioDesdeToken().subscribe(usuario => {
      this.idSupervisor = usuario.id;
      this.cargarTecnicos();
    });
  }

  cargarTecnicos(): void {
    this.clienteService.obtenerTecnicosPorSupervisor(this.idSupervisor).subscribe(tecnicos => {
      this.tecnicos = tecnicos;
    });
  }

  cargarClientes(): void {
    if (this.idTecnicoSeleccionado !== null) {
      this.clienteService.obtenerClientesPorTecnico(this.idTecnicoSeleccionado).subscribe(clientes => {
        this.clientes = clientes;
      });
    }
  }

  registrarVisita(): void {
    if (this.idTecnicoSeleccionado && this.idClienteSeleccionado && this.fechaVisita) {
      const visita = {
        idSupervisor: this.idSupervisor,
        idTecnico: this.idTecnicoSeleccionado,
        idCliente: this.idClienteSeleccionado,
        fechaVisita: this.fechaVisita
      };

      this.visitaService.crearVisita(visita).subscribe({
        next: () => {
          Swal.fire('Éxito', 'Visita registrada correctamente', 'success');
          this.idTecnicoSeleccionado = null;
          this.idClienteSeleccionado = null;
          this.fechaVisita = '';
          this.clientes = [];
        },
        error: () => {
          Swal.fire('Error', 'No se pudo registrar la visita', 'error');
        }
      });
    }
  }
}