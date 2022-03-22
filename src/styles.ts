import styled from "styled-components";

export const AppContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #2f74c0;

  @media (max-width: 800px) {
    margin: 15px 0;
    font-size: 35px;
  }
`;

export const AppHeading = styled.h1`
  text-transform: uppercase;
  font-size: 40px;
  margin: 30px 0;
  color: white;
  z-index: 1;
  text-align: center;
`;
