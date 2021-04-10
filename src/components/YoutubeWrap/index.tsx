import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { State } from '../../store/store';
import { YouTubePlayer } from 'youtube-player/dist/types';
import { Presenter, PresenterProps } from './Presenter';

interface YoutubeWrapProps {
  socket: SocketIOClient.Socket;
}

export const YoutubeWrap: React.FC<YoutubeWrapProps> = (props: YoutubeWrapProps) => {
  const [videoId, setVideoId] = React.useState<string>('');
  const socket = props.socket;
  const [youtubeDisp, setDisp] = React.useState<PresenterProps['youtubeDisp']>(undefined); // youtube target
  const [videoStatus, setVideoStatus] = React.useState<number>(-1); // YouTubeコンポーネントのステータスが変更された時に変更される
  const [candidateId, setCandidate] = React.useState<string>(''); // 動画URL入力フォームの値
  const [isFirst, setIsFirst] = React.useState<boolean>(true); // 参加時かどうかのフラグ
  const room = useSelector((state: State) => state.room);

  React.useEffect(() => {
    setUpSocketListenner();
  }, [youtubeDisp]);

  // socket client Listennerを設定
  const setUpSocketListenner = () => {
    if (!youtubeDisp) return;
    const events = ['youtube_pause', 'youtube_play', 'youtube_seek', 'request_playing_data', 'new_playing_data'];
    for (const event of events) {
      socket.off(event);
    }
    socket.on('youtube_pause', (time: number) => {
      youtubeDisp?.pauseVideo();
      youtubeDisp?.seekTo(time, true);
      //console.log('listen!pause!', time, youtubeDisp);
    });

    socket.on('youtube_play', (time: number) => {
      youtubeDisp?.playVideo();
      // console.log('listen!play!', time, youtubeDisp);
    });

    socket.on('youtube_seek', (time: number) => {
      youtubeDisp?.seekTo(time, true);
    });

    socket.on('request_playing_data', async (participant_id: string) => {
      const status = youtubeDisp?.getPlayerState();
      const time = youtubeDisp?.getCurrentTime();
      const playingData: { movie_id?: string; time: number; isPlaying: boolean } = {
        time: time || 0.0,
        isPlaying: status ? statusCheck(status) : false
      };
      // console.log('プレイングデータをemitします', playingData);
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
      if (res.isPlaying) {
        youtubeDisp.seekTo(res.time + 0.2, true);
        youtubeDisp.playVideo();
      } else {
        youtubeDisp.seekTo(res.time, true);
      }
    });
  };

  // ステータスナンバーから再生中か停止中かを返す
  const statusCheck = (value: number): boolean => {
    // https://developers.google.com/youtube/iframe_api_reference?hl=ja#Adding_event_listener 参照
    let isPlaying = false;
    switch (value) {
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
      if (!socket || isFirst) return;
      socket.emit('youtube_play', target.getCurrentTime());
    },
    onPause: ({ target, data }: { target: YouTubePlayer; data: number }) => {
      if (!socket || isFirst) return;
      socket.emit('youtube_pause', target.getCurrentTime());
    },
    onReady: (event: { target: YouTubePlayer }) => {
      const { target } = event;
      target.mute();
      target.getOptions();
      setDisp(target);
      target.cueVideoById('b6-2P8RgT0A');
      target.playVideo();
      window.setTimeout(() => {
        target.pauseVideo();
        target.seekTo(0, true);
        target.unMute();
        if (!room.isOwner) {
          socket.emit('youtube_sync');
        }
        window.setTimeout(() => {
          setIsFirst(false);
        }, 500);
      }, 1000);
    },
    onStateChange: ({ target, data }: { target: YouTubePlayer; data: number }) => {
      // console.log('onStateChange', data);
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
      <Presenter socket={socket} player={player} videoStatus={videoStatus} youtubeDisp={youtubeDisp} />
    </React.Fragment>
  );
};
