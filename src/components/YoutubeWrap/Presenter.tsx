import * as React from 'react';
import YouTube from 'react-youtube';
import { YouTubePlayer } from 'youtube-player/dist/types';
import { YoutubeController } from '../YoutubeController';
import { YoutubeControllerProps } from '../YoutubeController';
import { Box, Grid } from '@material-ui/core';

export interface PresenterProps {
  youtubeRef: React.RefObject<YouTube>;
  player: {
    videoId: string;
    onPlay: ({ target, data }: { target: YouTubePlayer; data: number }) => void;
    onPause: ({ target, data }: { target: YouTubePlayer; data: number }) => void;
    onStateChange: ({ target, data }: { target: YouTubePlayer; data: number }) => void;
    onReady: (event: { target: YouTubePlayer }) => void;
    opts: {
      width?: string;
      height?: string;
      playerVars: {
        [params: string]: string | number;
      };
    };
  };
  videoStatus: YoutubeControllerProps['videoStatus'];
  youtubeDisp: YoutubeControllerProps['youtubeDisp'];
}

export const Presenter: React.FC<PresenterProps> = (props: PresenterProps) => {
  return (
    <React.Fragment>
      <Grid container justify="center">
        {/* 最大化の場合は↓を変更 */}
        <Grid item xs={11}>
          <Box paddingY={3}>
            <YouTube {...props.player} ref={props.youtubeRef} />
            <YoutubeController videoStatus={props.videoStatus} youtubeDisp={props.youtubeDisp} />
          </Box>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
