import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AlertasService {

  private baseUrl = `${environment.apiUrl}/Alertas`;

  constructor(private http: HttpClient) { }

  alertarRetrasoTecnico(idVisita: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/alertar-retraso-tecnico?idVisita=${idVisita}`, {});
  }

  getAlertasTecnico(idTecnico: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/alertas-tecnico?idTecnico=${idTecnico}`);
  }
}
