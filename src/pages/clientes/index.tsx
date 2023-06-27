import Head from 'next/head';
import CardList from '@/components/patterns/CardList';
import { GetServerSideProps } from 'next';
import { ICliente } from '@/interfaces/interfaces';
import { service } from '@/infra/services';

export default function Home({ clientes }: IProps) {

  return (
    <>
      <Head>
        <title>Clientes | Rocket transportadora</title>
        <meta name="description" content="Um painel administrativo para transportadoras" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <CardList type='clientes' content={clientes} />
      </main>
    </>
  )
}

interface IProps {
  clientes: ICliente[];
}

export const getServerSideProps: GetServerSideProps<IProps> = async (ctx) => {
  const clientes = await service.ver('Cliente');

  return {
    props: {
      clientes: clientes || [],
    }
  }
}
