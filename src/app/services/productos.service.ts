import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductosService {
  private apiUrl = 'http://localhost:3000/api/productos'; 

  constructor(private http: HttpClient) {}

  obtenerProductos(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }

  obtenerProductoPorId(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }
  crearProducto(formData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}`, formData);
  }

  editarProducto(id: number, formData: FormData): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, formData);
  }
  
  eliminarProducto(id: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/eliminar/${id}`, {}); 
  }
}
