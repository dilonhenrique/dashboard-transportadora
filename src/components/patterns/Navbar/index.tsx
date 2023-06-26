import React from 'react';
import StyledHeader from './styled';
import Logo from '@/components/elements/Logo';
import { categoriesArray } from '@/assets/categories';
import { Link } from '@mui/material';
import { useRouter } from 'next/router';

export default function Navbar() {
  const router = useRouter();
  const path = `/${router.asPath.split('/')[1]}`

  return (
    <StyledHeader>
      <Logo />
      <nav>
        <ul>
          {categoriesArray.map(item => (
            <li key={item.name} className='link'>
              <Link href={item.url} className={path === item.url ? 'ativo' : ''}>
                <span className='icon'>
                  <item.Icon size={20} />
                </span>
                <span className='name'>
                  {item.name}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </StyledHeader>
  )
}
