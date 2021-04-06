import * as React from 'react';
import YouTube from 'react-youtube';
import { YouTubePlayer } from 'youtube-player/dist/types';

export interface PresenterProps {
  player: {
    ref: React.RefObject<YouTube>;
    videoId: string;
    onPlay: ({ target, data }: { target: YouTubePlayer; data: number }) => void;
    onPause: ({ target, data }: { target: YouTubePlayer; data: number }) => void;
    onStateChange: ({ target, data }: { target: YouTubePlayer; data: number }) => void;
    onReady: (event: { target: YouTubePlayer }) => void;
  };
}

export const Presenter: React.FC<PresenterProps> = (props: PresenterProps) => {
  return (
    <React.Fragment>
      <div>youtube</div>
      <YouTube {...props.player} />
    </React.Fragment>
  );
};
