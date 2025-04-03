import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {
  private apiUrl = 'http://localhost:3000/api/proveedores';

  constructor(private http: HttpClient) {}

  // Obtener todos los proveedores activos
  obtenerProveedores(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  // Crear nuevo proveedor
  crearProveedor(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }

  // Obtener proveedor por ID
  obtenerProveedorPorId(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // Editar proveedor
  actualizarProveedor(id: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, data);
  }

  // Inhabilitar proveedor
  eliminarProveedor(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
