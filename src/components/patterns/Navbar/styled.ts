import { styled } from '@mui/material/styles';

const StyledHeader = styled('header')`
  width: 250px;
  background-color: #FFFFFF;
  padding: 4rem 0 4rem 2rem;
  flex-shrink: 0;
  z-index: 2;

  ul {
    margin-top: 3rem;
  }

  .link {
    list-style: none;
    margin-bottom: 1rem;

    * {
      transition: 0.3s;
    }
    
    a {
      display: flex;
      align-items: center;
      gap: .5rem;
      text-decoration: none;
      font-size: 16px;
      font-weight: 800;
      color: ${({theme}) => theme.palette.grey[300]};

      .icon {
        display: inline-flex;
        justify-content: center;
        align-items: center;
        width: 30px;
        height: 30px;
        background-color: ${({theme}) => theme.palette.grey[300]};
        color: #ffffff;
        border-radius: 50%;
      }

      &:hover, &.ativo {
        color: ${({theme}) => theme.palette.grey[900]};

        .icon {
          background-color: ${({theme}) => theme.palette.primary.main};
        }
      }

      &.ativo {
        border-right: 4px solid ${({theme}) => theme.palette.primary.main}
      }
    }
  }

  @media (max-width: 600px){
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;

    padding: 0rem 2rem 1rem 2rem;

    .logo {
      display: none;
    }

    nav ul {
      margin: 0;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: flex-end;

      .link a {
        padding-top: 1rem;

        &.ativo{
          border-right: none;
          border-top: 4px solid ${({theme}) => theme.palette.primary.main};
        }

        .icon {
          @media (min-width: 350px){
            width: 40px;
            height: 40px;
          }
        }
      }
      
      .name {
        display: none;
      }

    }
  }
`

export default StyledHeader;