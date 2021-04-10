import React from 'react';
import io from 'socket.io-client';
import { ThemeProvider } from '@material-ui/styles';
import { theme } from './config/theme';
import { Routes } from './config/route';
import { useStateWithCallbackLazy } from 'use-state-with-callback';
import { SnackbarProvider } from 'notistack';

export interface PageProps {
  getSocket(): Promise<SocketIOClient.Socket>;
  clearSocket(): void;
}

const App: React.FC = () => {
  const [socket, setSocket] = useStateWithCallbackLazy<SocketIOClient.Socket | null>(null);

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
          setSocket(client, function () {
            // 接続が接続が成功した際にsocket clientを返却
            resolve(client);
          });
        });
      } else {
        // 接続済みだった場合stateのsocket clientを返却
        return resolve(socket);
      }
    });
  };

  const clearSocket = (): void => {
    socket?.disconnect();
    setSocket(null, () => {
      console.log('clear socket');
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider maxSnack={1}>
        <Routes getSocket={getSocket} clearSocket={clearSocket} />
      </SnackbarProvider>
    </ThemeProvider>
  );
};

export default App;
