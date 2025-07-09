import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ClienteDto, ClienteTecnico, ClienteUpdateDto, CrearClienteDto, Supervisor, TecnicoDto, UbicacionDto } from '../interfaces/cliente.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private apiUrl = 'https://skynet-backend-production.up.railway.app/cliente';
  private usuarioUrl = 'https://skynet-backend-production.up.railway.app/usuario';

  //private apiUrl = 'http://localhost:8080/cliente';
  //private usuarioUrl = 'http://localhost:8080/usuario';

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

  obtenerClientesPorTecnico(idTecnico: number): Observable<ClienteTecnico[]> {
    return this.http.get<ClienteTecnico[]>(`${this.apiUrl}/clientes-tecnico?idTecnico=${idTecnico}`);
  }
  obtenerTecnicosPorSupervisor(idSupervisor: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.usuarioUrl}/tecnicos-supervisor?idSupervisor=${idSupervisor}`);
  }

  listarClientes(): Observable<any[]> {
    const token = localStorage.getItem('token');
    const headers = {
      Authorization: `Bearer ${token}`
    };
    return this.http.get<any[]>(`${this.apiUrl}/listar`, { headers });
  }

  obtenerClientePorId(idCliente: number): Observable<ClienteDto> {
    return this.http.get<ClienteDto>(`${this.apiUrl}/obtener/${idCliente}`);
  }

  obtenerTecnicosPorRol(): Observable<TecnicoDto[]> {
    const token = localStorage.getItem('token');
    const headers = {
      Authorization: `Bearer ${token}`
    };
    return this.http.get<TecnicoDto[]>(`${this.apiUrl}/tecnicos-by-rol`, { headers });
  }

  actualizarCliente(cliente: ClienteUpdateDto): Observable<any> {
    return this.http.put(`${this.apiUrl}/actualizar`, cliente);
  }

}
