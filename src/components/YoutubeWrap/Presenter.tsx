import * as React from 'react';
import YouTube from 'react-youtube';
import { YouTubePlayer } from 'youtube-player/dist/types';
import { YoutubeController } from '../YoutubeController';

export interface PresenterProps {
  player: {
    ref: React.RefObject<YouTube>;
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
}

export const Presenter: React.FC<PresenterProps> = (props: PresenterProps) => {
  return (
    <React.Fragment>
      <YouTube {...props.player} />
      <YoutubeController />
    </React.Fragment>
  );
};
