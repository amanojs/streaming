import React from 'react';
import io from 'socket.io-client';
import { ThemeProvider } from '@material-ui/styles';
import { theme } from './config/theme';
import { Routes } from './config/route';
import { useStateWithCallbackLazy } from 'use-state-with-callback';

interface AppState {
  socket: SocketIOClient.Socket | null;
}

export interface PageProps {
  getSocket(): Promise<SocketIOClient.Socket>;
}

const App: React.FC = () => {
  const [socket, setSocket] = useStateWithCallbackLazy<AppState['socket']>(null);

  // websocketに接続し、socket clientを返却
  const getSocket = (): Promise<SocketIOClient.Socket> => {
    console.log('getSocket');
    return new Promise((resolve) => {
      if (!socket) {
        // 接続開始
        const client = io.connect(process.env.REACT_APP_API_URL as string);
        client.on('connect', () => {
          console.log('connected');
          // 別ページからも参照できるようにstateにセット
          setSocket(client, () => {
            // 接続が接続が成功した際にsocket clientを返却
            return resolve(client);
          });
        });
      } else {
        console.log('接続済み');
        // 接続済みだった場合stateのsocket clietnを返却
        return resolve(socket);
      }
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Routes getSocket={getSocket} />
    </ThemeProvider>
  );
};

export default App;
