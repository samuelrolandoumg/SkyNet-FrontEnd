import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-listar-usuario',
  templateUrl: './listar-usuario.component.html',
  styleUrls: ['./listar-usuario.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
})
export class ListarUsuarioComponent implements OnInit {
  usuarios: any[] = [];
  busqueda: string = '';

  constructor(private usuariosService: UsuarioService, private router: Router) {}

  ngOnInit(): void {
    this.obtenerUsuarios();
  }

  obtenerUsuarios() {
    this.usuariosService.obtenerUsuarios().subscribe({
      next: (res) => {
        this.usuarios = res.usuarios;
      },
      error: (err) => {
        console.error('Error al obtener usuarios:', err);
      }
    });
  }

  usuariosFiltrados() {
    const filtro = this.busqueda.toLowerCase();
    return this.usuarios.filter(u =>
      u.nombre.toLowerCase().includes(filtro) ||
      u.email.toLowerCase().includes(filtro) ||
      String(u.id_usuario).includes(filtro)
    );
  }
  irCrearUsuario() {
    this.router.navigate(['/crear-usuario']);
  }
  editarUsuario(id: number) {
    this.router.navigate(['/editar-usuario'], { queryParams: { idUsuario: id } });
  }
  
  
  
}

