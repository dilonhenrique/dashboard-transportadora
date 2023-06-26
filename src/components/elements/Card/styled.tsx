import styled from "@emotion/styled";
import { Paper, Theme } from "@mui/material";

interface StyledProps {
  theme?: Theme;
}

const StyledCard = styled(Paper)`
  display: flex;
  flex-shrink: 0;
  border-radius: 8px;
  width: 300px;
  max-width: 70vw;
  overflow: hidden;
  transition: 0.3s;
  box-shadow: 0 3px 5px rgba(0,0,0,0.1);
  
  > .MuiButtonBase-root {
    padding: 2rem;
    flex: 1;
    justify-content: space-between;
  }
  
  .infosContainer {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    text-align: inherit;
    align-items: start;
  }

  .infos {
    color: ${({theme}: StyledProps) => theme!.palette.grey[500]};
    max-width: 100%;
    
    .label {
      text-transform: uppercase;
      font-size: 0.8em;
      line-height: 1em;

      span {
        font-size: 1.5em;
      }
    }
    
    .info {
      text-overflow: ellipsis;
      white-space: nowrap;                  
      overflow: hidden;
      transition: 0.3s;
    }
  }

  .actions {
    justify-self: flex-end;
    align-self: flex-start;
    margin-top: -.5em;
    margin-right: -1em;
  }

  &:hover {
    box-shadow: 0 3px 15px rgba(0,0,0,0.3);

    .infos .info {
      color: ${(props) => props.theme.palette.text.primary};
    }
  }
`

export default StyledCard;