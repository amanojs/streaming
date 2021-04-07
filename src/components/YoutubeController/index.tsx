import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { State } from '../../store/store';
import { Presenter } from './Presenter';
import { SocketContext } from '../../App';
import YouTube from 'react-youtube';
import { YouTubePlayer } from 'youtube-player/dist/types';
//import { PresenterProps } from './Presenter';

export interface YoutubeControllerProps {
  youtubeDisp: YouTubePlayer | undefined;
  videoStatus: number;
}

export const YoutubeController: React.FC<YoutubeControllerProps> = (props: YoutubeControllerProps) => {
  const [timed, setTimed] = React.useState<number>(0);
  const [duration, setDuration] = React.useState<number>(0);
  const [statusIcon, setStatusIcon] = React.useState<'play' | 'pause'>('pause');
  let checkTimer: NodeJS.Timeout | null = null;

  React.useEffect(() => {
    if (props.youtubeDisp) {
      setDuration(props.youtubeDisp.getDuration());
      checkTimer = setInterval(
        (props) => {
          setTimed(props.youtubeDisp.getCurrentTime());
        },
        50,
        props
      );
    }
    return () => {
      if (checkTimer) {
        clearInterval(checkTimer);
      }
    };
  }, [props.youtubeDisp]);

  React.useEffect(() => {
    if (props.youtubeDisp) {
      setDuration(props.youtubeDisp?.getDuration());
    }
    statusCheck(props.videoStatus);
  }, [props.videoStatus]);

  const sliderOnChange = (changedtime: MouseEvent, value: number | number[]) => {
    if (props.youtubeDisp) {
      props.youtubeDisp.seekTo(Number(value), true);
      setTimed(Number(value));
    }
  };

  const valueLabelFormat = (value: number): string => {
    const floorValue = Math.floor(value);
    const timeH = Math.floor((floorValue % (24 * 60 * 60)) / (60 * 60));
    const timeM = Math.floor(((floorValue % (24 * 60 * 60)) % (60 * 60)) / 60);
    const timeS = ((floorValue % (24 * 60 * 60)) % (60 * 60)) % 60;
    if (timeH === 0) {
      return String(timeM).padStart(2, '0') + ':' + String(timeS).padStart(2, '0');
    } else {
      return (
        String(timeH).padStart(2, '0') + ':' + String(timeM).padStart(2, '0') + ':' + String(timeS).padStart(2, '0')
      );
    }
  };

  const statusCheck = (status: number) => {
    // https://developers.google.com/youtube/iframe_api_reference?hl=ja#Adding_event_listener 参照
    switch (status) {
      case -1: // 未開始
        setStatusIcon('play');
        break;
      case 0: // 終了
        setStatusIcon('play');
        break;
      case 1: // 再生中
        setStatusIcon('pause');
        break;
      case 2: // 停止
        setStatusIcon('play');
        break;
      case 3: // バッファリング中
        setStatusIcon('play');
        break;
      case 5: // 頭出し済み
        setStatusIcon('play');
        break;
    }
  };

  const playOrPause = () => {
    if (statusIcon === 'play') {
      props.youtubeDisp?.playVideo();
    } else {
      props.youtubeDisp?.pauseVideo();
    }
  };

  return (
    <Presenter
      statusIcon={statusIcon}
      timed={timed}
      sliderOnChange={sliderOnChange}
      duratioin={duration}
      valueLabelFormat={valueLabelFormat}
      playOrPause={playOrPause}
    />
  );
};
