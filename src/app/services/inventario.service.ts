import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class InventarioService {
  private apiUrl = 'http://localhost:3000/api/inventario-general';

  constructor(private http: HttpClient) {}

  crearInventario(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  obtenerInventarioGeneral() {
    return this.http.get<any>(`${this.apiUrl}`);
  }
  
  obtenerHistorialPorProducto(idProducto: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/historial/${idProducto}`);
  }
  
}
