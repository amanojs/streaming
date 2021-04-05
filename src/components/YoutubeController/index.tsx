import * as React from 'react';
import { Presenter } from './Presenter';
import { SocketContext } from '../../App';

export const YoutubeController: React.FC = () => {
  const socket = React.useContext(SocketContext);

  React.useEffect(() => {
    if (socket) {
      onPause();
      onPlay();
    }
  }, [socket]);

  const onPause = () => {
    if (!socket) return;
    socket.emit('youtube_pause', 120);
  };

  const onPlay = () => {
    if (!socket) return;
    socket.emit('youtube_play', 120);
  };

  return <Presenter />;
};
