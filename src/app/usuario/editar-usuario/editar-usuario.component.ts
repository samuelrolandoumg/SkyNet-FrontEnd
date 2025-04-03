import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { FarmaciaService } from '../../services/farmacia.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
})
export class EditarUsuarioComponent implements OnInit {
  idUsuario!: number;
  nombre: string = '';
  email: string = '';
  telefono: string = '';
  rol: string = '';
  nombreFarmacia: string = '';
  idFarmacia!: number;
  estado: boolean = true;
  mensaje: string = '';
  tipoMensaje: string = '';
  rolesDisponibles = ['operador', 'vendedor', 'admin', 'ccagent', 'supervisor'];
  farmacias: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private usuarioService: UsuarioService,
    private farmaciaService: FarmaciaService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      if (params['idUsuario']) {
        this.idUsuario = +params['idUsuario'];
        this.obtenerUsuario();
      }
    });
    this.obtenerFarmacias();
  }

  // obtenerUsuario() {
  //   this.usuarioService.obtenerUsuarioPorId(this.idUsuario).subscribe({
  //     next: (res) => {
  //       const usuario = res.usuario;
  //       this.nombre = usuario.nombre;
  //       this.email = usuario.email;
  //       this.telefono = usuario.telefono;
  //       this.rol = usuario.rol;
  //       this.idFarmacia = this.farmacias.find(f => f.nombre === usuario.nombreFarmacia)?.idFarmacia || 0;
  //       this.estado = usuario.estado;
  //     },
  //     error: (err) => {
  //       this.mensaje = 'Error al obtener el usuario.';
  //       this.tipoMensaje = 'error';
  //       console.error(err);
  //     },
  //   });
  // }

  obtenerUsuario() {
    this.usuarioService.obtenerUsuarioPorId(this.idUsuario).subscribe({
      next: (res) => {
        const usuario = res.usuario;
        this.nombre = usuario.nombre;
        this.email = usuario.email;
        this.telefono = usuario.telefono;
        this.rol = usuario.rol;
        this.estado = usuario.estado;
  
        // Guardamos nombre de farmacia solo por si se necesita mostrarlo
        const nombreFarmaciaUsuario = usuario.nombreFarmacia;
  
        // Esperamos a que las farmacias estén disponibles
        const intentarAsignarFarmacia = () => {
          if (this.farmacias.length > 0) {
            const farmaciaEncontrada = this.farmacias.find(f => f.nombre === nombreFarmaciaUsuario);
            this.idFarmacia = farmaciaEncontrada ? farmaciaEncontrada.idFarmacia : null;
          } else {
            setTimeout(intentarAsignarFarmacia, 100); // Reintenta si aún no se han cargado
          }
        };
  
        intentarAsignarFarmacia();
      },
      error: (err) => {
        this.mensaje = 'Error al obtener el usuario.';
        this.tipoMensaje = 'error';
        console.error(err);
      },
    });
  }
  

  obtenerFarmacias() {
    this.farmaciaService.obtenerFarmacias().subscribe({
      next: (res) => {
        this.farmacias = res.farmacias;
      },
      error: (err) => {
        console.error('Error al obtener farmacias:', err);
      },
    });
  }

  actualizarUsuario() {
    const datosActualizados = {
      nombre: this.nombre,
      email: this.email,
      telefono: this.telefono,
      rol: this.rol,
      idFarmacia: this.idFarmacia,
      estado: this.estado,
    };

    this.usuarioService.actualizarUsuario(this.idUsuario, datosActualizados).subscribe({
      next: () => {
        this.router.navigate(['/usuarios']);
      },
      error: (err) => {
        this.mensaje = 'Error al actualizar el usuario.';
        this.tipoMensaje = 'error';
        console.error(err);
      },
    });
  }
}
