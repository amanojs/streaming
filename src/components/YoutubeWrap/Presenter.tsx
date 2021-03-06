import * as React from 'react';
import YouTube, { YouTubeProps } from 'react-youtube';
import { YouTubePlayer } from 'youtube-player/dist/types';
import { YoutubeController } from '../YoutubeController';
import { Box, Grid } from '@material-ui/core';
import './main.css';

export interface PresenterProps {
  player: YouTubeProps;
  videoId: string;
  controller: {
    socket: SocketIOClient.Socket;
    youtubeDisp: YouTubePlayer | undefined;
    videoStatus: number;
    volume: number;
    isMuted: boolean;
    changeVolume: (num: number) => void;
    setVolumeLog: (num: number) => void;
    mute: () => void;
    unMute: () => void;
    unMuteForVolumeBar: () => void;
  };
  opts: YouTubeProps['opts'];
}

export const Presenter: React.FC<PresenterProps> = (props: PresenterProps) => {
  return (
    <React.Fragment>
      <Grid container justify="center">
        <Grid item xs={12}>
          <Box>
            <Grid container>
              <Grid item xs={12}>
                <div style={{ background: 'black' }}>
                  <YouTube {...props.player} opts={props.opts} className="youtube_display" />
                </div>
              </Grid>
              <Grid item style={{ background: '#000' }} xs={12}>
                <YoutubeController {...props.controller} />
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
