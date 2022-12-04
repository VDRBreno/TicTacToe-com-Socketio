import { useState, useEffect} from 'react';

import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Socket } from 'socket.io-client';

import { IPlayer } from '../../@types/Player';
import { IRoom } from '../../@types/Room';

import circleSvg from '../../assets/svgs/circle.svg';
import xSvg from '../../assets/svgs/x.svg';
import CustomButton from '../../components/CustomButton';
import { toastStyle } from '../../styles/toast';
import handleError from '../../utils/handleError';

import { Column, Container, Cube, GameContainer, Main, PlayersInfo, Winner } from './styles';

interface PlayRoomProps {
  socket: Socket;
}

export function PlayRoom({
  socket
}: PlayRoomProps) {

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [loading, setLoading] = useState(true);
  const [room, setRoom] = useState<IRoom>();
  const [player, setPlayer] = useState<IPlayer>();
  const [opponent, setOpponent] = useState<IPlayer>();
  const [win, setWin] = useState('');

  function handleSearchParams() {
    searchParams.get('roomId');
    const { roomId } = Object.fromEntries(searchParams.entries());
    getRoom(roomId);
  }

  function getRoom(roomId: string) {
    socket.emit('get-room', { roomId });
  }

  function submitMove(moveIndex: number, roomId: string) {
    socket.emit('play-move', { roomId, moveIndex });
  }

  function backToHomePage() {
    navigate('/home');
  }

  function setWinner() {

  }

  useEffect(() => {

    handleSearchParams();

    let socketListeners: Socket[] = [];
    socketListeners.push(socket.on('get-room-response', data => {
      if(data && data.room && data.opponent && data.player) {
        setRoom(data.room);
        setOpponent(data.opponent);
        setPlayer(data.player);
        setLoading(false);
      }
    }));

    socketListeners.push(socket.on('move-update', data => {
      if(data && data.room) {
        setRoom(data.room);
      }
    }));

    socketListeners.push(socket.on('opponent-win', data => {
      if(data && data.room && data.opponent) {
        setRoom(data.room);
        setWin(data.opponent.id);
      }
    }));
    
    socketListeners.push(socket.on('you-win', data => {
      if(data && data.room) {
        setRoom(data.room);
        setWin(socket.id);
      }
    }));

    socketListeners.push(socket.on('opponent-quit', data => {
      toast.error('Oponente saiu da partida!', toastStyle.error);
      navigate('/home');
    }));

    socketListeners.push(socket.on('error', data => {
      handleError(data);
    }));

    return () => {
      for(let socketListener of socketListeners)
        socketListener.removeListener();
    }
  }, []);

  return (
    <Container className={`${win ?'win' :''}`}>

      {win ? (
        <Winner>
          <span style={{
            color: '#120F0F',
            fontWeight: '600',
            textAlign: 'center',
            fontSize: '1.5rem',
            padding: '10px'
          }}>{win===socket.id ?'Você venceu!!' :'O oponente venceu :/'}</span>
          <CustomButton onClick={backToHomePage} style={{
            backgroundColor: '#989898'
          }}>
            <span style={{
              color: '#120F0F',
              fontWeight: '600'
            }}>Voltar</span>
          </CustomButton>
        </Winner>
      ) :null}

      <Main className={`${win ?'win' :''}`}>
        {loading ? <span>Carregando..</span> :null}

        {opponent&&player&&room ? (
          <PlayersInfo>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between'
            }}>
              <div>Oponente: {opponent.name}</div>
              <div>Você: {player.name}</div>
            </div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between'
            }}>
              <img style={{ width: '20px' }} src={room.playerOId===opponent.id ?circleSvg :xSvg} alt='icon' />
              <img style={{ width: '20px' }} src={room.playerXId===socket.id ?xSvg :circleSvg} alt='icon' />
            </div>
          </PlayersInfo>
        ) :null}

        {room && opponent ? (
          <GameContainer>
            {room.moves.map((move, i) => (
              <Cube key={i} onClick={() => submitMove(i, room.id)}>{move===socket.id
                ? <img src={room.playerXId===socket.id ?xSvg :circleSvg} alt='icon' />
                : move===opponent.id
                  ? <img src={room.playerXId===opponent.id ?xSvg :circleSvg} alt='icon' />
                  : null
              }</Cube>
            ))}
          </GameContainer>
        ) :null}
      </Main>
    </Container>
  );
}