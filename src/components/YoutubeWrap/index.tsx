import * as React from 'react';
import { useSelector } from 'react-redux';
import { State } from '../../store/store';
import { YouTubePlayer } from 'youtube-player/dist/types';
import { Presenter } from './Presenter';
import { YouTubeProps } from 'react-youtube';
import { RoomState } from '../../store/modules/roomModule';
import Cookie from 'js-cookie';
import { PlayListItem } from '../PlayList';

interface YoutubeWrapProps {
  socket: SocketIOClient.Socket;
  room: RoomState;
  nowPlaying: PlayListItem;
  videoStatus: number;
  setVideoStatus: (status: number) => void;
}

interface YoutubeWrapState {
  youtubeDisp: YouTubePlayer | undefined;
  videoId: string;
  getAction: boolean;
  isFirst: boolean;
  volume: number;
  volumeLog: number;
  isMuted: boolean;
  opts: YouTubeProps['opts'];
}

export class YoutubeWrap extends React.Component<YoutubeWrapProps, YoutubeWrapState> {
  constructor(props: YoutubeWrapProps) {
    super(props);
    this.state = {
      youtubeDisp: undefined, // youtube target
      videoId: '',
      getAction: false,
      isFirst: true, // 参加時かどうかのフラグ
      volume: 0, // ボリューム
      volumeLog: 0, // 変更前のボリューム
      isMuted: true, // ミュートフラグ
      opts: this.defaultOpts(this.isSmartPhone()) // YouTubePlayerのオプション
    };

    this.mute = this.mute.bind(this);
    this.unMute = this.unMute.bind(this);
    this.changeVolume = this.changeVolume.bind(this);
  }

  socket = this.props.socket;
  nowPlaying = this.props.nowPlaying;

  defaultOpts = (isSmartPhone: boolean): YouTubeProps['opts'] => ({
    width: '100%',
    height: '700px',
    playerVars: {
      controls: isSmartPhone ? 0 : 1,
      rel: 0,
      playsinline: 1,
      fs: 0,
      disablekb: 1,
      modestbranding: 1
    }
  });

  componentDidUpdate(): void {
    if (this.state.youtubeDisp) {
      this.setUpSocketListenner();
    }
  }

  componentWillUnmount(): void {
    Cookie.set('streaming_volume', String(this.state.volume));
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
      // console.log('movieId', movie_id);
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
      let time = this.state.youtubeDisp.getCurrentTime();
      if (status === 0) {
        time = this.state.youtubeDisp.getDuration();
      }
      const playingData: { movie_id?: string; time: number; isPlaying: boolean } = {
        time: time || 0.0,
        isPlaying: this.statusCheck(status) ? true : false
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
      if (res.movie_id) {
        this.state.youtubeDisp.cueVideoById(res.movie_id);
        this.setState({ videoId: res.movie_id });
      }
      this.setUpBuffer(this.state.youtubeDisp).then(() => {
        if (this.state.youtubeDisp?.getDuration() === res.time) {
          this.state.youtubeDisp?.seekTo(res.time - 0.5, true);
          this.state.youtubeDisp?.playVideo();
        } else {
          if (res.isPlaying) {
            this.state.youtubeDisp?.seekTo(res.time + 1.5, true);
            this.state.youtubeDisp?.playVideo();
          } else {
            this.state.youtubeDisp?.seekTo(res.time, true);
          }
        }
        window.setTimeout(() => {
          this.setState({ isFirst: false });
        }, 500);
      });
    });
  };

  /** ステータスナンバーから再生中か停止中かを返す */
  statusCheck = (value: number): boolean => {
    // https://developers.google.com/youtube/iframe_api_reference?hl=ja#Adding_event_listener 参照
    console.log('status', value);
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
    console.log('isPlaying', isPlaying);
    return isPlaying;
  };

  /** スマートフォンからのアクセスかどうかの判定 */
  isSmartPhone = (): boolean => {
    if (navigator.userAgent.match(/iPhone|Android.+Mobile/)) {
      return true;
    } else {
      return false;
    }
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
      const agent = navigator.userAgent.toLowerCase();

      // スマホかどうか
      if (this.isSmartPhone()) {
        // スマホの場合
        this.mute();

        if (this.props.room.isOwner) {
          this.changeVideo(target, this.nowPlaying.videoId);
        } else {
          this.socket.emit('youtube_sync');
        }
      } else {
        // それ以外の場合
        let defaultVolume = 0;

        // デフォルトボリュームの取得
        if (agent.match('chrome') && !agent.match('edg')) {
          defaultVolume = target.getVolume();
        } else {
          const cookieVolume = Cookie.get('streaming_volume');
          if (cookieVolume) {
            defaultVolume = Number(cookieVolume);
          } else {
            defaultVolume = 20;
          }
        }

        /**  コントローラのが表示されているかどうか */
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
                    this.changeVideo(target, this.nowPlaying.videoId);
                  }
                } else {
                  this.socket.emit('youtube_sync');
                }
              }
            );
          }
        );
      }
    },
    onStateChange: ({ target, data }: { target: YouTubePlayer; data: number }) => {
      // console.log('onStateChange', data);
      this.props.setVideoStatus(data);
    },
    // https://developers.google.com/youtube/player_parameters?hl=ja ここ参照してる
    onEnd: ({ target }) => {
      this.socket.emit('next_video');
    }
  };

  /** 動画を変更して setUpBuffer を呼び出す関数 */
  changeVideo = (target: YouTubePlayer, videoId: string): void => {
    target.cueVideoById(videoId);
    this.setState({ videoId }, () => {
      this.setUpBuffer(target).then(() => {
        // console.log('Buffer完了');
        this.setState({ isFirst: false });
      });
    });
  };

  /** ミュート状態で1秒間再生し、元に戻して一時停止する初期バッファーを読み込むための関数です */
  setUpBuffer = (target: YouTubePlayer): Promise<boolean> => {
    return new Promise((resolve) => {
      this.mute();
      target.playVideo();
      window.setTimeout(() => {
        target.pauseVideo();
        target.seekTo(0, true);
        if (!this.isSmartPhone()) {
          this.unMute();
        }
        resolve(true);
      }, 1000);
    });
  };

  /** ボリュームを変更する */
  changeVolume = (value: number): void => {
    this.state.youtubeDisp?.setVolume(value);
    this.setState({ volume: value });
  };

  /** ボリュームログを変更する */
  setVolumeLog = (value: number): void => {
    if (value > 5 && value <= 100) {
      this.setState({ volumeLog: value });
    }
  };

  /** ミュート時の処理 */
  mute = (): void => {
    this.setState({ isMuted: true }, () => {
      this.setState((prev) => {
        if (prev.volume > 5) {
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

  /** ボリュームバー操作時のミュート処理 */
  unMuteForVolumeBar = (): void => {
    this.setState({ isMuted: false });
    this.state.youtubeDisp?.unMute();
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
            videoStatus: this.props.videoStatus,
            volume: this.state.volume,
            isMuted: this.state.isMuted,
            mute: this.mute,
            unMute: this.unMute,
            unMuteForVolumeBar: this.unMuteForVolumeBar,
            changeVolume: this.changeVolume,
            setVolumeLog: this.setVolumeLog
          }}
        />
      </React.Fragment>
    );
  }
}
