import styled from 'styled-components';

export const Container = styled.button`
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  background-color: #008FDC;
  color: #FCFCFC;
  transition: filter 0.2s;
  &:hover {
    cursor: pointer;
    filter: brightness(80%);
  }
  
  &.disabled {
    filter: brightness(80%);
  }
  
  &.disabled:hover {
    cursor: not-allowed;
  }
`;