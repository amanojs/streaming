import * as React from 'react';
import axios from 'axios';
import { Presenter } from './Presenter';
import './main.css';

interface PlayingBoardProps {
  videoId: string;
}

export const PlayingBoard: React.FC<PlayingBoardProps> = (props: PlayingBoardProps) => {
  const [title, setTitle] = React.useState('');
  const APIKEY: string = process.env.REACT_APP_YOUTUBE_KEY as string;
  React.useEffect(() => {
    if (!props.videoId) return;
    getTitle();
  }, [props.videoId]);
  const getTitle = () => {
    /* axios
      .get(`https://www.googleapis.com/youtube/v3/search?key=${APIKEY}&part=id,snippet`, {
        params: { q: props.videoId }
      })
      .then(({ data, status }) => {
        if (status === 200) {
          // console.log('title data', data);
          try {
            const title = data.items[0].snippet.title;
            setTitle(title);
          } catch {
            setTitle('動画タイトルを取得できませんでした');
          }
        }
      }); */
  };
  return <Presenter title={title} />;
};
