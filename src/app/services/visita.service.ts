import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CrearVisitaDto, IniciarServicioDto, SupervisorVisitaResumen, TecnicoVisitaResumen, VisitaDto, VisitaPorClienteProjection } from '../interfaces/visita.interface';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VisitaService {

  private visitaUrl = `${environment.apiUrl}/visita`;

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

  getTecnicosPorTipoVisita(tipoVisita: string, idUsuario: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.visitaUrl}/tecnico-tipovisita`, {
      params: { tipoVisita, idUsuario }
    });
  }

  getResumenSupervisores(idAdmin: number) {
    return this.http.get<SupervisorVisitaResumen[]>(`${this.visitaUrl}/resumen-supervisores?idAdmin=${idAdmin}`);
  }

  getResumenTecnicos(idSupervisor: number) {
    return this.http.get<TecnicoVisitaResumen[]>(`${this.visitaUrl}/resumen-tecnicos?idSupervisor=${idSupervisor}`);
  }

  cancelarVisita(data: { idVisita: number, motivoCancelacion: string, usuarioCancelo: number }) {
    return this.http.put(`${this.visitaUrl}/cancelar`, data);
  }

  posponerVisita(data: { idVisita: number, nuevaFecha: string, motivoPosposicion: string }) {
    return this.http.put(`${this.visitaUrl}/posponer`, data);
  }

  getVisitasTecnico(idTecnico: number) {
    return this.http.get<VisitaPorClienteProjection[]>(`${this.visitaUrl}/listar-visitas-tecnico?idTecnico=${idTecnico}`);
  }
}
