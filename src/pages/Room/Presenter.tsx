import * as React from 'react';
import { Box, Grid, Dialog, Hidden } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { YoutubeWrap } from '../../components/YoutubeWrap';
import './main.css';
import { CreateForm, CreateFormProps, InputSub } from '../../components/CreateForm';
import { AddForm } from '../../components/AddForm';
import { RoomState } from '../../store/modules/roomModule';
import { Presenter as Chat } from '../../components/Chat/Presenter';

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

            <div className="chat">
              <Chat />
            </div>

            <Box
              width="100%"
              boxSizing="border-box"
              marginTop="10px"
              padding="10px 11px"
              borderRadius="2px"
              style={{ background: '#fff' }}
            >
              <AddForm socket={props.socket} />
            </Box>
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
