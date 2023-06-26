import React from 'react';
import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { FaRocket } from 'react-icons/fa';

const StyledLogo = styled(Typography)(() => ({
  'svg': {
    marginRight: '0.5em',
  },
  'span': {
    fontSize: '22px',
    fontWeight: 800,
    textTransform: 'uppercase',
  }
}))

export default function Logo() {
  return (
    <StyledLogo className='logo'>
      <FaRocket size={18} />
      <span>Rocket</span>
    </StyledLogo>
  )
}
