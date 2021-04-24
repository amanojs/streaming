import * as React from 'react';
import { useSelector } from 'react-redux';
import { State } from '../../store/store';

interface ChatProps {
  socket: SocketIOClient.Socket;
}

interface ChatItem {
  name: string;
  id: string;
  msg: string;
}

export const Chat: React.FC<ChatProps> = (props: ChatProps) => {
  const socket: SocketIOClient.Socket = props.socket;
  const [chatList, setChatList] = React.useState<ChatItem[]>([]);
  const userName: string = useSelector((state: State) => state.room.userName);

  // マウント時の処理
  React.useEffect(() => {
    setUpSocketListenner();
  }, []);

  /** socketのセットアップ */
  const setUpSocketListenner = (): void => {
    socket.on('new_chat', (chatItem: ChatItem) => {
      setChatList((prev) => {
        const newArray = [...prev, chatItem];
        return newArray;
      });
    });
  };

  /** チャット送信時の処理 */
  const postChat = (msg: string) => {
    socket.emit('post_chat', msg);
  };

  return (
    <div>
      <div>
        {chatList.map((element, index) => {
          return <div key={index}>{element.msg}</div>;
        })}
      </div>
      <input type="button" onClick={() => postChat('testtest')} value="テスト" />
    </div>
  );
};
