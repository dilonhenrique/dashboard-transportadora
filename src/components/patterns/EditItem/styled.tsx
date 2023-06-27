import styled from "@emotion/styled";


const StyledEdit = styled.div`
  @media (max-width:600px){
    padding-bottom: 100px;
  }

  .title {
    padding-bottom:0.5rem;
  }

  .formContainer {
    width: 500px;
    max-width: 100%;
    padding-top: 0.5rem;
    gap: 1rem;
    flex-direction: column;
  }

  .actions {
    padding-top: 1rem;
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
  }
`

export default StyledEdit;