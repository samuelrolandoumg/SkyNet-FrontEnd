// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { ProductosService } from '../services/productos.service';
// import { CommonModule } from '@angular/common';
// import { RouterModule, Router } from '@angular/router';
// import { FormsModule } from '@angular/forms';

// @Component({
//   selector: 'app-editar-producto',
//   templateUrl: './editar-producto.component.html',
//   styleUrls: ['./editar-producto.component.css'],
//   standalone: true, 
//   imports: [CommonModule, RouterModule, FormsModule],
// })
// export class EditarProductoComponent implements OnInit {idProducto!: number;
//   nombre = '';
//   descripcion = '';
//   precio = 0;
//   stock = 0;
//   categoria_id = 1;
//   imagenUrl = ''; // URL de la imagen actual
//   imagen!: File; // Nueva imagen seleccionada

//   constructor(
//     private productosService: ProductosService,
//     private route: ActivatedRoute,
//     private router: Router
//   ) {}

//   ngOnInit() {
//     this.route.queryParams.subscribe((params) => {
//       if (params['idProducto']) {
//         this.idProducto = Number(params['idProducto']); // Convierte el string a número
//         this.obtenerProducto();
//       } else {
//         console.error('❌ No se recibió el idProducto en queryParams');
//         this.router.navigate(['/listar-productos']);
//       }
//     });
//   }

//   obtenerProducto() {
//     this.productosService.obtenerProductoPorId(this.idProducto).subscribe(
//       (producto) => {
//         this.nombre = producto.nombre;
//         this.descripcion = producto.descripcion;
//         this.precio = producto.precio;
//         this.stock = producto.stock;
//         this.categoria_id = producto.categoria_id;
//         this.imagenUrl = producto.imagen_url;
//       },
//       (error) => {
//         console.error('❌ Error al obtener producto:', error);
//       }
//     );
//   }


//   seleccionarImagen(event: any) {
//     if (event.target.files && event.target.files.length > 0) {
//       this.imagen = event.target.files[0];
//       console.log('Imagen seleccionada:', this.imagen);
//     }
//   }

//   actualizarProducto() {
//     if (!this.idProducto) {
//       console.error('❌ Error: No hay un ID de producto válido');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('nombre', this.nombre);
//     formData.append('descripcion', this.descripcion);
//     formData.append('precio', this.precio.toString());
//     formData.append('stock', this.stock.toString());
//     formData.append('categoria_id', this.categoria_id.toString());
//     if (this.imagen) {
//       formData.append('imagen', this.imagen);
//     }

//     this.productosService.editarProducto(this.idProducto, formData).subscribe(
//       (response) => {
//         console.log('✅ Producto actualizado:', response);
//         this.router.navigate(['/listar-productos']); // Redirigir a la lista de productos
//       },
//       (error) => {
//         console.error('❌ Error al actualizar producto:', error);
//       }
//     );
//   }
// }

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductosService } from '../services/productos.service';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CategoriasService } from '../services/categorias.service';

@Component({
  selector: 'app-editar-producto',
  templateUrl: './editar-producto.component.html',
  styleUrls: ['./editar-producto.component.css'],
  standalone: true, 
  imports: [CommonModule, RouterModule, FormsModule],
})
export class EditarProductoComponent implements OnInit {
  idProducto!: number;
  nombre = '';
  descripcion = '';
  precio: number = 0;
  stock: number = 0;
  categoria_id: number = 1;
  imagenUrl = ''; // URL de la imagen actual
  nuevaImagen!: File;
  categorias: any[] = [];

  constructor(
    private productosService: ProductosService,
    private categoriasService: CategoriasService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Obtener el ID del producto desde los query params
    this.route.queryParams.subscribe((params) => {
      if (params['idProducto']) {
        this.idProducto = params['idProducto'];
        this.obtenerProducto();
      }
    });
    this.obtenerCategorias();
  }

  obtenerProducto() {
    this.productosService.obtenerProductoPorId(this.idProducto).subscribe(
      (producto) => {
        this.nombre = producto.nombre;
        this.descripcion = producto.descripcion;
        this.precio = producto.precio;
        this.stock = producto.stock;
        this.categoria_id = producto.categoria_id;
        this.imagenUrl = producto.imagen_url;
      },
      (error) => {
        console.error('❌ Error al obtener producto:', error);
      }
    );
  }

  obtenerCategorias() {
    this.categoriasService.obtenerCategorias().subscribe(
      (response) => {
        this.categorias = response.categorias;
      },
      (error) => {
        console.error('Error al obtener categorías:', error);
      }
    );
  }

  seleccionarImagen(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.nuevaImagen = event.target.files[0];
      console.log('Nueva imagen seleccionada:', this.nuevaImagen);
    }
  }

  actualizarProducto() {
    const formData = new FormData();
    formData.append('nombre', this.nombre);
    formData.append('descripcion', this.descripcion);
    formData.append('precio', this.precio.toString());
    formData.append('stock', this.stock.toString());
    formData.append('categoria_id', this.categoria_id.toString());

    if (this.nuevaImagen) {
      formData.append('file', this.nuevaImagen);
    }

    this.productosService.editarProducto(this.idProducto, formData).subscribe(
      (response) => {
        console.log('✅ Producto actualizado correctamente:', response);
        this.router.navigate(['/productos']); // Redirigir a la lista de productos tras la actualización
      },
      (error) => {
        console.error('❌ Error al actualizar producto:', error);
      }
    );
  }
}