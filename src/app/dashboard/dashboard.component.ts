import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  usuario: any = { nombre: '', rol: '' };

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const token = params['token'] || localStorage.getItem('authToken');
      const nombre = params['nombre'] || localStorage.getItem('nombreUsuario');
      const rol = params['rol'] || localStorage.getItem('rolUsuario');
  
      if (!token) {
        console.error("No hay token. Redirigiendo al login...");
        this.router.navigate(['/login']);
        return;
      }

      if (token && nombre && rol) {
        localStorage.setItem('authToken', token);
        localStorage.setItem('nombreUsuario', nombre);
        localStorage.setItem('rolUsuario', rol);
  
        this.usuario.nombre = nombre;
        this.usuario.rol = rol;

      } else {
        this.router.navigate(['/error']);
      }
    });
  }

  logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('nombreUsuario');
    localStorage.removeItem('rolUsuario');

    this.router.navigate(['/login']).then(() => {
      window.location.reload();
    });
  }

  redirigirproductos() {
    this.router.navigate(['/productos']);
  }

  redirigircrearproductos() {
    this.router.navigate(['/crear-productos']);
  }

  redirigircategorias() {
    this.router.navigate(['/categorias']);
  }
  redirigircrearcategorias() {
    this.router.navigate(['/crear-categoria']);
  }

  redirigirusuarios() {
    this.router.navigate(['/usuarios']);
  }
  redirigircrearusuario() {
    this.router.navigate(['/crear-usuario']);
  }

  redirigircrearfarmacia() {
    this.router.navigate(['/crear-farmacia']);
  }

  redirigirproveedores() {
    this.router.navigate(['/proveedores']);
  }

  redirigircrearproveedor() {
    this.router.navigate(['/crear-proveedor']);
  }

  redirigirInventario() {
    this.router.navigate(['/inventario-general']);
  }

  redirigiragregarIventario() {
    this.router.navigate(['/agregar-inventario']);
  }
  
}

