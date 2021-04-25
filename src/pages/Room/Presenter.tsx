import * as React from 'react';
import { Box, Grid, Dialog, Hidden } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { YoutubeWrap } from '../../components/YoutubeWrap';
import './main.css';
import { CreateForm, CreateFormProps, InputSub } from '../../components/CreateForm';
import { AddForm } from '../../components/AddForm';
import { RoomState } from '../../store/modules/roomModule';
import { Chat } from '../../components/Chat/';

interface PresenterProps {
  socket: SocketIOClient.Socket | null;
  room: RoomState;
  nameDialog: boolean;
  createForm: {
    inputs: InputSub[];
    load: boolean;
    onSubmit: () => void;
  };
}

export const Presenter: React.FC<PresenterProps> = (props: PresenterProps) => {
  return (
    <React.Fragment>
      {props.room.roomId && props.socket ? (
        <div className="RoomContainer">
          <div className="movieWrap">
            <div className="movie">
              <YoutubeWrap socket={props.socket} room={props.room} />
            </div>

            <div className="chat_desk">
              <Chat socket={props.socket} />
            </div>
          </div>

          <div className="chat_mob">
            <Chat socket={props.socket} smartphone={true} />
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
        </div>
      )}
      <Dialog open={props.nameDialog}>
        <CreateForm width="100%" head="ユーザーネーム" btn="入室" {...props.createForm} />
      </Dialog>
    </React.Fragment>
  );
};
