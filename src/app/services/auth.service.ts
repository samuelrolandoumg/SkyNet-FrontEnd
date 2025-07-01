import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequest } from '../interfaces/login-request.interface';
import { Observable } from 'rxjs';
import { Usuario } from '../interfaces/usuario.interface';

const API_URL = 'https://skynet-backend-production.up.railway.app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  login(data: LoginRequest): Observable<any> {
    return this.http.post(`${API_URL}/usuario/login`, data, {
      responseType: 'json'
    });
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
  }

  guardarUsuario(usuario: Usuario) {
    localStorage.setItem('token', usuario.token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
  }

  obtenerUsuario(): Usuario | null {
    const usuarioStr = localStorage.getItem('usuario');
    return usuarioStr ? JSON.parse(usuarioStr) : null;
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}