import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { VariantType, useSnackbar } from 'notistack';
import roomModule from '../../store/modules/roomModule';
import { State } from '../../store/store';
import { Presenter } from './Presenter';
import { PageProps } from '../../App';
import { InputSub } from '../../components/CreateForm';

const Room: React.FC<PageProps> = (props: PageProps) => {
  const [socket, setSocket] = React.useState<SocketIOClient.Socket | null>(null);
  const [nameDialog, setNameDialog] = React.useState<boolean>(false);
  const [enterId, setEnterId] = React.useState<string>('');
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
          setEnterId(roomId);
          setNameDialog(true);
        }
      }
    });
    return () => {
      props.clearSocket();
    };
  }, []);

  React.useEffect(() => {
    if (!socket) return;
    socket.on('user_joined', (user: { id: string; name: string }) => {
      sendNotifiction(user.name + 'が入出しました', 'success');
    });
    socket.on('user_left', (user: { id: string; name: string }) => {
      sendNotifiction(user.name + 'が退出しました', 'error');
    });
  }, [socket]);

  const joinRoom = (socket: SocketIOClient.Socket, option: { roomId: string }) => {
    if (!socket) return console.log('room :', 'socketがnullだよ', socket);
    socket.emit('join_room', { room_id: option.roomId, user_name: userName.value }, (res: boolean) => {
      console.log('入出', res);
      if (res) {
        dispach(roomModule.actions.setRoom({ roomId: option.roomId, userName: userName.value, isOwner: false }));
        setNameDialog(false);
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

  // ユーザネーム入力に参照するstate
  const [userName, setUserName] = React.useState({
    value: 'Guest',
    error: false,
    msg: ''
  });

  const inputs: InputSub[] = [
    {
      label: '',
      placeholder: '須鳥武 太郎',
      value: userName.value,
      error: userName.error,
      msg: userName.msg,
      onChange: function (e) {
        const { error, msg } = this.validate(e.target.value);
        this.setter({ value: e.target.value, error, msg });
      },
      validate: (val) => {
        const response = { error: false, msg: '' };
        if (val === '') {
          response.error = true;
          response.msg = 'ユーザネームを入力してください';
        } else if (val.length > 13) {
          response.error = true;
          response.msg = '12文字以内で入力してください';
        }
        return response;
      },
      setter: setUserName
    }
  ];

  const enterSubmitHandler = () => {
    if (!socket) return;
    console.log('enterSubmitHandler', socket, enterId);
    joinRoom(socket, { roomId: enterId });
  };

  return (
    <Presenter
      socket={socket}
      roomId={room.roomId}
      nameDialog={nameDialog}
      createForm={{ inputs, onSubmit: enterSubmitHandler }}
    />
  );
};

export default Room;
