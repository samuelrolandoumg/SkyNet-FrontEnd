import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../services/productos.service';
import { CommonModule } from '@angular/common';

import { RouterModule, Router, ActivatedRoute} from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-listar-cc',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './listar-cc.component.html',
  styleUrl: './listar-cc.component.css'
})
export class ListarCCComponent implements OnInit {
  productos: any[] = [];
  productosFiltrados: any[] = [];
  filtro: string = '';
  usuario: any = { nombre: '', rol: '' };

  constructor(private productosService: ProductosService, private router: Router, private route: ActivatedRoute) {}


  ngOnInit() {
    this.obtenerProductos();

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
  obtenerProductos() {
    this.productosService.obtenerProductos().subscribe(
      (response: any) => {
        this.productos = response.productos;
        this.productosFiltrados = response.productos; 
      },
      (error) => {
        console.error('🔥 Error al obtener productos:', error);
      }
    );
  }

  filtrarProductos() {
    const filtroLower = this.filtro.toLowerCase();
    this.productosFiltrados = this.productos.filter(producto =>
      producto.nombre.toLowerCase().includes(filtroLower)
    );
  }


  logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('nombreUsuario');
    localStorage.removeItem('rolUsuario');

    this.router.navigate(['/login']).then(() => {
      window.location.reload();
    });
  }
}