import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductosService {
  private apiUrl = 'http://localhost:3000/api/productos'; // URL base del backend

  constructor(private http: HttpClient) {}

  // 🔹 Obtener la lista de productos activos (estado = true)
  obtenerProductos(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }

  // 🔹 Obtener un producto por ID
  obtenerProductoPorId(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }
  // 🔹 Crear un nuevo producto con imagen
  crearProducto(formData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}`, formData);
  }

  // 🔹 Editar un producto por ID
  editarProducto(id: number, formData: FormData): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, formData);
  }
  
  // 🔹 Eliminar un producto (cambiar estado a false)
  eliminarProducto(id: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/eliminar/${id}`, {}); // Enviar un body vacío
  }
}
