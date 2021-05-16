import * as React from 'react';
import { Dialog } from '@material-ui/core';
import { YoutubeWrap } from '../../components/YoutubeWrap';
import './main.css';
import { CreateForm, InputSub } from '../../components/CreateForm';
import { AddForm } from '../../components/AddForm';
import { RoomState } from '../../store/modules/roomModule';
import { Chat, ChatItem } from '../../components/Chat/';
import { TabWrap } from '../../components/TabWrap';
import { PlayListItem } from '../../components/PlayList';

interface PresenterProps {
  socket: SocketIOClient.Socket | null;
  videoStatus: number;
  setVideoStatus: (status: number) => void;
  nowPlaying: PlayListItem;
  setNowPlaying: (item: PlayListItem) => void;
  room: RoomState;
  nameDialog: boolean;
  createForm: {
    inputs: InputSub[];
    load: boolean;
    onSubmit: () => void;
  };
  chat: {
    chatList: ChatItem[];
    setChatList: React.Dispatch<React.SetStateAction<ChatItem[]>>;
  };
  playList: {
    nowPlaying: PlayListItem;
    playList: PlayListItem[];
    skipPlayList: () => void;
    deletePlayListItem: (index: number) => void;
    deletePlayList: () => void;
  };
}

export const Presenter: React.FC<PresenterProps> = (props: PresenterProps) => {
  return (
    <React.Fragment>
      {props.room.roomId && props.socket ? (
        <div className="RoomContainer">
          <div className="movieWrap">
            <div className="movie">
              <YoutubeWrap
                socket={props.socket}
                videoStatus={props.videoStatus}
                setVideoStatus={props.setVideoStatus}
                nowPlaying={props.nowPlaying}
                setNowPlaying={props.setNowPlaying}
                room={props.room}
              />
            </div>

            <div className="chat_desk">
              <TabWrap socket={props.socket} chat={{ ...props.chat }} playList={{ ...props.playList }} />
            </div>
          </div>

          <div className="chat_mob">
            <TabWrap
              socket={props.socket}
              chat={{ ...props.chat }}
              playList={{ ...props.playList }}
              smartphone={true}
            />
          </div>

          <div className="addForm">
            <AddForm socket={props.socket} />
          </div>
        </div>
      ) : (
        false
      )}
      {props.room.roomId ? (
        false
      ) : (
        <div className="base">
          <div className="wave"></div>
          <Dialog open={props.nameDialog}>
            <CreateForm width="100%" head="ユーザーネーム" btn="入室" {...props.createForm} />
          </Dialog>
        </div>
      )}
    </React.Fragment>
  );
};
