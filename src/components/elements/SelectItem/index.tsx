import deslocamentoApi from '@/infra/http';
import { ICliente, ICondutor, IVeiculo } from '@/interfaces/interfaces';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { GetServerSideProps } from 'next';
import React, { useEffect, useState } from 'react';

interface SelectProps {
  type: 'clientes' | 'condutores' | 'veiculos';
  label?: string;
  name?: string;
  props: SelectProps;
}

interface IOptions {
  id: number;
  label: string;
}

export default function SelectItem({ type = 'clientes', label, name, ...props }: SelectProps) {
  const [options, setOptions] = useState<IOptions[]>([{id:1,label:'carregando...'}]);

  useEffect(() => {
    async function displayOptions(){
      const data = await getOptions[type]();
      setOptions(data);
    }
    displayOptions();
  }, [])

  const getOptions = {
    clientes: async () => {
      const clientes = await deslocamentoApi.get('Cliente');
      return clientes.data.map((item: ICliente) => ({
        id: item.id,
        label: item.nome,
      }));
    },
    condutores: async () => {
      const condutores = await deslocamentoApi.get('Condutor');
      return condutores.data.map((item:ICondutor) => ({
        id: item.id,
        label: item.nome,
      }));
    },
    veiculos: async () => {
      const veiculos = await deslocamentoApi.get('Veiculo');
      return veiculos.data.map((item:IVeiculo) => ({
        id: item.id,
        label: `${item.marcaModelo} (${item.anoFabricacao})`,
      }));
    },
  }

  return (
    <FormControl required>
      <InputLabel>{label}</InputLabel>
      <Select name={name} label={label} required {...props}>
        {options.map(item =>
          <MenuItem key={item.id} value={item.id}>{item.label}</MenuItem>
        )}
      </Select>
    </FormControl>
  )
}
