import * as React from 'react';
import { Presenter } from './Presenter';
import { YouTubePlayer } from 'youtube-player/dist/types';
//import { PresenterProps } from './Presenter';

export interface YoutubeControllerProps {
  socket: SocketIOClient.Socket;
  youtubeDisp: YouTubePlayer | undefined;
  videoStatus: number;
  volume: number;
  isMuted: boolean;
  mute: () => void;
  unMute: () => void;
  unMuteForVolumeBar: () => void;
  changeVolume: (num: number) => void;
  setVolumeLog: (num: number) => void;
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
          const currentTime = props.youtubeDisp.getCurrentTime();
          setTimed(currentTime);
        },
        150,
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
      const duration = props.youtubeDisp.getDuration();
      setDuration(duration);
    }
    statusCheck(props.videoStatus);
    /* return () => {
      window.removeEventListener('keypress', shortcut);
    }; */
  }, [props.videoStatus]);

  React.useEffect(() => {
    window.onkeypress = null;
    window.onkeypress = shortcut;
  }, [statusIcon]);

  const shortcut = function (e: KeyboardEvent): void {
    console.log(e.key);
    switch (e.key) {
      case ' ':
        playOrPause();
        break;
    }
  };

  /** 再生バー処理 */
  const sliderOnChange = (changedtime: MouseEvent, value: number | number[]) => {
    if (props.youtubeDisp) {
      props.socket.emit('youtube_seek', value);
      props.youtubeDisp.seekTo(Number(value), true);
      setTimed(Number(value));
    }
  };

  /** 引数の秒数分動画をスキップする */
  const fastTimed = (value: number) => {
    if (props.youtubeDisp) {
      let targetTime = timed + value;
      if (duration <= targetTime) {
        targetTime = duration - 0.2;
        setTimed(targetTime);
        props.youtubeDisp.pauseVideo();
        window.setTimeout(() => {
          props.youtubeDisp?.playVideo();
        }, 200);
      }
      props.youtubeDisp.seekTo(targetTime, true);
      props.socket.emit('youtube_seek', targetTime);
    }
  };

  /** 少数で渡された秒数を hh:mm:ss のフォーマットで返す */
  const valueLabelFormat = (value: number): string => {
    if (!value) {
      return '00:00';
    }
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

  /** 動画再生状況をセット */
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

  /** 再生、停止ボタンクリック処理 */
  const playOrPause = () => {
    if (statusIcon === 'play') {
      console.log('playします');
      props.youtubeDisp?.playVideo();
    } else {
      console.log('pauseします');
      props.youtubeDisp?.pauseVideo();
    }
  };

  /** ミュート状態の切り替え */
  const volumeOnClick = () => {
    props.isMuted ? props.unMute() : props.mute();
  };

  /** ボリューム変更処理 */
  const volumeSliderOnChange = (e: React.ChangeEvent, value: number | number[]) => {
    const num = Number(value);

    switch (e.type) {
      case 'mousemove':
        break;
      case 'mousedown':
        // クリック時の処理
        if (num > 5) {
          props.setVolumeLog(num);
        }
        break;
      default:
      // デフォルト処理
    }

    // ボリュームを変更
    props.changeVolume(num);
    // ボリュームの値を参照しミュート状態を切り替え
    num < 1 ? props.mute() : props.isMuted ? props.unMuteForVolumeBar() : false;
  };

  return (
    <Presenter
      statusIcon={statusIcon}
      timed={timed}
      sliderOnChange={sliderOnChange}
      fastTimed={fastTimed}
      duratioin={duration}
      valueLabelFormat={valueLabelFormat}
      playOrPause={playOrPause}
      volume={props.volume}
      volumeOnClick={volumeOnClick}
      volumeSliderOnChange={volumeSliderOnChange}
      isMute={props.isMuted}
    />
  );
};
