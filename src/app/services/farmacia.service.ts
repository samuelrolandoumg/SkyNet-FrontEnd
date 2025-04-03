import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FarmaciaService {
  private apiUrl = 'http://localhost:3000/api/farmacias';

  constructor(private http: HttpClient) {}

  obtenerFarmacias(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  crearFarmacia(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }

  obtenerFarmaciaPorId(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/farmacias/${id}`);
  }
  
  actualizarFarmacia(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/farmacias/${id}`);
  }
}
