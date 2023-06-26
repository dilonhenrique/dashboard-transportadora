import Head from 'next/head';
import { GetServerSideProps } from 'next';
import deslocamentoApi from '@/infra/http';
import { ICliente } from '@/interfaces/interfaces';
import EditItem from '@/components/patterns/EditItem';
import { clienteService, service } from '@/infra/services';
import { Autocomplete, Stack, TextField } from '@mui/material';

export default function Home({ clienteSelecionado }: IProps) {
  
  async function submit(evento: React.FormEvent<HTMLFormElement>) {
    evento.preventDefault();

    const data = {
      id: clienteSelecionado?.id,
      numeroDocumento: evento.target.numeroDocumento.value,
      tipoDocumento: evento.target.tipoDocumento.value,
      nome: evento.target.nome.value,
      logradouro: evento.target.logradouro.value,
      numero: evento.target.numero.value,
      bairro: evento.target.bairro.value,
      cidade: evento.target.cidade.value,
      uf: evento.target.uf.value,
    }
    
    const response = await service.salvar('Cliente', data);
  }

  return (
    <>
      <Head>
        <title>Clientes | Rocket transportadora</title>
        <meta name="description" content="Um painel administrativo para transportadoras" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <EditItem type='clientes' id={clienteSelecionado?.id} submit={submit}>
          <TextField name='nome' label='Nome' defaultValue={clienteSelecionado?.nome} required />
          <Stack direction='row' columnGap={2}>
            <Autocomplete
              freeSolo
              options={['CPF', 'RG', 'CNH', 'CNPJ']}
              disabled={clienteSelecionado?.id !== undefined}
              sx={{ flexBasis: '30%' }}
              defaultValue={clienteSelecionado?.tipoDocumento}
              renderInput={(params) => <TextField {...params} name='tipoDocumento' label='Documento' required />}
            />
            <TextField
              name='numeroDocumento'
              label='Número do documento'
              defaultValue={clienteSelecionado?.numeroDocumento}
              disabled={clienteSelecionado?.id !== undefined}
              sx={{ flexBasis: '70%' }}
              required
            />
          </Stack>
          <Stack direction='row' columnGap={2}>
            <TextField name='logradouro' label='Logradouro' defaultValue={clienteSelecionado?.logradouro} sx={{ flexBasis: '70%' }} required />
            <TextField name='numero' label='Número' defaultValue={clienteSelecionado?.numero} sx={{ flexBasis: '30%' }} required />
          </Stack>
          <TextField name='bairro' label='Bairro' defaultValue={clienteSelecionado?.bairro} required />
          <Stack direction='row' columnGap={2}>
            <TextField name='cidade' label='Cidade' defaultValue={clienteSelecionado?.cidade} sx={{ flexBasis: '70%' }} required />
            <Autocomplete
              freeSolo
              options={codigosUf}
              sx={{ flexBasis: '30%' }}
              defaultValue={clienteSelecionado?.uf}
              renderInput={(params) => <TextField {...params} name='uf' label='UF' required />}
            />
          </Stack>
        </EditItem>
      </main>
    </>
  )
}

const codigosUf = [
  'AC',
  'AL',
  'AP',
  'AM',
  'BA',
  'CE',
  'DF',
  'ES',
  'GO',
  'MA',
  'MT',
  'MS',
  'MG',
  'PA',
  'PB',
  'PR',
  'PE',
  'PI',
  'RJ',
  'RN',
  'RS',
  'RO',
  'RR',
  'SC',
  'SP',
  'SE',
  'TO'
]

interface IProps {
  clienteSelecionado?: ICliente;
}

export const getServerSideProps: GetServerSideProps<IProps> = async (ctx) => {
  const id = ctx.params?.id;
  // if(id && id[0] === 'adicionar') return { props: {} }

  try {
    const clienteSelecionado = await service.ver('Cliente',id);

    return {
      props: {
        clienteSelecionado,
      }
    }
  } catch (err) {
    if(id === 'adicionar') return { props: {} }

    return {
      notFound: true
    }
  }
}
