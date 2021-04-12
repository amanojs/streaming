import * as React from 'react';
import { useSelector } from 'react-redux';
import { State } from '../../store/store';
import { YouTubePlayer } from 'youtube-player/dist/types';
import { Presenter } from './Presenter';
import { YouTubeProps } from 'react-youtube';
import { RoomState } from '../../store/modules/roomModule';

interface YoutubeWrapProps {
  socket: SocketIOClient.Socket;
  room: RoomState;
}

interface YoutubeWrapState {
  youtubeDisp: YouTubePlayer | undefined;
  videoId: string;
  videoStatus: number;
  getAction: boolean;
  isFirst: boolean;
  volume: number;
  volumeLog: number;
  isMuted: boolean;
  opts: YouTubeProps['opts'];
}

const defaultOpts: YouTubeProps['opts'] = {
  width: '100%',
  height: '700px',
  playerVars: {
    controls: 1,
    rel: 0,
    playsinline: 1,
    fs: 0,
    disablekb: 1,
    modestbranding: 1
  }
};

export class YoutubeWrap extends React.Component<YoutubeWrapProps, YoutubeWrapState> {
  constructor(props: YoutubeWrapProps) {
    super(props);
    this.state = {
      youtubeDisp: undefined, // youtube target
      videoId: '',
      videoStatus: -1, // YouTubeコンポーネントのステータスが変更された時に変更される
      getAction: false,
      isFirst: true, // 参加時かどうかのフラグ
      volume: 0, // ボリューム
      volumeLog: 0, // 変更前のボリューム
      isMuted: true, // ミュートフラグ
      opts: defaultOpts // YouTubePlayerのオプション
    };

    this.mute = this.mute.bind(this);
    this.unMute = this.unMute.bind(this);
    this.changeVolume = this.changeVolume.bind(this);
  }

  socket = this.props.socket;

  componentDidUpdate(): void {
    if (this.state.youtubeDisp) {
      this.setUpSocketListenner();
    }
  }

  /** socket client Listennerを設定 */
  setUpSocketListenner = (): void => {
    const listenners = [
      'youtube_add_movie',
      'youtube_pause',
      'youtube_play',
      'youtube_seek',
      'request_playing_data',
      'new_playing_data'
    ];
    for (const listenner of listenners) {
      this.socket.off(listenner);
    }

    this.socket.on('youtube_add_movie', (movie_id: string) => {
      if (!this.state.youtubeDisp) return;
      console.log('movieId', movie_id);
      this.setState({ videoId: movie_id });
      this.state.youtubeDisp.cueVideoById(movie_id);
      this.setUpBuffer(this.state.youtubeDisp).then(() => {
        this.state.youtubeDisp?.playVideo();
      });
    });

    this.socket.on('youtube_pause', (time: number) => {
      if (!this.state.youtubeDisp) return;
      // console.log('listen!pause!', time);
      this.setState({ getAction: true }, () => {
        this.state.youtubeDisp?.pauseVideo();
        this.state.youtubeDisp?.seekTo(time, true);
      });
    });

    this.socket.on('youtube_play', (time: number) => {
      if (!this.state.youtubeDisp) return;
      // console.log('listen!play!', time);
      this.setState({ getAction: true }, () => {
        this.state.youtubeDisp?.playVideo();
      });
    });

    this.socket.on('youtube_seek', (time: number) => {
      if (!this.state.youtubeDisp) return;
      this.state.youtubeDisp.seekTo(time, true);
    });

    this.socket.on('request_playing_data', async (participant_id: string) => {
      if (!this.state.youtubeDisp) return;
      const status = this.state.youtubeDisp.getPlayerState();
      const time = this.state.youtubeDisp.getCurrentTime();
      const playingData: { movie_id?: string; time: number; isPlaying: boolean } = {
        time: time || 0.0,
        isPlaying: status ? this.statusCheck(status) : false
      };
      // console.log('プレイングデータをemitします', playingData);
      if (this.state.videoId) {
        playingData.movie_id = this.state.videoId;
      }
      const payload = {
        socket_id: participant_id,
        playingData: playingData
      };
      this.socket.emit('send_playing_data', payload);
    });

    this.socket.on('new_playing_data', (res: { movie_id?: string; time: number; isPlaying: boolean }) => {
      if (!this.state.youtubeDisp) return;
      console.log('newplayingData', res);
      if (res.movie_id) {
        this.state.youtubeDisp.cueVideoById(res.movie_id);
        this.setState({ videoId: res.movie_id });
      }
      this.setUpBuffer(this.state.youtubeDisp).then(() => {
        if (res.isPlaying) {
          this.state.youtubeDisp?.seekTo(res.time + 1.5, true);
          this.state.youtubeDisp?.playVideo();
        } else {
          this.state.youtubeDisp?.seekTo(res.time, true);
        }
      });
    });
  };

