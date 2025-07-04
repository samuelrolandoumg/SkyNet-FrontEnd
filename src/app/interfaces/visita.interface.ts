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
}