import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CrearClienteDto, Supervisor, UbicacionDto } from '../interfaces/cliente.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private apiUrl = 'https://skynet-backend-production.up.railway.app/cliente';
  private usuarioUrl = 'https://skynet-backend-production.up.railway.app/usuario';

  constructor(private http: HttpClient) { }

  crearCliente(cliente: CrearClienteDto): Observable<any> {
    return this.http.post(`${this.apiUrl}/crear`, cliente);
  }

  obtenerClientesConUbicacion(idSupervisor: number): Observable<UbicacionDto[]> {
    return this.http.get<UbicacionDto[]>(`${this.apiUrl}/coordenadas?idSupervisor=${idSupervisor}`);
  }

  obtenerUbicacionClientePorId(idCliente: number): Observable<UbicacionDto> {
  return this.http.get<UbicacionDto>(`${this.apiUrl}/coordenadas-cliente?idCliente=${idCliente}`);
}

  obtenerUsuarioDesdeToken(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = {
      Authorization: `Bearer ${token}`
    };
    return this.http.get<any>('https://skynet-backend-production.up.railway.app/usuario/detector', { headers });
  }


  obtenerSupervisores(): Observable<Supervisor[]> {
    return this.http.get<Supervisor[]>(`${this.usuarioUrl}/usuarios-rol?rol=SUPERVISOR`);
  }
}
