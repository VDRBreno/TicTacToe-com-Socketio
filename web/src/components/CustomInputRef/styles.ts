import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 13px;
  border: 1px solid #C4C4C4;
  border-radius: 5px;
  background-color: #FAFAFA;
  position: relative;

  & svg {
    margin-left: 10px;
  }

  & svg:hover {
    cursor: pointer;
    filter: brightness(70%);
  }

  & input {
    width: 100%;
    font-weight: 100;
    color: #444444;
    border: none;
    background-color: transparent;
    outline: none;
  }
  
  & input::placeholder {
    color: #C4C4C4;
  }
`;

export const Label = styled.span`
  background-color: #FAFAFA;
  padding: 2px 5px;
  color: #616161;
  font-size: 0.7rem;
  font-weight: 600;
  position: absolute;
  top: 0;
  left: 3px;
  transform: translateY(-50%);
  border-radius: 3px;
`;