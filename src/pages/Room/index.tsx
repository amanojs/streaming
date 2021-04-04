import * as React from 'react';
import io from 'socket.io-client';
import { Presenter } from './Presenter';

export default class Room extends React.Component {
  state: { socket: null | SocketIOClient.Socket } = {
    socket: null
  };

  componentDidMount(): void {
    if (!this.state.socket) {
      this.setState({ socket: io.connect(process.env.REACT_APP_API_URL as string) });
    }
  }

  componentDidUpdate(): void {
    console.log(this.state);
    if (this.state.socket) {
      this.state.socket?.on('connect', () => {
        console.log('WebSocketサーバーに接続しました。');
      });
    }
  }

  render(): JSX.Element {
    return <Presenter />;
  }
}
