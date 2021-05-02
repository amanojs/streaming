import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { VariantType, useSnackbar } from 'notistack';
import appModule from '../../store/modules/appModule';
import roomModule, { User } from '../../store/modules/roomModule';
import { State } from '../../store/store';
import { Presenter } from './Presenter';
import { PageProps } from '../../App';
import { InputSub } from '../../components/CreateForm';
import Cookie from 'js-cookie';
import { ChatItem } from '../../components/Chat';
import { PlayListItem } from '../../components/PlayList';

interface JoinRoomRes {
  result: boolean;
  userList?: User[];
}

const Room: React.FC<PageProps> = (props: PageProps) => {
  const [socket, setSocket] = React.useState<SocketIOClient.Socket | null>(null);
  const [nameDialog, setNameDialog] = React.useState<boolean>(false);
  const [enterId, setEnterId] = React.useState<string>('');
  const [load, setLoad] = React.useState<boolean>(false);
  const [chatList, setChatList] = React.useState<ChatItem[]>([]);
  const [nowPlaying, setNowPlaying] = React.useState<PlayListItem>({
    videoId: '5fooxt19UvA',
    thumbnail: 'http://img.youtube.com/vi/5fooxt19UvA/mqdefault.jpg',
    title: '猫が初めてのチュールタワーに興奮しすぎてこうなったwww',
    requester: 'amanojs'
  });
  const [playList, setPlayList] = React.useState<PlayListItem[]>([
    {
      videoId: 'qOqPBTU6s6g',
      thumbnail: 'http://img.youtube.com/vi/qOqPBTU6s6g/mqdefault.jpg',
      title: 'リモート面接中にヒゲ剃る奴',
      requester: 'eiyuu'
    },
    {
      videoId: '5fooxt19UvA',
      thumbnail: 'http://img.youtube.com/vi/5fooxt19UvA/mqdefault.jpg',
      title: '猫が初めてのチュールタワーに興奮しすぎてこうなったwww',
      requester: 'amanojs'
    },
    {
      videoId: 'SLCat_OT7FM',
      thumbnail: 'http://img.youtube.com/vi/SLCat_OT7FM/mqdefault.jpg',
      title: 'GWスタート記念豚牛貝ソロバーベキューをキメるだけの動画',
      requester: 'kenji'
    }
  ]);
  const room = useSelector((state: State) => state.room);
  const history = useHistory();
  const dispatch = useDispatch();
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
          rec_socket.emit('check_room', roomId, (res: boolean) => {
            if (res) {
              // Cookie存在時ユーザネームセット処理
              const cookieName = Cookie.get('streaming_name');
              if (cookieName) {
                setUserName({ value: cookieName, error: false, msg: '' });
              }
              // ルーム入室処理
              setEnterId(roomId);
              setNameDialog(true);
            } else {
              sendNotifiction('ルームが存在しませんでした', 'error', { horizontal: 'center', vertical: 'top' });
              history.push('/');
            }
          });
        } else {
          sendNotifiction('ルームが存在しませんでした', 'error', { horizontal: 'center', vertical: 'top' });
          history.push('/');
        }
      } else {
        dispatch(appModule.actions.setHeader(true));
      }
    });
    return () => {
      props.clearSocket();
    };
  }, []);

  React.useEffect(() => {
    if (!socket) return;
    socket.on('user_joined', (res: { user: { id: string; name: string } }) => {
      // console.log(res);
      dispatch(roomModule.actions.addUser(res.user));
      sendNotifiction(res.user.name + 'が入室しました', 'success');
    });
    socket.on('user_left', (res: { user: { id: string; name: string } }) => {
      dispatch(roomModule.actions.removeUser(res.user.id));
      sendNotifiction(res.user.name + 'が退出しました', 'error');
    });
    socket.on('new_chat', (chatItem: ChatItem) => {
      setChatList((prev) => {
        const newArray = [...prev, chatItem];
        return newArray;
      });
    });
  }, [socket]);

  const joinRoom = (socket: SocketIOClient.Socket, option: { roomId: string }) => {
    if (!socket) return sendNotifiction('入室に失敗しました', 'error', { horizontal: 'center', vertical: 'top' });
    socket.emit('join_room', { room_id: option.roomId, user_name: userName.value }, (res: JoinRoomRes) => {
      console.log(res);
      if (res.result) {
        dispatch(
          roomModule.actions.setRoom({
            roomId: option.roomId,
            userName: userName.value,
            isOwner: false,
            userList: res.userList || []
          })
        );
        dispatch(appModule.actions.setHeader(true));
        setNameDialog(false);
      } else {
        sendNotifiction('入室に失敗しました', 'error', { horizontal: 'center', vertical: 'top' });
        history.push('/');
      }
      setLoad(false);
    });
  };

  const getParamValue = (key: string): string | null => {
    const params = new URLSearchParams(window.location.search);
    const value = params.get(key);
    return value;
  };

  const sendNotifiction = (
    message: string,
    variant: VariantType,
    position: { horizontal: 'left' | 'center' | 'right'; vertical: 'top' | 'bottom' } = {
      horizontal: 'left',
      vertical: 'bottom'
    }
  ) => {
    if (screen.width < 600) return;
    enqueueSnackbar(message, {
      variant,
      anchorOrigin: { horizontal: position.horizontal, vertical: position.vertical },
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
      onChange: function (value: string) {
        const { error, msg } = this.validate(value);
        setUserName({ value, error, msg });
      },
      validate: (val: string) => {
        const response = { error: false, msg: '' };
        if (val === '') {
          response.error = true;
          response.msg = 'ユーザネームを入力してください';
        } else if (val.length > 13) {
          response.error = true;
          response.msg = '12文字以内で入力してください';
        }
        return response;
      }
    }
  ];

  const enterSubmitHandler = () => {
    if (!socket) return;
    setLoad(true);
    // console.log('enterSubmitHandler', socket, enterId);
    Cookie.set('streaming_name', userName.value);
    joinRoom(socket, { roomId: enterId });
  };

  return (
    <Presenter
      socket={socket}
      room={room}
      nameDialog={nameDialog}
      createForm={{ inputs, load, onSubmit: enterSubmitHandler }}
      chat={{ chatList, setChatList }}
      playList={{ nowPlaying, playList }}
    />
  );
};

export default Room;
