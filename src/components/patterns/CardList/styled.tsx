import styled from "@emotion/styled";

const StyledSection = styled.section`
  margin-bottom: 2rem;

  .title {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    width: 300px;
    max-width: 100%;
    padding: 0 5px;
    margin-bottom: .2rem;

    > h2 {
      display: flex;
      align-items: center;
    }
  }

  .cards {
    display: flex;
    gap: 2rem;
    overflow-x: auto;
    margin: -15px;
    padding: 15px;

    @media (max-width: 600px){
      gap: 1rem;
      margin: 0 -2rem;
    }
    
    &.wrap {
      flex-wrap: wrap;
      @media (max-width: 600px){
        margin: -15px;
        padding: 15px;
      }

      .card {
        max-width: 100%;
      }
    }
  }

  &:last-child {
    padding-bottom: 4rem;
  }
`

export default StyledSection;