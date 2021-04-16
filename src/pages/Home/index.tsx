import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import roomModule from '../../store/modules/roomModule';
import { Presenter } from './Presenter';
import { PageProps } from '../../App';
import { InputSub } from '../../components/CreateForm';
import Cookie from 'js-cookie';

const Home: React.FC<PageProps> = (props: PageProps) => {
  const [mout, mountkeeper] = React.useState();
  const [userName, setUserName] = React.useState({ value: '', error: false, msg: '' });

  const dispach = useDispatch();
  const history = useHistory();

  const inputs: InputSub[] = [
    {
      label: 'ユーザネーム*',
      placeholder: '須鳥武 太郎',
      value: userName.value,
      error: userName.error,
      msg: userName.msg,
      onChange: function (value: string) {
        const { error, msg } = this.validate(value);
        setUserName({ value: value, error, msg });
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

  React.useEffect(() => {
    props.clearSocket();
    // Cookie存在時ユーザネームセット処理
    const cookieName = Cookie.get('streaming_name');
    if (cookieName) {
      setUserName({ value: cookieName, error: false, msg: '' });
    }
  }, [mountkeeper]);

  const createRoomHandler = async () => {
    const socket = await props.getSocket();
    console.log(socket);
    if (socket) {
      Cookie.set('streaming_name', userName.value);
      socket.emit('create_room', userName.value, (res: { result: boolean; room_id: string }) => {
        console.log(res);
        if (res.result) {
          dispach(roomModule.actions.setRoom({ roomId: res.room_id, userName: userName.value, isOwner: true }));
          history.push('/room' + '?room_id=' + res.room_id);
        }
      });
    }
  };
  return <Presenter createForm={{ inputs, onSubmit: createRoomHandler }} />;
};

export default Home;
