import Head from 'next/head';
import CardList from '@/components/patterns/CardList';
import { GetServerSideProps } from 'next';
import deslocamentoApi from '@/infra/http';
import { IDeslocamento } from '@/interfaces/interfaces';

export default function Home({ deslocamentos }: IProps) {

  return (
    <>
      <Head>
        <title>Deslocamentos | Rocket transportadora</title>
        <meta name="description" content="Um painel administrativo para transportadoras" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <CardList type='deslocamentos' content={deslocamentos} />
      </main>
    </>
  )
}

interface IProps {
  deslocamentos: IDeslocamento[];
}

export const getServerSideProps: GetServerSideProps<IProps> = async (ctx) => {
  const deslocamentos = await deslocamentoApi.get('Deslocamento');

  const deslocamentoCompleto = await Promise.all(
    deslocamentos.data.map(async (deslocamento: IDeslocamento) => {
      try {
        const cliente = await deslocamentoApi.get(`Cliente/${deslocamento.idCliente}`);
        const condutor = await deslocamentoApi.get(`Condutor/${deslocamento.idCondutor}`);
        const veiculo = await deslocamentoApi.get(`Veiculo/${deslocamento.idVeiculo}`);

        return {
          ...deslocamento,
          cliente: cliente.data,
          condutor: condutor.data,
          veiculo: veiculo.data,
        }
      } catch (err) {
        console.log(err)
      }
    })
  )

  return {
    props: {
      deslocamentos: deslocamentoCompleto || [],
    }
  }
}
