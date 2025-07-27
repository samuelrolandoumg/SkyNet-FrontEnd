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
  tipoVisitaSeleccionado: string = '';
  tecnicos: any[] = [];
  clientes: any[] = [];
  minFecha: string = '';

  idTecnicoSeleccionado: number | null = null;
  idClienteSeleccionado: number | null = null;
  fechaVisita: string = '';
  idSupervisor: number = 0;

  tiposVisita: string[] = [
    'Mantenimiento Correctivo',
    'Revisión Preventiva',
    'Instalación de Cableado',
    'Configuración de Software Empresarial'
  ];

  constructor(
    private clienteService: ClienteService,
    private visitaService: VisitaService
  ) { }

  ngOnInit(): void {
    this.clienteService.obtenerUsuarioDesdeToken().subscribe(usuario => {
      this.idSupervisor = usuario.id;
    });

    const hoy = new Date();
    const anio = hoy.getFullYear();
    const mes = (hoy.getMonth() + 1).toString().padStart(2, '0');
    const dia = hoy.getDate().toString().padStart(2, '0');
    this.minFecha = `${anio}-${mes}-${dia}`;
  }

  onTipoVisitaChange(): void {
    this.tecnicos = [];
    this.idTecnicoSeleccionado = null;
    this.idClienteSeleccionado = null;
    this.clientes = [];

    if (this.tipoVisitaSeleccionado) {
      this.visitaService.getTecnicosPorTipoVisita(this.tipoVisitaSeleccionado, this.idSupervisor).subscribe({
        next: (data) => this.tecnicos = data,
        error: () => {
          Swal.fire('Error', 'No se pudo obtener técnicos para esa visita', 'error');
        }
      });
    }
  }

  cargarClientes(): void {
    if (this.idTecnicoSeleccionado !== null) {
      this.clienteService.obtenerClientesPorTecnico(this.idTecnicoSeleccionado).subscribe(clientes => {
        this.clientes = clientes;
      });
    }
  }

  registrarVisita(): void {
    if (this.idTecnicoSeleccionado && this.idClienteSeleccionado && this.fechaVisita && this.tipoVisitaSeleccionado && this.idSupervisor) {
      const visita = {
        idCliente: this.idClienteSeleccionado,
        idTecnico: this.idTecnicoSeleccionado,
        tipoVisita: this.tipoVisitaSeleccionado,
        fechaVisita: this.fechaVisita,
        usuarioCreo: this.idSupervisor
      };

      this.visitaService.crearVisita(visita).subscribe({
        next: () => {
          Swal.fire('Éxito', 'Visita registrada correctamente', 'success');
          this.tipoVisitaSeleccionado = '';
          this.idTecnicoSeleccionado = null;
          this.idClienteSeleccionado = null;
          this.fechaVisita = '';
          this.tecnicos = [];
          this.clientes = [];
        },
        error: () => {
          Swal.fire('Error', 'No se pudo registrar la visita', 'error');
        }
      });
    }
  }
}