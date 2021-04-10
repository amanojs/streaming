import * as React from 'react';
import { Box, Grid, Dialog } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { YoutubeWrap } from '../../components/YoutubeWrap';
import './main.css';
import { CreateForm, CreateFormProps, InputSub } from '../../components/CreateForm';

interface PresenterProps {
  socket: SocketIOClient.Socket | null;
  roomId: string;
  nameDialog: boolean;
  createForm: {
    inputs: InputSub[];
    onSubmit: () => void;
  };
}

export const Presenter: React.FC<PresenterProps> = (props: PresenterProps) => {
  return (
    <React.Fragment>
      <Grid container justify="center">
        <Grid item xs={12}>
          {props.roomId && <Box>{props.socket && <YoutubeWrap socket={props.socket} />}</Box>}
        </Grid>
      </Grid>
      {props.roomId ? (
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
