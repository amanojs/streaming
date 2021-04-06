import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { State } from '../../store/store';
import { SocketContext } from '../../App';
import YouTube from 'react-youtube';
import { YouTubePlayer } from 'youtube-player/dist/types';
import { Presenter, PresenterProps } from './Presenter';

export const YoutubeWrap: React.FC = () => {
  const [videoId, setVideoId] = React.useState<string>('b6-2P8RgT0A');
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
  }, [socket, room.roomId]);

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
  };

  const getPlayer = (): YouTubePlayer | undefined => {
    return youtubeRef.current?.getInternalPlayer();
  };

  // react-youtubeコンポーネントの設定
  const player: PresenterProps['player'] = {
    ref: youtubeRef,
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
      console.log(target.getCurrentTime());
      // target.set
      console.log(data);
    },
    opts: {
      playerVars: {
        controls: 0,
        rel: 0,
        playsinline: 1
      }
    }
  };

  return <Presenter player={player} />;
};
