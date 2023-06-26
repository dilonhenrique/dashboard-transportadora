import * as React from 'react';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import categories from '@/assets/categories';

const actions = [
  { icon: <categories.clientes.Icon size={18} />, name: categories.clientes.singular, href: `${categories.clientes.url}/adicionar` },
  { icon: <categories.condutores.Icon size={18} />, name: categories.condutores.singular, href: `${categories.condutores.url}/adicionar` },
  { icon: <categories.veiculos.Icon size={18} />, name: categories.veiculos.singular, href: `${categories.veiculos.url}/adicionar` },
  { icon: <categories.deslocamentos.Icon size={18} />, name: categories.deslocamentos.singular, href: `${categories.deslocamentos.url}/adicionar` },
];

export default function AddItem() {
  return (
    <Box sx={{ position: 'fixed', bottom: 0, right: 0, transform: 'translateZ(0px)', flexGrow: 1, '@media (max-width: 600px)': { bottom: '80px'} }}>
      <SpeedDial
        ariaLabel="Adcionar..."
        sx={{ position: 'absolute', bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            href={action.href}
            tooltipTitle={action.name}
          />
        ))}
      </SpeedDial>
    </Box>
  );
}