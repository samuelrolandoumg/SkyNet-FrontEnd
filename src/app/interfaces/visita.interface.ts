export interface CrearVisitaDto {
  idTecnico: number;
  idCliente: number;
  tipoVisita: string;
  fechaVisita: string;
  usuarioCreo: number;
}

export interface VisitaDto {
  fechaVisita: string;
  nombreNegocio: string;
  latitud: string;
  longitud: string;
  nombreCliente: string;
  idCliente: number;
  idVisita: number;
  estado: string;
  tipoVisita: string;
}

export interface IniciarServicioDto {
  idVisita: number;
  latitud: string;
  longitud: string;
  estado: string;
}

export interface ReporteSupervisorProjection {
  nombreDocumento: string;
  urlDocumento: string;
  resultadoObtenido: string;
  fechaProgramada: string;
  fechaServicioFinalizada: string;
  nombreCliente: string;
  nombreTecnico: string;
  visitaProximaIncidencia: string;
}

export interface SupervisorVisitaResumen {
  idSupervisor: number;
  nombreSupervisor: string;
  totalVisitas: number;
  creadas: number;
  iniciadas: number;
  finalizadas: number;
  canceladas: number;
}

export interface TecnicoVisitaResumen {
  nombreSupervisor: string;
  idTecnico: number;
  nombreTecnico: string;
  totalVisitas: number;
  creadas: number;
  iniciadas: number;
  finalizadasExito: number;
  finalizadasIncidencia: number;
  cancelada: number;
}

export interface VisitaPorClienteProjection {
  idCliente: number;
  nombreCliente: string;
  nombreNegocio: string;
  idVisita: number;
  fechaVisita: string;
  estadoVisita: string;
  tipoVisita: string;
  fechaFinalizada: string;
}
