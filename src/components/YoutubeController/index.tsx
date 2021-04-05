import * as React from 'react';
import { Presenter } from './Presenter';
import { SocketContext } from '../../App';

export const YoutubeController: React.FC = () => {
  const [mount, mountKeeper] = React.useState();
  const socket = React.useContext(SocketContext);

  React.useEffect(() => {
    console.log('youtube', socket);
    onPause();
  }, [mountKeeper]);

  const onPause = () => {
    if (!socket) return;
    socket.emit('youtube_pause', 120);
  };

  return <Presenter />;
};
