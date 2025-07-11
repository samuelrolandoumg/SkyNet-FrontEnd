import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResumenEstado, VisitaPorEstado } from '../interfaces/dashboard.interface';

@Injectable({ providedIn: 'root' })
export class DetalleVisitaService {
    private baseUrl = 'http://localhost:8080/DetalleVisita';

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


}
