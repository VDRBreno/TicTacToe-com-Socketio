import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;

  &.win {
    position: relative;
    overflow: hidden;
  }
`;

export const Main = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  flex: 1;

  padding: 10px;

  &.win {
    filter: brightness(40%);
  }
`;

export const Winner = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  width: 100%;
  max-width: 300px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #ddd;
  border-radius: 7px;
  padding: 10px;
  z-index: 10;
`;

export const PlayersInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  width: 100%;
`;

export const GameContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: 10px;

  width: 100%;
  max-width: 500px;
  aspect-ratio: 1/1;
  background-color: #989898;
  margin-top: 50px;
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 10px;

  width: 100%;
  height: 100%;
`;

export const Cube = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;
  background-color: #120F0F;

  &:hover {
    cursor: pointer;
  }

  & img {
    width: 60%;
    aspect-ratio: 1/1;
    object-fit: cover;
  }
`;