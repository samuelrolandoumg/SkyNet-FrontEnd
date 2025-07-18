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
  rol: string;
}


export interface ClienteTecnico {
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

export interface ClienteConsultaDto {
  idCliente: number;
  nombreCliente: string;
  nombreNegocio: string;
  telefono: string;
  correo: string;
}

export interface ClienteDto extends ClienteConsultaDto {
  nit: string;
  latitud: string;
  longitud: string;
  estado: boolean;
  idRol: number;
  idSupervisor: number;
  nombreSupervisor: string;
}

export interface TecnicoDto {
  idTecnico: number;
  nombreTecnico: string;
}

export interface SupervisorDto {
  idUsuario: number;
  nombreSupervisor: string;
}

export interface ClienteUpdateDto {
  id: number;
  nombreCliente: string;
  nombreNegocio: string;
  latitud: string;
  longitud: string;
  nit: string;
  telefono: string;
  correo: string;
  estado: boolean;
  idRol: number;
  idSupervisor: number; 
}