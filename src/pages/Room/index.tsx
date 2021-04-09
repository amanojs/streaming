import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { VariantType, useSnackbar } from 'notistack';
import roomModule from '../../store/modules/roomModule';
import { State } from '../../store/store';
import { Presenter } from './Presenter';
import { PageProps } from '../../App';
import './main.css';

const Room: React.FC<PageProps> = (props: PageProps) => {
  const [socket, setSocket] = React.useState<SocketIOClient.Socket | null>(null);
  const [mount, mountKeeper] = React.useState(null);

  const room = useSelector((state: State) => state.room);
  const history = useHistory();
  const dispach = useDispatch();

  const { enqueueSnackbar } = useSnackbar();

  React.useEffect(() => {
    props.getSocket().then((rec_socket) => {
      setSocket(rec_socket);
      // 後でここにルーム存在確認処理を追加
      // ルーム作成ではない場合
      if (!room.roomId) {
        // パラメータからroom_idを取得
        const roomId = getParamValue('room_id');
        if (roomId) {
          // ルーム入出処理
          // 後でユーザネーム登録処理と一緒に切り離す
          joinRoom(rec_socket, { roomId });
        }
      }
    });
    return () => {
      props.clearSocket();
    };
  }, [mountKeeper]);

  React.useEffect(() => {
    if (!socket) return;
    socket.on('user_joined', (user: { id: string; name: string }) => {
      sendNotifiction(user.name + 'が入出しました', 'success');
    });
    socket.on('user_left', (user: { id: string; name: string }) => {
      sendNotifiction(user.name + 'が退出しました', 'error');
    });
  }, [socket]);

  const joinRoom = (socket_rec: SocketIOClient.Socket, option: { roomId: string }) => {
    if (!socket_rec) return console.log('room :', 'socketがnullだよ', socket_rec);
    socket_rec.emit('join_room', { room_id: option.roomId, user_name: 'guest' }, (res: boolean) => {
      console.log('入出', res);
      if (res) {
        dispach(roomModule.actions.setRoom({ roomId: option.roomId, isOwner: false }));
      } /*  else {
        alert('入出に失敗しました');
        history.push('/');
      } */
    });
  };

  const getParamValue = (key: string): string | null => {
    const params = new URLSearchParams(window.location.search);
    const value = params.get(key);
    return value;
  };

  const sendNotifiction = (message: string, variant: VariantType) => {
    if (screen.width < 600) return;
    enqueueSnackbar(message, {
      variant,
      anchorOrigin: { horizontal: 'center', vertical: 'top' },
      autoHideDuration: 2000
    });
  };

  return <Presenter socket={socket} />;
};

export default Room;
