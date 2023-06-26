import { Button, Stack, Typography } from '@mui/material';
import React, { FormEvent, MouseEvent } from 'react';
import StyledEdit from './styled';
import { service } from '@/infra/services';
import categories from '@/assets/categories';

interface ModalProps {
  type: 'clientes' | 'condutores' | 'veiculos' | 'deslocamentos';
  id?: number;
  children?: React.ReactNode;
  submit?: (evento: FormEvent<HTMLFormElement>) => Promise<void>;
  viewOnly?: boolean;
}

export default function EditItem({ type = 'clientes', id, submit, children, viewOnly = false }: ModalProps) {

  const categoria = categories[type];

  async function excluir(evento: MouseEvent<HTMLButtonElement, Event>) {
    evento.preventDefault();
    if (id) {
      await service.excluir(type, id);
    }
  }

  return (
    <StyledEdit>
      <form onSubmit={submit}>
        <Typography variant='h5' component='h2' className='title'>
          {viewOnly
            ? 'Ver'
            : type === 'deslocamentos'
              ? id ? 'Finalizar' : 'Iniciar'
              : id ? 'Editar' : 'Adicionar'} {categoria.singular.toLowerCase()}
        </Typography>
        <Stack className='formContainer'>
          {children}
        </Stack>
        <div className='actions'>
          {id && <Button color='error' onClick={excluir}>Excluir</Button>}
          {!viewOnly && <Button type='submit' variant='contained'>
            {type === 'deslocamentos'
              ? id ? 'Finalizar' : 'Iniciar'
              : 'Salvar'}
          </Button>}
        </div>
      </form>
    </StyledEdit>
  )
}

const fieldsByType = {
  clientes: ['nome', 'numeroDocumento', 'tipoDocumento', 'logradouro', 'numero', 'bairro', 'cidade', 'uf'],
  condutores: ['nome', 'numeroHabilitacao', 'catergoriaHabilitacao', 'vencimentoHabilitacao'],
  veiculos: ['placa', 'marcaModelo', 'anoFabricacao', 'kmAtual'],
  deslocamentos: ['kmInicial', 'kmFinal', 'inicioDeslocamento', 'fimDeslocamento', 'checkList', 'motivo', 'observacao', 'idCondutor', 'idVeiculo', 'idCliente'],
}
