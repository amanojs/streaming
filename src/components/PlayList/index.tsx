import * as React from 'react';
import { Presenter } from './Presenter';

interface PlayListProps {
  socket: SocketIOClient.Socket;
  nowPlaying: PlayListItem;
  playList: PlayListItem[];
  skipPlayList: () => void;
  deletePlayListItem: (index: number) => void;
  deletePlayList: () => void;
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
    <Presenter
      socket={props.socket}
      nowPlaying={props.nowPlaying}
      playList={props.playList}
      skipPlayList={props.skipPlayList}
      deletePlayListItem={props.deletePlayListItem}
      deletePlayList={props.deletePlayList}
      isOpen={props.isOpen}
      smartphone={props.smartphone}
    />
  );
};
