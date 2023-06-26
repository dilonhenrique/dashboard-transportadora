import React from 'react';
import StyledSection from './styled';
import { Button, Link, Typography } from '@mui/material';
import categories from '@/assets/categories';
import Card from '@/components/elements/Card';
import { ICliente, ICondutor, IDeslocamento, IVeiculo } from '@/interfaces/interfaces';
import { useRouter } from 'next/router';
import { BsPlusCircle } from 'react-icons/bs';

interface ListProps {
  type?: 'clientes' | 'condutores' | 'veiculos' | 'deslocamentos';
  content: ICliente[] | ICondutor[] | IDeslocamento[] | IVeiculo[];
  max?: number;
}

export default function CardList({ type = 'clientes', content, max = content.length }: ListProps) {
  const router = useRouter();
  const path = `/${router.asPath.split('/')[1]}`

  const categoria = categories[type];
  if (categoria === undefined) return;

  return (
    <StyledSection>
      <div className='title'>
        <Typography component='h2' variant='h6'>
          <categoria.Icon size={20} style={{ marginRight: '.5rem' }} />
          {categoria.name}
        </Typography>
        {path !== categoria.url &&
          <Link href={categoria.url} variant='body2' sx={{ marginBottom: '7px' }}>ver todos</Link>
        }
      </div>
      <div className={path === categoria.url ? 'cards wrap' : 'cards'}>
        {content.map((item, index) => (
          index < max && <Card key={item.id} item={item} type={type} />
        ))}
      </div>
      {path === categoria.url &&
        <div style={{ marginTop: '2rem' }}>
          <Button href={`/${type}/adicionar`}><BsPlusCircle style={{marginRight:'.5rem'}} /> Novo {categoria.singular}</Button>
        </div>
      }
    </StyledSection>
  )
}
