import * as React from 'react';
import { Box, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { YoutubeWrap } from '../../components/YoutubeWrap';

interface PresenterProps {
  socket: SocketIOClient.Socket | null;
}

export const Presenter: React.FC<PresenterProps> = (props: PresenterProps) => {
  return (
    <React.Fragment>
      <div style={{ background: '#fff' }}>
        <div>header</div>
      </div>
      <Grid container justify="center">
        <Grid item xs={12}>
          <Box>{props.socket && <YoutubeWrap socket={props.socket} />}</Box>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
