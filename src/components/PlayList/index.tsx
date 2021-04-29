import * as React from 'react';
import { Presenter } from './Presenter';

interface PlayListProps {
  socket: SocketIOClient.Socket;
  playList: PlayListItem[];
  isOpen: boolean;
  smartphone?: boolean;
}

export interface PlayListItem {
  videoId: string;
  thumbnail: string;
  title: string;
  requester: string;
}

export const PlayList: React.FC<PlayListProps> = (props: PlayListProps) => {
  return (
    <Presenter socket={props.socket} playList={props.playList} isOpen={props.isOpen} smartphone={props.smartphone} />
  );
};
