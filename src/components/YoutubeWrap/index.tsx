import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { State } from '../../store/store';
import { SocketContext } from '../../App';
import YouTube from 'react-youtube';
import { YouTubePlayer } from 'youtube-player/dist/types';
import { Presenter, PresenterProps } from './Presenter';

export const YoutubeWrap: React.FC = () => {
  const [videoId, setVideoId] = React.useState<string>('');
  const [youtubeDisp, setDisp] = React.useState<PresenterProps['youtubeDisp']>(undefined);
  const [videoStatus, setVideoStatus] = React.useState<number>(-1);
  const [playingData, setPlayingData] = React.useState<{ movie_id?: string; time: number; isPlaying: boolean }>({
    time: 0,
    isPlaying: false
  });
  const [candidateId, setCandidate] = React.useState<string>('');

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

  // socket client Listennerを設定
  const setUpSocketListenner = () => {
    if (!socket) return;
    const events = ['youtube_pause', 'youtube_play', 'youtube_seek', 'request_playing_data', 'new_playing_data'];
    for (const event of events) {
      socket.off(event);
    }
    socket.on('youtube_pause', (time: number) => {
      getPlayer()?.pauseVideo();
      getPlayer()?.seekTo(time, true);
      console.log('listen!pause!', time, getPlayer());
    });

    socket.on('youtube_play', (time: number) => {
      getPlayer()?.playVideo();
      console.log('listen!play!', time, youtubeRef);
    });

    socket.on('youtube_seek', (time: number) => {
      getPlayer()?.seekTo(time, true);
    });

    socket.on('request_playing_data', async (participant_id: string) => {
      const time = await getPlayer()?.getCurrentTime();
      const playingData: { movie_id?: string; time: number; isPlaying: boolean } = {
        time: time || 0.0,
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

    socket.on('new_playing_data', (res: { movie_id?: string; time: number; isPlaying: boolean }) => {
      console.log('newplayingData', res);
      if (res.movie_id) {
        setVideoId(res.movie_id);
      }
      setPlayingData(res);
    });
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
      setDisp(event.target);
      event.target.cueVideoById('b6-2P8RgT0A');
      event.target.playVideo();
      window.setTimeout(
        (target: YouTubePlayer) => {
          event.target.seekTo(playingData.time, true);
          if (playingData.isPlaying) {
            event.target.playVideo();
          } else {
            event.target.pauseVideo();
          }
        },
        500,
        event.target
      );
      // FireFoxの場合
      const agent = window.navigator.userAgent.toLowerCase();
      if (!agent.match('firefox')) {
        event.target.unMute();
      }
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

  const handler = () => {
    youtubeDisp?.loadVideoById(candidateId);
  };

  return (
    <React.Fragment>
      <input type="text" value={candidateId} onChange={(e) => setCandidate(e.target.value)} />
      <button onClick={() => handler()}>変更</button>
      <Presenter player={player} youtubeRef={youtubeRef} videoStatus={videoStatus} youtubeDisp={youtubeDisp} />
    </React.Fragment>
  );
};
