import * as React from 'react';
import { Presenter } from './Presenter';

interface PlayListProps {
  socket: SocketIOClient.Socket;
  isOpen: boolean;
  smartphone?: boolean;
}

export const PlayList: React.FC<PlayListProps> = (props: PlayListProps) => {
  return <Presenter socket={props.socket} isOpen={props.isOpen} smartphone={props.smartphone} />;
};
