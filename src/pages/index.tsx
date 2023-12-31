import Head from 'next/head';
import CardList from '@/components/patterns/CardList';
import { GetServerSideProps } from 'next';
import deslocamentoApi from '@/infra/http';
import { ICliente, ICondutor, IDeslocamento, IVeiculo } from '@/interfaces/interfaces';

export default function Home({ clientes, condutores, deslocamentos, veiculos }: IProps) {
  return (
    <>
      <Head>
        <title>Rocket | transportadora</title>
        <meta name="description" content="Um painel administrativo para transportadoras" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <CardList type='clientes' content={clientes} max={3} />
        <CardList type='condutores' content={condutores} max={3} />
        <CardList type='veiculos' content={veiculos} max={3} />
        <CardList type='deslocamentos' content={deslocamentos} max={3} />
      </main>
    </>
  )
}

interface IProps {
  clientes: ICliente[];
  condutores: ICondutor[];
  deslocamentos: IDeslocamento[];
  veiculos: IVeiculo[];
}

export const getServerSideProps: GetServerSideProps<IProps> = async (ctx) => {
  const clientes = await deslocamentoApi.get('Cliente');
  const condutores = await deslocamentoApi.get('Condutor');
  const veiculos = await deslocamentoApi.get('Veiculo');
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
      clientes: clientes.data || [],
      condutores: condutores.data || [],
      veiculos: veiculos.data || [],
      deslocamentos: deslocamentoCompleto || [],
    }
  }
}
