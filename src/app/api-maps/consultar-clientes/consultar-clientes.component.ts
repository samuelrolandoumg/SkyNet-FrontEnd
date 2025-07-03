import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../services/cliente.service';
import { Router } from '@angular/router';
import { UbicacionDto } from '../../interfaces/cliente.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-consultar-clientes',
  imports: [CommonModule],
  templateUrl: './consultar-clientes.component.html',
  styleUrl: './consultar-clientes.component.css'
})
export class ConsultarClientesComponent implements OnInit {
  clientes: UbicacionDto[] = [];
  idSupervisor: number = 0;

  constructor(private clienteSrv: ClienteService, private router: Router) {}

  ngOnInit(): void {
    this.clienteSrv.obtenerUsuarioDesdeToken().subscribe(usuario => {
      this.idSupervisor = usuario.id;
      this.clienteSrv.obtenerClientesConUbicacion(this.idSupervisor).subscribe(clientes => {
        this.clientes = clientes;
      });
    });
  }

  verUbicacion(cliente: UbicacionDto): void {
    this.router.navigate(['/ver-ubicacion-cliente'], { state: { cliente } });
  }
}
