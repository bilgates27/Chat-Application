import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { UserProvider } from './context/UserContext';
import { RoomProvider } from './context/RoomContext';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <UserProvider>
      <RoomProvider>
        <App />
      </RoomProvider>
    </UserProvider>
  </React.StrictMode>
);
