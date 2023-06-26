import Head from 'next/head';
import CardList from '@/components/patterns/CardList';
import { GetServerSideProps } from 'next';
import deslocamentoApi from '@/infra/http';
import { ICondutor } from '@/interfaces/interfaces';

export default function Home({ condutores }: IProps) {

  return (
    <>
      <Head>
      <title>Condutores | Rocket transportadora</title>
        <meta name="description" content="Um painel administrativo para transportadoras" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <CardList type='condutores' content={condutores} />
      </main>
    </>
  )
}

interface IProps {
  condutores: ICondutor[];
}

export const getServerSideProps: GetServerSideProps<IProps> = async (ctx) => {
  const condutores = await deslocamentoApi.get('Condutor');

  return {
    props: {
      condutores: condutores.data || [],
    }
  }
}
