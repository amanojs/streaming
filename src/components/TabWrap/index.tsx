import * as React from 'react';
import { Button, Grid, IconButton } from '@material-ui/core';
import { ArrowDropDownOutlined, ArrowDropUpOutlined, Forum, PlaylistPlay } from '@material-ui/icons';
import { UserList } from '../UserList';
import { ChatItem } from '../Chat';
import './main.css';

interface TabWrapProps {
  socket: SocketIOClient.Socket;
  chat: {
    chatList: ChatItem[];
    setChatList: React.Dispatch<React.SetStateAction<ChatItem[]>>;
    smartphone?: boolean;
  };
}

export const TabWrap: React.FC<TabWrapProps> = (props: TabWrapProps) => {
  const [tabIndex, setTabIndex] = React.useState<number>(0);
  const [isOpen, setOpen] = React.useState<boolean>(false);
  const chat = props.chat;

  const setTabIndexHandler = (index: number): void => {
    if (tabIndex === index) return;
    setTabIndex(index);
  };

  return (
    <Grid container className="tabBase">
      <Grid item xs={12} className="tabWrap">
        <div className="tabHeader">
          <Button
            color={tabIndex === 0 ? 'secondary' : undefined}
            startIcon={<Forum />}
            className="tabMenuButton"
            onClick={() => setTabIndexHandler(0)}
          >
            Chat
          </Button>
          <Button
            color={tabIndex === 1 ? 'secondary' : undefined}
            startIcon={<PlaylistPlay />}
            className="tabMenuButton"
            onClick={() => setTabIndexHandler(1)}
          >
            PlayList
          </Button>
          {chat.smartphone ? (
            <IconButton size="small" onClick={() => setOpen(!isOpen)}>
              {isOpen ? <ArrowDropUpOutlined fontSize="small" /> : <ArrowDropDownOutlined fontSize="small" />}
            </IconButton>
          ) : (
            false
          )}
          <div className="userlistBase">
            <UserList />
          </div>
        </div>
        {/* ここにコンポーネントを入れる */}
      </Grid>
    </Grid>
  );
};
