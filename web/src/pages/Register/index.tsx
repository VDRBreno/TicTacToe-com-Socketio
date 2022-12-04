import { createRef, useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Socket } from 'socket.io-client';
import { FiChevronRight } from 'react-icons/fi';

import CustomButton from '../../components/CustomButton';
import CustomInputRef from '../../components/CustomInputRef';
import useAuth from '../../hooks/useAuth';
import { toastStyle } from '../../styles/toast';
import handleError from '../../utils/handleError';

import { Container, RegisterForm } from './styles';

interface RegisterProps {
  socket: Socket;
}

export function Register({
  socket
}: RegisterProps) {
  
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const inputRefs = {
    name: createRef<HTMLInputElement>()
  }

  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if(loading) return;

    try {

      if(!inputRefs.name.current||
        (inputRefs.name.current&&!inputRefs.name.current.value)
      ) {
        toast.error('Ocorreu um erro ao tentar obter o nome do usuário!', toastStyle.error);
        return;
      }

      setLoading(true);
        
      socket.emit('register-player', { playerName: inputRefs.name.current.value });
      
      socket.on('player-registered', () => {
        setLoading(false);
        signIn();
        navigate('/home');
      });

    } catch(err) {
      handleError(err);
    }
  }

  useEffect(() => {

    let socketListeners: Socket[] = [];
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
      TicTaeToe w/ Socket.io
      <RegisterForm onSubmit={handleSubmit}>
        <CustomInputRef
          refr={inputRefs.name}
          type='text'
          placeholder='Digite um nome'
          style={{
            width: '100%'
          }}
          required
        />
        <CustomButton type='submit'>
          <FiChevronRight size={20} color='#ffffff' />
        </CustomButton>
      </RegisterForm>
    </Container>
  );
}