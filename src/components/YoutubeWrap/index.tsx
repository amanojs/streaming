import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { State } from '../../store/store';
import { SocketContext } from '../../App';
import YouTube from 'react-youtube';
import { YouTubePlayer } from 'youtube-player/dist/types';
import { Presenter, PresenterProps } from './Presenter';

export const YoutubeWrap: React.FC = () => {
  const [videoId, setVideoId] = React.useState<string>('b6-2P8RgT0A');
  const [youtubeDisp, setDisp] = React.useState<PresenterProps['youtubeDisp']>(undefined);
  const [videoStatus, setVideoStatus] = React.useState<number>(-1);

  const youtubeRef = React.createRef<YouTube>();
  const socket = React.useContext(SocketContext);
  const room = useSelector((state: State) => state.room);

  React.useEffect(() => {
    if (socket) {
      // socketに接続した時の処理
      if (room.roomId) {
        // roomIdがセットされているときListennerをセット
        setUpSocketListenner();
        // youtubeSync(socket);
      }
    }
  }, [socket, room.roomId, youtubeRef]);

  /* const youtubeSync = (socket: SocketIOClient.Socket): void => {
    socket.emit('youtube_sync', (res: { video_id: string; time: number }) => {
      //getPlayer()?.cueVideoByUrl(res.video_id);
      console.log(videoId);
      setVideoId(videoId);
      const playTime = res.time + 5;
      getPlayer()?.seekTo(playTime, true);
      window.setTimeout(() => {
        getPlayer()?.playVideo();
      }, 5000);
    });
  }; */

  // socket client Listennerを設定
  const setUpSocketListenner = () => {
    if (!socket) return;
    socket.on('youtube_pause', (time: number) => {
      getPlayer()?.pauseVideo();
      getPlayer()?.seekTo(time, true);
      console.log('listen!pause!', time, getPlayer());
    });

    socket.on('youtube_play', (time: number) => {
      getPlayer()?.playVideo();
      console.log('listen!play!', time, youtubeRef);
    });

    /* socket.on('request_playing_data', (participant_id: string) => {
      console.log('request_playing_data', participant_id);
      const playingData: { movie_id?: string; time: number; isPlaying: boolean } = {
        time: getPlayer()?.getCurrentTime() || 0.0,
        isPlaying: statusCheck(videoStatus)
      };
      if (videoId) {
        playingData.movie_id = videoId;
      }
      const payload = {
        socket_id: participant_id,
        playingData: playingData
      };
      socket.emit('send_playing_data', payload);
    });

    socket.on('new_playing_data', (res: any) => {
      console.log('newplayingData', res);
    }); */
  };

  const getPlayer = (): YouTubePlayer | undefined => {
    return youtubeRef.current?.getInternalPlayer();
  };

  const statusCheck = (status: number): boolean => {
    // https://developers.google.com/youtube/iframe_api_reference?hl=ja#Adding_event_listener 参照
    let isPlaying = false;
    switch (status) {
      case -1: // 未開始
        isPlaying = false;
        break;
      case 0: // 終了
        isPlaying = false;
        break;
      case 1: // 再生中
        isPlaying = true;
        break;
      case 2: // 停止
        isPlaying = false;
        break;
      case 3: // バッファリング中
        isPlaying = false;
        break;
      case 5: // 頭出し済み
        isPlaying = false;
        break;
    }
    return isPlaying;
  };

  // react-youtubeコンポーネントの設定
  const player: PresenterProps['player'] = {
    videoId: videoId,
    onPlay: ({ target, data }: { target: YouTubePlayer; data: number }) => {
      if (!socket) return;
      socket.emit('youtube_play', target.getCurrentTime());
    },
    onPause: ({ target, data }: { target: YouTubePlayer; data: number }) => {
      if (!socket) return;
      socket.emit('youtube_pause', target.getCurrentTime());
    },
    onReady: (event: { target: YouTubePlayer }) => {
      event.target.mute();
      event.target.getOptions();
      event.target.playVideo();
      setDisp(event.target);
      window.setTimeout(
        (target: YouTubePlayer) => {
          target.pauseVideo();
          target.seekTo(0, true);
          // FireFoxの場合
          const agent = window.navigator.userAgent.toLowerCase();
          if (!agent.match('firefox')) {
            event.target.unMute();
          }
        },
        500,
        event.target
      );
    },
    onStateChange: ({ target, data }: { target: YouTubePlayer; data: number }) => {
      console.log('onStateChange');
      // target.set
      console.log(data);
      setVideoStatus(data);
    },
    // https://developers.google.com/youtube/player_parameters?hl=ja ここ参照してる
    opts: {
      width: '100%',
      height: '700px',
      playerVars: {
        controls: 0,
        rel: 0,
        playsinline: 1,
        fs: 0,
        disablekb: 1,
        modestbranding: 1
      }
    }
  };

  // コントローラメソッド

  return <Presenter player={player} youtubeRef={youtubeRef} videoStatus={videoStatus} youtubeDisp={youtubeDisp} />;
};
