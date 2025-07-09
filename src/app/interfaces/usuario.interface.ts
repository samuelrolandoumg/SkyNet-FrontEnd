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
}

export interface UsuarioListarProjection {
  idUsuario: number;
  nombreTecnico: string;
  rol: string;
}