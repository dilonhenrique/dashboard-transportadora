import React from 'react';
import StyledCard from './styled';
import { ButtonBase, IconButton, Typography, useTheme } from '@mui/material';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { ICliente, ICondutor, IDeslocamento, IVeiculo } from '@/interfaces/interfaces';
import categories from '@/assets/categories';
import { Info, SimpleInfo } from '../Info';

interface ICardProps {
  item: ICliente | ICondutor | IDeslocamento | IVeiculo;
  type: 'clientes' | 'deslocamentos' | 'condutores' | 'veiculos';
}

export default function Card({ item, type }: ICardProps) {
  return (
    <StyledCard className='card'>
      <ButtonBase href={`/${type}/${item.id}`}>
        <div className='infosContainer'>
          {displayInfo[type](item)}
        </div>
        {/* <div className='actions'>
          <IconButton onMouseDown={(e) => e.stopPropagation()} onClick={(e) => e.stopPropagation()} size='small'>
            <BsThreeDotsVertical />
          </IconButton>
        </div> */}
      </ButtonBase>
    </StyledCard>
  )
}

const displayInfo = {
  clientes: (item: ICliente) => (<>
    <Info label='nome' info={item.nome} />
    <Info label={item.tipoDocumento} info={item.numeroDocumento} />
  </>),
  condutores: (item: ICondutor) => (<>
    <Info label='nome' info={item.nome} />
    <Info label='cnh' info={item.numeroHabilitacao} />
  </>),
  veiculos: (item: IVeiculo) => (<>
    <Info label='marca/modelo' info={item.marcaModelo} />
    <Info label='placa' info={item.placa} />
  </>),
  deslocamentos: (item: IDeslocamento) => {
    const theme = useTheme();
    return (
      <div className='infos'>
        <Typography className='label' color='black'><span style={{ color: item.fimDeslocamento ? theme.palette.error.light : theme.palette.success.light }}>&#9679;</span> {item.fimDeslocamento ? 'Finalizado' : 'Ativo'}</Typography>
        <SimpleInfo Icon={categories.veiculos.Icon}>{item.veiculo?.marcaModelo} ({item.veiculo?.anoFabricacao})</SimpleInfo>
        <SimpleInfo Icon={categories.condutores.Icon}>{item.condutor?.nome}</SimpleInfo>
        <SimpleInfo Icon={categories.clientes.Icon}>{item.cliente?.nome}</SimpleInfo>
      </div>
    )
  },
}
