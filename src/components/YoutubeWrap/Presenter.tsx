import * as React from 'react';
import YouTube, { YouTubeProps } from 'react-youtube';
import { YouTubePlayer } from 'youtube-player/dist/types';
import { YoutubeController } from '../YoutubeController';
import { Box, Grid } from '@material-ui/core';

export interface PresenterProps {
  player: YouTubeProps;
  controller: {
    socket: SocketIOClient.Socket;
    youtubeDisp: YouTubePlayer | undefined;
    videoStatus: number;
  };
}

export const Presenter: React.FC<PresenterProps> = (props: PresenterProps) => {
  return (
    <React.Fragment>
      <Grid container justify="center">
        {/* 最大化の場合は↓を変更 */}
        <Grid item xs={11}>
          <Box paddingY={3}>
            <YouTube {...props.player} />
            <YoutubeController {...props.controller} />
          </Box>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
