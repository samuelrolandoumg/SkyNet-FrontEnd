import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CrearClienteDto } from '../interfaces/cliente.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private apiUrl = 'https://skynet-backend-production.up.railway.app/cliente';

  constructor(private http: HttpClient) { }

  crearCliente(cliente: CrearClienteDto): Observable<any> {
    return this.http.post(`${this.apiUrl}/crear`, cliente);
  }

  obtenerClienteConUbicacion(): Observable<CrearClienteDto> {
    return this.http.get<CrearClienteDto>(`${this.apiUrl}/coordenadas`);
  }
}
