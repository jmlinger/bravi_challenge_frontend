import styled from 'styled-components';

export const MainDashboarDiv = styled.div`
  align-content: center;
  align-items: center;
  margin-top: 10%;
  display: flex;
  flex-direction: column;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  justify-content: space-evenly;
`;

export const DashboardAdm = styled.div`
  background-color: #f3eace;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: max-content;
  box-shadow: 0 0 1em black;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 10px;

  input {
    height: 40px;
    width: 90%;
    border-radius: 10px;
    margin: 10px;
    background-color: #f5deb3;
    font-weight: bold;
    font-size: large;
    text-align: center;
  }

  button {
    margin: 10px;
    border: none;
    height: 46px;
    font-size: larger;
    font-weight: bold;
    text-align: center;
    border-radius: 10px;
    height: 50px;
    width: 90%;
    background-color: #2ad0d2;
    color: white;
    :disabled {
      background-color: gray;
      color: white;
      :hover {
        transform: scale(1);
        box-shadow: none;
        cursor: default;
      }
    }
    :hover {
      transform: scale(1.1);
      transition-duration: 500ms;
      box-shadow: 5px 5px 5px black;
      cursor: pointer;
    }
  }
`;
