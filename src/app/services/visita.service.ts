import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CrearVisitaDto, VisitaDto } from '../interfaces/visita.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VisitaService {
  private visitaUrl = 'https://skynet-backend-production.up.railway.app/visita';

  constructor(private http: HttpClient) { }

  crearVisita(data: CrearVisitaDto): Observable<string> {
    return this.http.post(`${this.visitaUrl}/crear`, data, { responseType: 'text' });
  }

  obtenerVisitasPorTecnico(idTecnico: number): Observable<VisitaDto[]> {
    return this.http.get<VisitaDto[]>(`${this.visitaUrl}/visitas-tecnico?idTecnico=${idTecnico}`);
  }

}
