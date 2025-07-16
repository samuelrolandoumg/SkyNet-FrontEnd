import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../services/cliente.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

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

  eliminarCliente(idCliente: number): void {
    this.clienteService.verificarVisitasPendientes(idCliente).subscribe({
      next: (visitas: number) => {
        if (visitas > 0) {
          Swal.fire({
            icon: 'error',
            title: 'No se puede eliminar',
            text: `Este cliente tiene ${visitas} visita(s) pendiente(s)`,
            confirmButtonColor: '#dc3545'
          });
        } else {
          // Si no hay visitas pendientes, mostrar confirmación
          Swal.fire({
            title: '¿Estás seguro?',
            text: 'Esta acción eliminará al cliente de la lista',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#6c757d',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
          }).then((result) => {
            if (result.isConfirmed) {
              this.clienteService.eliminarCliente(idCliente).subscribe({
                next: () => {
                  Swal.fire({
                    icon: 'success',
                    title: 'Cliente eliminado',
                    text: 'El cliente fue eliminado correctamente',
                    confirmButtonColor: '#28a745'
                  }).then(() => {
                    this.obtenerClientes();
                  });
                },
                error: (err) => {
                  console.error('Error al eliminar cliente:', err);
                  Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'No se pudo eliminar el cliente',
                    confirmButtonColor: '#dc3545'
                  });
                }
              });
            }
          });
        }
      },
      error: (err) => {
        console.error('Error al verificar visitas:', err);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo verificar si el cliente tiene visitas pendientes',
          confirmButtonColor: '#dc3545'
        });
      }
    });
  }


}
