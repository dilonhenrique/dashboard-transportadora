import Head from 'next/head';
import { GetServerSideProps } from 'next';
import deslocamentoApi from '@/infra/http';
import { ICondutor } from '@/interfaces/interfaces';
import EditItem from '@/components/patterns/EditItem';
import { Autocomplete, Stack, TextField } from '@mui/material';
import DateField from '@/components/elements/DateField';
import { service } from '@/infra/services';
import dayjs from 'dayjs';

export default function Home({ condutorSelecionado }: IProps) {

  async function submit(evento: React.FormEvent<HTMLFormElement>) {
    evento.preventDefault();

    const data = {
      id: condutorSelecionado?.id,
      nome: evento.target.nome.value,
      numeroHabilitacao: evento.target.numeroHabilitacao.value,
      categoriaHabilitacao: evento.target.catergoriaHabilitacao.value,
      vencimentoHabilitacao: dayjs(evento.target.vencimentoHabilitacao.value,'DD-MM-YYYY').toISOString(),
    } as ICondutor;
    const response = await service.salvar('Condutor', data);
  }

  return (
    <>
      <Head>
        <title>Condutores | Rocket transportadora</title>
        <meta name="description" content="Um painel administrativo para transportadoras" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <EditItem type='condutores' id={condutorSelecionado?.id} submit={submit}>
          <TextField
            name='nome'
            label='Nome'
            defaultValue={condutorSelecionado?.nome}
            disabled={condutorSelecionado?.id !== undefined}
            required
          />
          <Stack direction='row' columnGap={2}>
            <TextField
              name='numeroHabilitacao'
              label='Número habilitação'
              defaultValue={condutorSelecionado?.numeroHabilitacao}
              disabled={condutorSelecionado?.id !== undefined}
              sx={{ flexBasis: '70%' }}
              required
            />
            <Autocomplete
              freeSolo
              options={categoriasCnh}
              sx={{ flexBasis: '30%' }}
              defaultValue={condutorSelecionado?.catergoriaHabilitacao}
              renderInput={(params) => <TextField {...params} name='catergoriaHabilitacao' label='Categoria' required />}
            />
          </Stack>
          <DateField name='vencimentoHabilitacao' label='Vencimento habilitação' defaultValue={condutorSelecionado?.vencimentoHabilitacao} />
        </EditItem>
      </main>
    </>
  )
}

const categoriasCnh = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'AB',
  'AC',
  'AD',
  'AE',
  'ACC'
]

interface IProps {
  condutorSelecionado?: ICondutor;
}

export const getServerSideProps: GetServerSideProps<IProps> = async (ctx) => {
  const id = ctx.params?.id;
  // if(id && id[0] === 'adicionar') return { props: {} }

  try {
    const condutorSelecionado = await deslocamentoApi.get(`Condutor/${id}`);

    return {
      props: {
        condutorSelecionado: condutorSelecionado.data,
      }
    }
  } catch (err) {
    if(id === 'adicionar') return { props: {} }

    return {
      notFound: true
    }
  }
}
