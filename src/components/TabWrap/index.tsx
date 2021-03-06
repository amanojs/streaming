import * as React from 'react';
import { Button, Grid, IconButton } from '@material-ui/core';
import { ArrowDropDownOutlined, ArrowDropUpOutlined, Forum, PlaylistPlay } from '@material-ui/icons';
import { UserList } from '../UserList';
import { Chat, ChatItem } from '../Chat';
import './main.css';
import { PlayList, PlayListItem } from '../PlayList';

interface TabWrapProps {
  socket: SocketIOClient.Socket;
  chat: {
    chatList: ChatItem[];
    setChatList: React.Dispatch<React.SetStateAction<ChatItem[]>>;
  };
  playList: {
    nowPlaying: PlayListItem;
    playList: PlayListItem[];
    skipPlayList: () => void;
    deletePlayListItem: (index: number) => void;
    deletePlayList: () => void;
  };
  smartphone?: boolean;
}

export const TabWrap: React.FC<TabWrapProps> = (props: TabWrapProps) => {
  const [tabIndex, setTabIndex] = React.useState<number>(0);
  const [isOpen, setOpen] = React.useState<boolean>(false);
  const chat = props.chat;
  const playList = props.playList;

  const setTabIndexHandler = (index: number): void => {
    if (tabIndex === index) return;
    setTabIndex(index);
  };

  return (
    <Grid container className="tabBase">
      <Grid item xs={12} className="tabWrap">
        <div className="tabHeader">
          {props.smartphone ? (
            <IconButton size="small" onClick={() => setOpen(!isOpen)} style={{ margin: '0 10px' }}>
              {isOpen ? <ArrowDropUpOutlined fontSize="small" /> : <ArrowDropDownOutlined fontSize="small" />}
            </IconButton>
          ) : (
            false
          )}
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

          <div className="userlistBase">
            <UserList />
          </div>
        </div>
        {/* ?????????????????????????????????????????? */}
        {tabIndex === 0 ? (
          <Chat socket={props.socket} isOpen={isOpen} {...chat} smartphone={props.smartphone} />
        ) : (
          false
        )}
        {tabIndex === 1 ? (
          <PlayList socket={props.socket} {...playList} isOpen={isOpen} smartphone={props.smartphone} />
        ) : (
          false
        )}
      </Grid>
    </Grid>
  );
};
