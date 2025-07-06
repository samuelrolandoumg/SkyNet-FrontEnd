export interface CrearVisitaDto {
  idTecnico: number;
  idCliente: number;
  idSupervisor: number;
}

export interface VisitaDto {
  fechaVisita: string;
  nombreNegocio: string;
  latitud: string;
  longitud: string;
  nombreCliente: string;
  idCliente: number;
  idVisita:number;
  estado: string;
}

export interface IniciarServicioDto {
  idVisita: number;
  latitud: string;
  longitud: string;
  estado: string;
}