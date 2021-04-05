import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import roomModule from '../../store/modules/roomModule';
import { State } from '../../store/store';
import { Presenter } from './Presenter';
import { PageProps } from '../../App';

const Room: React.FC<PageProps> = (props: PageProps) => {
  const [mount, mountKeeper] = React.useState(null);
  const room = useSelector((state: State) => state.room);
  const history = useHistory();
  const dispach = useDispatch();
  console.log(room);

  React.useEffect(() => {
    props.getSocket().then((socket) => {
      // 後でここにルーム存在確認処理を追加
      // ルーム作成ではない場合
      if (!room.roomId) {
        // パラメータからroom_idを取得
        const roomId = getParamValue('room_id');
        if (roomId) {
          // ルーム入出処理
          // 後でユーザネーム登録処理と一緒に切り離す
          joinRoom(socket, { roomId });
        }
      } else {
        setUpSocketListenner(socket);
      }
    });
    return () => {
      props.clearSocket();
    };
  }, [mountKeeper]);

  const joinRoom = (socket: SocketIOClient.Socket, option: { roomId: string }) => {
    socket.emit('join_room', option.roomId, (res: boolean) => {
      console.log('入出', res);
      if (res) {
        dispach(roomModule.actions.setRoom({ roomId: option.roomId }));
        setUpSocketListenner(socket);
      } /*  else {
        alert('入出に失敗しました');
        history.push('/');
      } */
    });
  };

  const setUpSocketListenner = (socket: SocketIOClient.Socket) => {
    socket.on('youtube_pause', (timer: number) => {
      console.log('listen!pause!', timer);
    });

    socket.on('youtube_play', (time: number) => {
      console.log(time);
    });
  };

  const getParamValue = (key: string): string | null => {
    const params = new URLSearchParams(window.location.search);
    const value = params.get(key);
    return value;
  };

  return <Presenter />;
};

export default Room;
