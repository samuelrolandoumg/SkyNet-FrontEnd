import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../services/cliente.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar-clientes',
  templateUrl: './listar-clientes.component.html',
  styleUrls: ['./listar-clientes.component.css'],
  imports: [CommonModule]
})
export class ListarClientesComponent implements OnInit {

  clientes: any[] = [];
  cargando = true;

  constructor(private clienteService: ClienteService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.obtenerClientes();
  }

  obtenerClientes(): void {
    this.clienteService.listarClientes().subscribe({
      next: (data) => {
        this.clientes = data;
        this.cargando = false;
      },
      error: (error) => {
        console.error('Error al obtener clientes:', error);
        this.cargando = false;
      }
    });
  }

  editarCliente(idCliente: number): void {
    this.router.navigate(['/editar-cliente'], { queryParams: { idCliente } });
  }

}
