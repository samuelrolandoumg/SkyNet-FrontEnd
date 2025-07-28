import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioService } from '../../services/usuario.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { trigger, style, transition, animate } from '@angular/animations';
import { Supervisor } from '../../interfaces/cliente.interface';
import { UsuarioListarProjection } from '../../interfaces/usuario.interface';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import html2pdf from 'html2pdf.js';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar-usuarios',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './listar-usuarios.component.html',
  styleUrls: ['./listar-usuarios.component.css'],
  animations: [
    trigger('expandirContraer', [
      transition(':enter', [
        style({ height: 0, opacity: 0 }),
        animate('300ms ease-out', style({ height: '*', opacity: 1 }))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ height: 0, opacity: 0 }))
      ])
    ])
  ]
})
export class ListarUsuariosComponent implements OnInit {
  supervisores: (Supervisor & { mostrar?: boolean, tecnicos?: UsuarioListarProjection[] })[] = [];
  usuario: any;
  esAdmin = false;
  @ViewChild('contenidoPDF', { static: false }) contenidoPDF!: ElementRef;

  constructor(
    private usuarioService: UsuarioService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.usuario = this.authService.obtenerUsuario();
    this.esAdmin = this.usuario?.rol === 'ADMIN';

    if (this.esAdmin) {
      this.usuarioService.obtenerSupervisores().subscribe({
        next: (res) => {
          this.supervisores = res.map(s => ({ ...s, mostrar: false, tecnicos: [] }));
        },
        error: (err) => console.error('Error cargando supervisores:', err)
      });
    } else if (this.usuario?.rol === 'SUPERVISOR') {
      const supervisor: Supervisor & {
        mostrar: boolean;
        tecnicos: UsuarioListarProjection[]
      } = {
        idUsuario: this.usuario.id,
        usuario: this.usuario.usuario,
        rol: this.usuario.rol,
        mostrar: true,
        tecnicos: []
      };


      this.usuarioService.listarTecnicosPorSupervisor(this.usuario.id).subscribe({
        next: (res) => {
          supervisor.tecnicos = res;
          this.supervisores = [supervisor];
        },
        error: (err) => console.error('Error cargando técnicos:', err)
      });
    }
  }

  toggleTecnicos(idSupervisor: number): void {
    const supervisor = this.supervisores.find(s => s.idUsuario === idSupervisor);
    if (!supervisor) return;

    supervisor.mostrar = !supervisor.mostrar;

    if (supervisor.mostrar && supervisor.tecnicos?.length === 0) {
      this.usuarioService.listarTecnicosPorSupervisor(idSupervisor).subscribe({
        next: (res) => supervisor.tecnicos = res,
        error: (err) => console.error('Error cargando técnicos:', err)
      });
    }
  }

  editarUsuario(id: number, event: MouseEvent): void {
    event.stopPropagation();
    this.router.navigate(['/editar-usuario'], { queryParams: { id } });
  }

  descargarPDF() {
    const element = this.contenidoPDF?.nativeElement;
    if (!element) {
      console.error('Elemento no definido');
      return;
    }

    const opt = {
      margin: 0.3,
      filename: 'reporte-usuarios.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(element).save();
  }

  eliminarUsuario(idUsuario: number, event: MouseEvent): void {
    event.stopPropagation();

    Swal.fire({
      title: '¿Está seguro que desea eliminar este usuario?',
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioService.eliminarUsuario(idUsuario).subscribe({
          next: (res) => {
            Swal.fire({
              icon: 'success',
              title: 'Eliminado',
              text: res.mensaje // ✅ en vez de text: res
            });
            this.ngOnInit();
          },
          error: (err) => {
            let mensaje = 'Error al eliminar el usuario';
            if (err.error && err.error.mensaje) {
              mensaje = err.error.mensaje;
            }
            Swal.fire({
              icon: 'error',
              title: 'No se puede al eliminar el usuario',
              text: mensaje
            });
          }
        });

      }
    });
  }

}
