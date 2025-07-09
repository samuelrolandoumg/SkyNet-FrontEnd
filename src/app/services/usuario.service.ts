import { Injectable } from '@angular/core';
import { Supervisor } from '../interfaces/cliente.interface';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UsuarioDto, UsuarioListarProjection } from '../interfaces/usuario.interface';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private usuarioUrl = 'https://skynet-backend-production.up.railway.app/usuario';

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
}
