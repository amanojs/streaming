import * as React from 'react';
import { Box, Grid, Dialog } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { YoutubeWrap } from '../../components/YoutubeWrap';
import './main.css';
import { CreateForm, CreateFormProps, InputSub } from '../../components/CreateForm';
import { AddForm } from '../../components/AddForm';

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
      {props.roomId && props.socket ? (
        <Grid container justify="center" style={{ paddingBottom: '50px' }}>
          <Grid item xs={12}>
            <Box>
              <YoutubeWrap socket={props.socket} />
            </Box>
          </Grid>
          <Grid item xs={10}>
            <Box boxSizing="border-box" padding="20px" borderRadius="2px" style={{ background: '#fff' }}>
              <AddForm socket={props.socket} />
            </Box>
          </Grid>
        </Grid>
      ) : (
        false
      )}
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
