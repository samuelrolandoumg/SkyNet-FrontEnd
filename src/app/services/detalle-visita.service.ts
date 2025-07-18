import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResumenEstado, VisitaPorEstado } from '../interfaces/dashboard.interface';
import { ConsultaVisitaSupervisor } from '../interfaces/usuario.interface';
import { ReporteSupervisorProjection } from '../interfaces/visita.interface';

@Injectable({ providedIn: 'root' })
export class DetalleVisitaService {
    private baseUrl = 'https://skynet-backend-production.up.railway.app/DetalleVisita';
    //private baseUrl = 'http://localhost:8080/DetalleVisita';


    constructor(private http: HttpClient) { }

    crearDetalleVisita(
        idVisita: number,
        resultadoVisita: string,
        observaciones: string,
        comentarioAdicional: string,
        fotos: File[]
    ): Observable<string> {
        const formData = new FormData();
        fotos.forEach(foto => formData.append('fotos', foto));

        const params = new HttpParams()
            .set('idVisita', idVisita)
            .set('resultadoVisita', resultadoVisita)
            .set('observaciones', observaciones)
            .set('comentarioAdicional', comentarioAdicional);

        return this.http.post(`${this.baseUrl}/crear`, formData, {
            params,
            responseType: 'text' as const
        });
    }

    obtenerResumenEstados(idTecnico: number): Observable<ResumenEstado[]> {
        return this.http.get<ResumenEstado[]>(`${this.baseUrl}/resumen-estados?idTecnico=${idTecnico}`);
    }

    obtenerVisitasPorEstadoYTecnico(idTecnico: number, estado: string): Observable<VisitaPorEstado[]> {
        return this.http.get<VisitaPorEstado[]>(
            `${this.baseUrl}/visitas-estado-tecnico?idTecnico=${idTecnico}&estado=${estado}`
        );
    }

    obtenerVisitasPorSupervisor(idSupervisor: number) {
        return this.http.get<ConsultaVisitaSupervisor[]>(`${this.baseUrl}/consulta-visitas-supervisor?idSupervisor=${idSupervisor}`);
    }

    getReportesPorTecnico(idTecnico: number) {
        return this.http.get<any[]>(`${this.baseUrl}/documentos-generados-tecnico?idTecnico=${idTecnico}`);
    }

    obtenerReportesSupervisor(idSupervisor: number): Observable<ReporteSupervisorProjection[]> {
        return this.http.get<ReporteSupervisorProjection[]>(`${this.baseUrl}/reporte-generados-supervisor?idSupervisor=${idSupervisor}`);
    }
}
