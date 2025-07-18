import { Injectable } from '@angular/core';
import { Supervisor } from '../interfaces/cliente.interface';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UsuarioDto, UsuarioListarProjection, UsuarioUpdateDto } from '../interfaces/usuario.interface';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private usuarioUrl = 'https://skynet-backend-production.up.railway.app/usuario';
  //private usuarioUrl = 'http://localhost:8080/usuario';

  
  constructor(private http: HttpClient) { }

  crearUsuario(usuario: UsuarioDto): Observable<any> {
    return this.http.post(`${this.usuarioUrl}/crear`, usuario);
  }

  obtenerSupervisores(): Observable<Supervisor[]> {
    return this.http.get<Supervisor[]>(`${this.usuarioUrl}/usuarios-rol?rol=SUPERVISOR`);
  }

  listarTecnicosPorSupervisor(idSupervisor: number): Observable<UsuarioListarProjection[]> {
    return this.http.get<UsuarioListarProjection[]>(
      `${this.usuarioUrl}/tecnicos-por-supervisor?idSupervisor=${idSupervisor}`
    );
  }

  obtenerUsuarioPorId(id: number): Observable<UsuarioDto> {
    return this.http.get<UsuarioDto>(`${this.usuarioUrl}/obtener/${id}`);
  }

  actualizarUsuario(usuario: UsuarioUpdateDto): Observable<any> {
    return this.http.put(`${this.usuarioUrl}/actualizar`, usuario);
  }

  // usuario.service.ts
  obtenerSupervisorPorId(id: number): Observable<{ idUsuario: number; usuario: string }> {
    return this.http.get<{ idUsuario: number; usuario: string }>(`${this.usuarioUrl}/obtener-usuario/${id}`);
  }

  getAdmins(): Observable<Supervisor[]> {
    return this.http.get<Supervisor[]>(`${this.usuarioUrl}/lista-admin`);
  }


}
