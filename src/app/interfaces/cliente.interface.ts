export interface CrearClienteDto {
  nombreCliente: string;
  nombreNegocio: string;
  latitud: string;
  longitud: string;
  idRol: number;
  idSupervisor: number;
  nit: string;
  telefono: string;
  correo: string;
  estado: boolean;
}

export interface Supervisor {
  idUsuario: number;
  usuario: string;
}

export interface UbicacionDto {
  nombreNegocio: string;
  nombreCliente: string;
  latitud: string;
  longitud: string;
  idCliente: string;
}
