import { useState, useEffect } from 'react';

import { Socket } from 'socket.io-client';
import { FiChevronRight, FiPlus, FiLoader } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

import { IRoom } from '../../@types/Room';
import CustomButton from '../../components/CustomButton';

import { Container, LoaderIcon, Loading, NoRooms, Room, RoomsContainer } from './styles';
import handleError from '../../utils/handleError';

interface HomeProps {
  socket: Socket;
}

export function Home({
  socket
}: HomeProps) {
  
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [rooms, setRooms] = useState<IRoom[]>();
  const [joiningRoom, setJoiningRoom] = useState('');

  async function getRooms() {
    socket.emit('get-rooms');
  }

  function goToPlayRoomPage() {
    navigate('/room/create');
  }

  function joinRoom(roomId: string) {
    if(joiningRoom) return;
    setJoiningRoom(roomId);
    socket.emit('join-room', { roomId });
  }

  useEffect(() => {
    
    setLoading(true);

    getRooms();

    const socketListeners: Socket[] = [];
    socketListeners.push(socket.on('get-rooms-response', data => {
      if(data.rooms)
        setRooms(data.rooms);
      setLoading(false);
    }));

    socketListeners.push(socket.on('update-rooms', data => {
      if(data.rooms)
        setRooms(data.rooms);
    }));

    socketListeners.push(socket.on('joined-room', data => {
      if(data && data.roomId)
        navigate(`/room?roomId=${data.roomId}`);
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
    <Container>
      <div style={{
        display: 'flex',
        gap: '10px',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%'
      }}>
        <div style={{ width: '35px' }}/>
        Salas disponíveis:
        <CustomButton onClick={goToPlayRoomPage} style={{ backgroundColor: '#989898', padding: '6px' }}>
          <FiPlus size={23} color='#120F0F' />
        </CustomButton>
      </div>
      
      {loading ? <Loading>Carregando..</Loading> :null}

      {rooms && rooms.length===0 ? <NoRooms>Sem salas :/</NoRooms> :null}
      
      {rooms && rooms.length>0 ? (
        <RoomsContainer>
          {rooms.map(room => (
            <Room key={room.id} style={{ color: '#120F0F' }}>
              Sala: {room.id}
              <CustomButton onClick={() => joinRoom(room.id)} style={{ backgroundColor: '#120F0F' }}>
                {joiningRoom===room.id
                  ? <LoaderIcon><FiLoader size={20} color='#989898' /></LoaderIcon>
                  : <FiChevronRight size={20} color='#989898' />
                }
              </CustomButton>
            </Room>
          ))}
        </RoomsContainer>
      ) :null}
    </Container>
  );
}