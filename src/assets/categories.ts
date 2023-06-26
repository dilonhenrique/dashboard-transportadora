import { RiUserSmileLine, RiSteering2Line, RiTruckLine, RiRoadMapLine, RiHome4Line } from 'react-icons/ri';

const categories = {
  home: {
    url: '/',
    name: 'Home',
    singular: 'Home',
    Icon: RiHome4Line,
  },
  clientes: {
    url: '/clientes',
    name: 'Clientes',
    singular: 'Cliente',
    Icon: RiUserSmileLine,
  },
  condutores: {
    url: '/condutores',
    name: 'Condutores',
    singular: 'Condutor',
    Icon: RiSteering2Line,
  },
  veiculos: {
    url: '/veiculos',
    name: 'Veículos',
    singular: 'Veículo',
    Icon: RiTruckLine,
  },
  deslocamentos: {
    url: '/deslocamentos',
    name: 'Deslocamentos',
    singular: 'Deslocamento',
    Icon: RiRoadMapLine,
  },
}

export const categoriesArray = Object.values(categories);

export default categories;