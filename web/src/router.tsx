import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { Socket } from 'socket.io-client';

import useAuth from './hooks/useAuth';

import { Home } from './pages/Home';
import { Register } from './pages/Register';
import { CreateRoom } from './pages/CreateRoom';
import { PlayRoom } from './pages/playRoom';

interface RouterProps {
  socket: Socket;
}

interface CustomRouteProps {
  component: JSX.Element;
}

function RegisterRoute({ component }: CustomRouteProps) {
  const { isAuthenticated } = useAuth();

  if(isAuthenticated)
    return <Navigate to='/home' />;
  
  return component;
}

function PrivateRoute({ component }: CustomRouteProps) {
  const { isAuthenticated } = useAuth();

  if(isAuthenticated)
    return component;

  return <Navigate to='/' />;
}

function Router({
  socket
}: RouterProps) {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={<RegisterRoute component={<Register socket={socket} />} />}
        />
        <Route
          path='/home'
          element={<PrivateRoute component={<Home socket={socket} />} />}
        />
        <Route
          path='/room/create'
          element={<PrivateRoute component={<CreateRoom socket={socket} />} />}
        />
        <Route
          path='/room'
          element={<PrivateRoute component={<PlayRoom socket={socket} />} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;