import Head from 'next/head';
import CardList from '@/components/patterns/CardList';
import { GetServerSideProps } from 'next';
import deslocamentoApi from '@/infra/http';
import { IVeiculo } from '@/interfaces/interfaces';

export default function Home({ veiculos }: IProps) {

  return (
    <>
      <Head>
        <title>Veículos | Rocket transportadora</title>
        <meta name="description" content="Um painel administrativo para transportadoras" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <CardList type='veiculos' content={veiculos} />
      </main>
    </>
  )
}

interface IProps {
  veiculos: IVeiculo[];
}

export const getServerSideProps: GetServerSideProps<IProps> = async (ctx) => {
  const veiculos = await deslocamentoApi.get('Veiculo');

  return {
    props: {
      veiculos: veiculos.data || [],
    }
  }
}
