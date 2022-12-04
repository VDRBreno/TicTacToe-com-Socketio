import { useEffect } from 'react';

import socketIo from 'socket.io-client';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AuthContextProvider } from './contexts/AuthContext';
import Router from './router';

import GlobalStyle from './styles/global';

const socket = socketIo(import.meta.env.VITE_SERVER_URL);
socket.connect();

function App() {

  useEffect(() => {
    
    return () => {
      socket.disconnect();
    }
  }, []);

  return (
    <AuthContextProvider socket={socket}>
      <ToastContainer
        position='top-right'
        autoClose={5000}
        closeOnClick
        pauseOnFocusLoss
        pauseOnHover
      />
      <GlobalStyle />
      <Router socket={socket} />
    </AuthContextProvider>
  );
}

export default App;