  /** ステータスナンバーから再生中か停止中かを返す */
  statusCheck = (value: number): boolean => {
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

  /** react-youtubeコンポーネントの設定 */
  player: YouTubeProps = {
    onPlay: ({ target, data }: { target: YouTubePlayer; data: number }) => {
      if (this.state.isFirst) return;
      if (this.state.getAction) {
        this.setState({ getAction: false });
        return;
      }
      this.socket.emit('youtube_play', target.getCurrentTime());
    },
    onPause: ({ target, data }: { target: YouTubePlayer; data: number }) => {
      if (this.state.isFirst) return;
      if (this.state.getAction) {
        this.setState({ getAction: false });
        return;
      }
      this.socket.emit('youtube_pause', target.getCurrentTime());
    },
    onReady: (event: { target: YouTubePlayer }) => {
      const { target } = event;
      this.setState({ youtubeDisp: target });
      // ボリューム情報のセット
      const defaultVolume = target.getVolume();
      let prev_flag: number | undefined = 0;
      this.setState(
        (prev) => {
          // コントローラ表示時のみボリュームログに保存
          prev_flag = prev.opts?.playerVars?.controls;
          if (prev.opts?.playerVars?.controls === 1) {
            return { ...prev, volumeLog: defaultVolume };
          } else {
            return { ...prev };
          }
        },
        () => {
          // コントローラを非表示にする
          this.setState(
            (prev) => ({
              opts: {
                ...prev.opts,
                playerVars: {
                  ...prev.opts?.playerVars,
                  controls: 0
                }
              }
            }),
            () => {
              target.setVolume(0);
              if (this.props.room.isOwner) {
                if (prev_flag === 0) {
                  target.cueVideoById('b6-2P8RgT0A');
                  this.setState({ videoId: 'b6-2P8RgT0A' }, () => {
                    this.setUpBuffer(target).then(() => {
                      console.log('Buffer完了');
                    });
                  });
                }
              } else {
                this.socket.emit('youtube_sync');
              }
              window.setTimeout(() => {
                this.setState({ isFirst: false });
              }, 2000);
            }
          );
        }
      );
    },
    onStateChange: ({ target, data }: { target: YouTubePlayer; data: number }) => {
      // console.log('onStateChange', data);
      this.setState({ videoStatus: data });
    }
    // https://developers.google.com/youtube/player_parameters?hl=ja ここ参照してる
  };

  /** ミュート状態で1秒間再生し、元に戻して一時停止する初期バッファーを読み込むための関数です */
  setUpBuffer = (target: YouTubePlayer): Promise<boolean> => {
    return new Promise((resolve) => {
      this.mute();
      target.playVideo();
      window.setTimeout(() => {
        target.pauseVideo();
        target.seekTo(0, true);
        this.unMute();
        resolve(true);
      }, 1000);
    });
  };

  /** ボリュームを変更する */
  changeVolume = (value: number): void => {
    this.state.youtubeDisp?.setVolume(value);
    this.setState({ volume: value });
  };

  /** ミュート時の処理 */
  mute = (): void => {
    this.setState({ isMuted: true }, () => {
      this.setState((prev) => {
        if (prev.volume > 0) {
          return { volumeLog: this.state.volume };
        } else {
          return { ...prev };
        }
      });
      this.changeVolume(0);
      this.state.youtubeDisp?.mute();
    });
  };

  /** アンミュート時の処理 */
  unMute = (): void => {
    this.setState({ isMuted: false });
    this.state.youtubeDisp?.unMute();
    this.state.volumeLog > 1 ? this.changeVolume(this.state.volumeLog) : this.changeVolume(30);
  };

  render(): JSX.Element {
    return (
      <React.Fragment>
        <Presenter
          player={this.player}
          opts={this.state.opts}
          videoId={this.state.videoId}
          controller={{
            socket: this.socket,
            youtubeDisp: this.state.youtubeDisp,
            videoStatus: this.state.videoStatus,
            volume: this.state.volume,
            isMuted: this.state.isMuted,
            mute: this.mute,
            unMute: this.unMute,
            changeVolume: this.changeVolume
          }}
        />
      </React.Fragment>
    );
  }
}
