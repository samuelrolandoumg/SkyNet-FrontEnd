import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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

}
