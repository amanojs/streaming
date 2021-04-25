import * as React from 'react';
import { useSelector } from 'react-redux';
import { State } from '../../store/store';
import { Presenter } from './Presenter';

interface ChatProps {
  socket: SocketIOClient.Socket;
  smartphone?: boolean;
}

export interface ChatItem {
  name: string;
  id: string;
  msg: string;
}

export const Chat: React.FC<ChatProps> = (props: ChatProps) => {
  const socket: SocketIOClient.Socket = props.socket;
  const [chatList, setChatList] = React.useState<ChatItem[]>([]);
  const [chat, setChat] = React.useState<string>('');
  const userName: string = useSelector((state: State) => state.room.userName);

  // マウント時の処理
  React.useEffect(() => {
    setUpSocketListenner();
  }, []);

  React.useEffect(() => {
    const element = document.getElementsByClassName('chatList')[0];
    const bottom = element.scrollHeight - element.clientHeight;
    element.scroll(0, bottom);
  }, [chatList]);

  /** socketのセットアップ */
  const setUpSocketListenner = (): void => {
    socket.on('new_chat', (chatItem: ChatItem) => {
      setChatList((prev) => {
        const newArray = [...prev, chatItem];
        return newArray;
      });
    });
  };

  const onInput = (msg: string) => {
    setChat(msg);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.ctrlKey && e.code === 'Enter') {
      postChat();
    }
  };

  /** チャット送信時の処理 */
  const postChat = () => {
    const postData = chat.replace('\n', '');
    console.log(postData);
    if (postData !== '') {
      socket.emit('post_chat', postData);
      setChat('');
    }
  };

  return (
    <Presenter
      smartphone={props.smartphone}
      chatList={chatList}
      chat={chat}
      onInput={onInput}
      onKeyDown={onKeyDown}
      postChat={postChat}
    />
  );
};
