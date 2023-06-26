export interface ICliente {
  id?: number;
  numeroDocumento: string;
  tipoDocumento: string;
  nome: string;
  logradouro?: string;
  numero?: string;
  bairro?: string;
  cidade?: string;
  uf?: string;
}

export interface ICondutor {
  id?: number,
  nome: string;
  numeroHabilitacao: string;
  catergoriaHabilitacao?: string;
  categoriaHabilitacao?: string;
  vencimentoHabilitacao: string;
}

export interface IVeiculo {
  id?: number,
  placa: string;
  marcaModelo: string;
  anoFabricacao: number;
  kmAtual: number;
}

export interface IDeslocamento {
  id?: number,
  kmInicial: number;
  kmFinal?: number;
  inicioDeslocamento: string;
  fimDeslocamento?: string;
  checkList: string;
  motivo: string;
  observacao: string;
  idCondutor: number;
  idVeiculo: number;
  idCliente: number;
  veiculo?: IVeiculo;
  cliente?: ICliente;
  condutor?: ICondutor;
}
