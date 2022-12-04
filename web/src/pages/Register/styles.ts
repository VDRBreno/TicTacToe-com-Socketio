import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  flex: 1;

  padding: 0 10px;
  padding-top: 20px;
`;

export const RegisterForm = styled.form`
  display: flex;
  justify-content: space-between;
  gap: 10px;

  width: 100%;
  max-width: 500px;
  margin-top: 100px;
  background-color: #ddd;
  padding: 10px;
  border-radius: 10px;
`;