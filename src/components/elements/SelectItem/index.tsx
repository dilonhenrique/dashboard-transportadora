import deslocamentoApi from '@/infra/http';
import { ICliente, ICondutor, IVeiculo } from '@/interfaces/interfaces';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { SelectProps } from '@mui/material/Select';
import { GetServerSideProps } from 'next';
import React, { useEffect, useState } from 'react';

interface MySelectProps extends SelectProps {
  type: 'clientes' | 'condutores' | 'veiculos';
  props?: SelectProps;
}

interface IOptions {
  id?: any;
  label: string;
}

export default function SelectItem({ type = 'clientes', defaultValue, label, ...props }: MySelectProps) {
  const [options, setOptions] = useState<IOptions[]>([{ id: defaultValue, label: 'carregando...' }]);

  useEffect(() => {
    async function displayOptions() {
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
      return condutores.data.map((item: ICondutor) => ({
        id: item.id,
        label: item.nome,
      }));
    },
    veiculos: async () => {
      const veiculos = await deslocamentoApi.get('Veiculo');
      return veiculos.data.map((item: IVeiculo) => ({
        id: item.id,
        label: `${item.marcaModelo} (${item.anoFabricacao})`,
      }));
    },
  }

  return (
    <FormControl required>
      <InputLabel>{label}</InputLabel>
      <Select label={label} required defaultValue={defaultValue || ''} {...props}>
        {options.map(item =>
          <MenuItem key={item.id} value={item.id}>{item.label}</MenuItem>
        )}
      </Select>
    </FormControl>
  )
}
