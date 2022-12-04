import styled, { keyframes } from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  flex: 1;

  padding: 10px;
  padding-bottom: 30px;
`;

export const Loading = styled.span`
  margin-top: 20px;
`;

export const NoRooms = styled.span`
  margin-top: 20px;
`;

export const RoomsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;

  width: 100%;
  margin-top: 20px;
`;

export const Room = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  max-width: 500px;
  background-color: #989898;
  padding: 10px;
  border-radius: 4px;
`;

const loaderAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

export const LoaderIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  animation: ${loaderAnimation} infinite linear 1.7s;
`;