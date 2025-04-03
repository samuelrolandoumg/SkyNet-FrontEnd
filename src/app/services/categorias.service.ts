import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoriasService {
  private apiUrl = 'http://localhost:3000/api/categorias';

  constructor(private http: HttpClient) { }

  obtenerCategorias(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }

  agregarCategoria(categoria: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, categoria);
  }

  // Editar una categoría por ID
  editarCategoria(id: number, datos: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, datos);
  }

  // Obtener UNA categoría por ID
  obtenerCategoriaPorId(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }
}
