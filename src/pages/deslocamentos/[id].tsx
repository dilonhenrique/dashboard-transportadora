import Head from 'next/head';
import { GetServerSideProps } from 'next';
import deslocamentoApi from '@/infra/http';
import { IDeslocamento } from '@/interfaces/interfaces';
import EditItem from '@/components/patterns/EditItem';
import { Stack, TextField } from '@mui/material';
import DateField from '@/components/elements/DateField';
import SelectItem from '@/components/elements/SelectItem';
import { service } from '@/infra/services';
import dayjs from 'dayjs';

export default function Home({ deslocamentoSelecionado }: IProps) {
  const disabled = deslocamentoSelecionado?.id !== undefined;
  const finalizado = disabled && deslocamentoSelecionado?.fimDeslocamento !== null;

  async function submit(evento: React.FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    const target = evento.target as HTMLFormElement;

    const data = deslocamentoSelecionado?.id
      ? {
        id: deslocamentoSelecionado?.id,
        kmFinal: Number(target.kmFinal.value),
        fimDeslocamento: dayjs(target.fimDeslocamento.value, 'DD-MM-YYYY').toISOString(),
        observacao: target.observacao.value,
      } as IDeslocamento
      : {
        kmInicial: Number(target.kmInicial.value),
        inicioDeslocamento: dayjs(target.inicioDeslocamento.value, 'DD-MM-YYYY').toISOString(),
        checkList: target.checkList.value,
        motivo: target.motivo.value,
        observacao: target.observacao.value,
        idCondutor: Number(target.idCondutor.value),
        idVeiculo: Number(target.idVeiculo.value),
        idCliente: Number(target.idCliente.value),
      } as IDeslocamento;
    const response = await service.deslocamento(data);
  }

  return (
    <>
      <Head>
        <title>Deslocamentos | Rocket transportadora</title>
        <meta name="description" content="Um painel administrativo para transportadoras" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <EditItem type='deslocamentos' id={deslocamentoSelecionado?.id} submit={submit} viewOnly={finalizado}>
          <Stack direction='row' columnGap={2}>
            <DateField name='inicioDeslocamento' label='Data de início' defaultValue={deslocamentoSelecionado?.inicioDeslocamento} sx={{ flexBasis: '60%' }} disabled={disabled} />
            <TextField name='kmInicial' label='Km inicial' defaultValue={deslocamentoSelecionado?.kmInicial} sx={{ flexBasis: '40%' }} type='number' disabled={disabled} required />
          </Stack>
          <TextField name='motivo' label='Motivo' defaultValue={deslocamentoSelecionado?.motivo} disabled={disabled} />
          <TextField name='checkList' label='Checklist' defaultValue={deslocamentoSelecionado?.checkList} disabled={disabled} />
          <SelectItem name='idVeiculo' label='Veículo' defaultValue={deslocamentoSelecionado?.idVeiculo} type='veiculos' disabled={disabled} />
          <SelectItem name='idCondutor' label='Condutor' defaultValue={deslocamentoSelecionado?.idCondutor} type='condutores' disabled={disabled} />
          <SelectItem name='idCliente' label='Cliente' defaultValue={deslocamentoSelecionado?.idCliente} type='clientes' disabled={disabled} />
          <TextField name='observacao' label='Observação' defaultValue={deslocamentoSelecionado?.observacao} disabled={finalizado} />
          {deslocamentoSelecionado?.id &&
            <Stack direction='row' columnGap={2}>
              <DateField name='fimDeslocamento' label='Data de finalização' defaultValue={deslocamentoSelecionado?.fimDeslocamento} sx={{ flexBasis: '60%' }} disabled={finalizado} />
              <TextField name='kmFinal' label='Km final' defaultValue={deslocamentoSelecionado?.kmFinal} sx={{ flexBasis: '40%' }} type='number' required disabled={finalizado} />
            </Stack>
          }
        </EditItem>
      </main>
    </>
  )
}

interface IProps {
  deslocamentoSelecionado?: IDeslocamento;
}

export const getServerSideProps: GetServerSideProps<IProps> = async (ctx) => {
  const id = ctx.params?.id;
  // if(id && id[0] === 'adicionar') return { props: {} }

  try {
    const deslocamentoSelecionado = await deslocamentoApi.get(`Deslocamento/${id}`);

    return {
      props: {
        deslocamentoSelecionado: deslocamentoSelecionado.data,
      }
    }
  } catch (err) {
    if (id === 'adicionar') return { props: {} }

    return {
      notFound: true
    }
  }
}
