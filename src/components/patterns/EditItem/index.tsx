import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, Typography } from '@mui/material';
import React, { FormEvent, MouseEvent, useState } from 'react';
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
  const [openModal, setOpenModal] = useState(false);
  const categoria = categories[type];

  async function excluir(evento: MouseEvent<HTMLButtonElement, Event>) {
    evento.preventDefault();
    if (id) {
      await service.excluir(type, id);
    }
    setOpenModal(false);
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
          {id && <Button color='error' onClick={() => setOpenModal(true)}>Excluir</Button>}
          {!viewOnly && <Button type='submit' variant='contained'>
            {type === 'deslocamentos'
              ? id ? 'Finalizar' : 'Iniciar'
              : 'Salvar'}
          </Button>}
        </div>
      </form>
      <Dialog open={openModal}>
        <DialogTitle>
          Excluir {categoria.singular}?
        </DialogTitle>
        <DialogContent>
          Esta ação não poderá ser desfeita.
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenModal(false)}>Cancelar</Button>
          <Button color='error' variant='contained' onClick={excluir}>Excluir</Button>
        </DialogActions>
      </Dialog>
    </StyledEdit>
  )
}
