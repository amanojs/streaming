import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { State } from '../../store/store';
import { Presenter } from './Presenter';
import { SocketContext } from '../../App';
import YouTube from 'react-youtube';
import { YouTubePlayer } from 'youtube-player/dist/types';
//import { PresenterProps } from './Presenter';

export const YoutubeController: React.FC = () => {
  return <Presenter />;
};
