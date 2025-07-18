import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CrearVisitaDto, IniciarServicioDto, VisitaDto } from '../interfaces/visita.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VisitaService {
  private visitaUrl = 'https://skynet-backend-production.up.railway.app/visita';
  //private visitaUrl = 'http://localhost:8080/visita';

  constructor(private http: HttpClient) { }


  crearVisita(data: CrearVisitaDto): Observable<string> {
    return this.http.post(`${this.visitaUrl}/crear`, data, { responseType: 'text' });
  }

  obtenerVisitasPorTecnico(idTecnico: number): Observable<VisitaDto[]> {
    return this.http.get<VisitaDto[]>(`${this.visitaUrl}/visitas-tecnico?idTecnico=${idTecnico}`);
  }

  iniciarServicio(data: IniciarServicioDto): Observable<void> {
    return this.http.post<void>(`${this.visitaUrl}/iniciar-servicio`, data, {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  consultarEstadoVisita(idVisita: number) {
    return this.http.get(`${this.visitaUrl}/estado?idVisita=${idVisita}`, {});
  }

  finalizarServicio(data: IniciarServicioDto): Observable<void> {
    return this.http.post<void>(`${this.visitaUrl}/finalizar-servicio`, data);
  }

  getVisitasPorTecnico(idSupervisor: number) {
    return this.http.get<any[]>(`${this.visitaUrl}/count-visitas-tecnico?idSupervisor=${idSupervisor}`);
  }

  getVisitasPorSupervisor(idAdmin: number): Observable<{ nombreSupervisor: string; cantidad: number }[]> {
    return this.http.get<{ nombreSupervisor: string; cantidad: number }[]>(
      `${this.visitaUrl}/count-visitas-supervisor?idAdmin=${idAdmin}`
    );
  }

  getVisitasPorEstadoTecnico(idTecnico: number): Observable<{ estado: string; cantidad: number }[]> {
    return this.http.get<{ estado: string; cantidad: number }[]>(
      `${this.visitaUrl}/visitas-tecnico-estado?idTecnico=${idTecnico}`
    );
  }

  getTecnicosPorTipoVisita(tipoVisita: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.visitaUrl}/tecnico-tipovisita`, {
      params: { tipoVisita }
    });
  }
  
}
