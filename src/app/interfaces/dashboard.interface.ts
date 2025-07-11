export interface ResumenEstado {
  estado: string;
  cantidad: number;
}

export interface VisitaPorEstado {
  idVisita: number;
  estado: string;
  nombreCliente: string;
  fechaVisita: string; 
  enTiempo: string;
}
