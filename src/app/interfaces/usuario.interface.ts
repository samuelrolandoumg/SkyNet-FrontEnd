export interface Usuario {
  id: number;
  nombre: string;
  rol: string;
  token: string;
}

export interface UsuarioDto {
  id: number;
  nombre: string;
  apellido: string;
  correo: string;
  usuario: string;
  contraseña: string;
  idRol: number;
  idSupervisor?: number;
  estado: boolean;
  fechaCreacion: string;
  dpi: string;
  nit: string;
  direccion: string;
  rol: string;
  puestoTecnico: string | null;
}

export interface UsuarioUpdateDto {
  id: number;
  nombre: string;
  apellido: string;
  correo: string;
  usuario: string;
  idRol: number;
  idSupervisor?: number;
  estado: boolean;
  dpi: string;
  nit: string;
  direccion: string;
  rol: string;
  puestoTecnico: string | null;
}

export interface UsuarioListarProjection {
  idUsuario: number;
  nombreTecnico: string;
  rol: string;
}

///detalles
export interface ConsultaVisitaSupervisor {
  idCliente: number;
  nombreCliente: string;
  nombreTecnico: string;
  idVisita: number;
  idTecnico: number;
  fechaVisita: string;
  estado: string;
  enTiempo: string;
  tiempoRetraso: string | null;
  leido: boolean | null;
}
