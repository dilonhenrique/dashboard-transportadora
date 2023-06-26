import Head from 'next/head';
import { GetServerSideProps } from 'next';
import deslocamentoApi from '@/infra/http';
import { IVeiculo } from '@/interfaces/interfaces';
import EditItem from '@/components/patterns/EditItem';
import { Stack, TextField } from '@mui/material';
import { service } from '@/infra/services';

export default function Home({ veiculoSelecionado }: IProps) {

  async function submit(evento: React.FormEvent<HTMLFormElement>) {
    evento.preventDefault();

    const data = {
      id: veiculoSelecionado?.id,
      placa: evento.target.placa.value,
      marcaModelo: evento.target.marcaModelo.value,
      anoFabricacao: Number(evento.target.anoFabricacao.value),
      kmAtual: Number(evento.target.kmAtual.value),
    }
    const response = await service.salvar('Veiculo', data);
  }

  return (
    <>
      <Head>
        <title>Veículos | Rocket transportadora</title>
        <meta name="description" content="Um painel administrativo para transportadoras" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <EditItem type='veiculos' id={veiculoSelecionado?.id} submit={submit}>
          <Stack direction='row' columnGap={2}>
            <TextField name='marcaModelo' label='Marca/modelo' defaultValue={veiculoSelecionado?.marcaModelo} sx={{ flexBasis: '60%' }} required />
            <TextField name='anoFabricacao' label='Ano fabricação' defaultValue={veiculoSelecionado?.anoFabricacao} sx={{ flexBasis: '40%' }} type='number' required />
          </Stack>
          <Stack direction='row' columnGap={2}>
            <TextField name='placa' label='Placa' defaultValue={veiculoSelecionado?.placa} sx={{ flexBasis: '70%' }} disabled={veiculoSelecionado?.id !== undefined} required />
            <TextField name='kmAtual' label='Km atual' defaultValue={veiculoSelecionado?.kmAtual} sx={{ flexBasis: '30%' }} type='number' required />
          </Stack>
        </EditItem>
      </main>
    </>
  )
}

interface IProps {
  veiculoSelecionado?: IVeiculo;
}

export const getServerSideProps: GetServerSideProps<IProps> = async (ctx) => {
  const id = ctx.params?.id;
  // if(id && id[0] === 'adicionar') return { props: {} }

  try {
    const veiculoSelecionado = await deslocamentoApi.get(`Veiculo/${id}`);

    return {
      props: {
        veiculoSelecionado: veiculoSelecionado.data,
      }
    }
  } catch (err) {
    if(id === 'adicionar') return { props: {} }

    return {
      notFound: true
    }
  }
}
