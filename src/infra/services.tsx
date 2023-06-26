import { ICliente, ICondutor, IDeslocamento, IVeiculo } from "@/interfaces/interfaces";
import deslocamentoApi from "./http";
import Router from "next/router";
import { enqueueSnackbar } from 'notistack';

type id = number | string | string[]

export const service = {
  ver: async (type = 'Cliente', id?: id) => {
    const resposta = await deslocamentoApi.get(`${type}/${id || ''}`);
    return resposta.data;
  },

  salvar: async (type = 'Cliente', item: ICliente | ICondutor | IVeiculo | IDeslocamento) => {
    type = getType(type);
    // item = convertFields(item);

    try {
      const resposta = await deslocamentoApi(`${type}/${item.id || ''}`, {
        method: item.id ? 'PUT' : 'POST',
        data: JSON.stringify({ ...item }),
      })
      if (typeof resposta.data === 'number') {
        goToId(resposta.data);
      }
      enqueueSnackbar(`${type} salvo com sucesso!`, { variant: 'success' });
    } catch (err) {
      console.log(err);
      //display erro
      enqueueSnackbar(`Ops! Erro ao salvar ${type.toLowerCase()}`, { variant: 'error' });
    }
  },

  deslocamento: async (deslocamento: IDeslocamento) => {
    const url = deslocamento.id ? `Deslocamento/${deslocamento.id}/EncerrarDeslocamento` : 'Deslocamento/IniciarDeslocamento';
    try {
      const resposta = await deslocamentoApi(url, {
        method: deslocamento.id ? 'PUT' : 'POST',
        data: JSON.stringify({ ...deslocamento }),
      })
      enqueueSnackbar(`Deslocamento ${deslocamento.id ? 'finalizado' : 'iniciado'} com sucesso!`, { variant: 'success' });
      reload();
    } catch (err) {
      console.log(err);
      enqueueSnackbar(`Ops! Erro ao atualizar deslocamento`, { variant: 'error' });
    }
  },

  excluir: async (type = 'Cliente', id: id) => {
    type = getType(type);

    try {
      const resposta = await deslocamentoApi.delete(`${type}/${id}`, {
        data: JSON.stringify({ id: Number(id) })
      })
      enqueueSnackbar(`${type} excluído com sucesso!`, { variant: 'success' });
      reload();
    } catch (err) {
      console.log(err);
      //display erro
      enqueueSnackbar(`Ops! Erro ao excluir ${type.toLowerCase()}`, { variant: 'error' });
    }
  },
}

function getType(string: string) {
  string = string[0].toUpperCase() + string.slice(1, string.length);
  switch (string) {
    case 'Clientes':
      string = 'Cliente';
      break;
    case 'Condutores':
      string = 'Condutor';
      break;
    case 'Veiculos' || 'Veículo' || 'Veículos':
      string = 'Veiculo';
      break;
    case 'Deslocamentos':
      string = 'Deslocamento';
      break;
  }
  return string;
}

function reload() {
  const arr = Router.asPath.split('/');
  const novaRota = `/${arr[1]}`;
  Router.push(novaRota);
}

function goToId(id: number) {
  const arr = Router.asPath.split('/');
  const novaRota = `/${arr[1]}/${id}`;

  Router.push(novaRota)
}