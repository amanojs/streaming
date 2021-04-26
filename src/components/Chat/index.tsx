import * as React from 'react';
import { useSelector } from 'react-redux';
import { State } from '../../store/store';
import { Presenter } from './Presenter';

interface ChatProps {
  socket: SocketIOClient.Socket;
  chatList: ChatItem[];
  setChatList: React.Dispatch<React.SetStateAction<ChatItem[]>>;
  smartphone?: boolean;
}

export interface ChatItem {
  name: string;
  id: string;
  msg: string;
}

export const Chat: React.FC<ChatProps> = (props: ChatProps) => {
  const socket: SocketIOClient.Socket = props.socket;
  const [chat, setChat] = React.useState<string>('');
  const userName: string = useSelector((state: State) => state.room.userName);

  React.useEffect(() => {
    const elements = document.getElementsByClassName('chatList');
    for (let i = 0; i < elements.length; i++) {
      const bottom = elements[i].scrollHeight - elements[i].clientHeight;
      elements[i].scroll(0, bottom);
    }
  }, [props.chatList]);

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
    console.log('saf');
    if (postData !== '') {
      socket.emit('post_chat', postData);
      setChat('');
    }
  };

  return (
    <Presenter
      smartphone={props.smartphone}
      chatList={props.chatList}
      chat={chat}
      userName={userName}
      onInput={onInput}
      onKeyDown={onKeyDown}
      postChat={postChat}
    />
  );
};
