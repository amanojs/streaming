import * as React from 'react';
import { Grid, TextField, IconButton } from '@material-ui/core';
import './main.css';
import { Send } from '@material-ui/icons';
import { ChatItem } from '.';

interface PresenterProps {
  chatList: ChatItem[];
  chat: string;
  userName: string;
  onInput: (msg: string) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLDivElement>) => void;
  postChat: () => void;
  isOpen: boolean;
  smartphone?: boolean;
}

export const Presenter: React.FC<PresenterProps> = (props: PresenterProps) => {
  return (
    <React.Fragment>
      <div className="chatList" style={{ height: props.isOpen ? '200px' : '0px' }}>
        {props.chatList.map((chat, index) => {
          return (
            <Grid container className="chats" key={index}>
              <Grid item xs={12} className="commentUser">
                {chat.name}
              </Grid>
              <Grid item xs={12} className="commentText">
                {chat.msg}
              </Grid>
            </Grid>
          );
        })}
      </div>
      <div className="chatActions">
        <form style={{ width: '100%' }}>
          <Grid container justify="center" alignItems="center" spacing={0}>
            <Grid item xs={9} sm={10} md={10} lg={9} xl={9}>
              <TextField
                multiline
                fullWidth
                rowsMax={2}
                color="secondary"
                variant="standard"
                size="small"
                className="chatInput"
                value={props.chat}
                onKeyPress={(e) => props.onKeyDown(e)}
                onChange={(e) => props.onInput(e.target.value)}
                placeholder={props.userName + 'としてチャットを送信'}
              />
            </Grid>
            <Grid item xs={1} md={1} lg={1} xl={1}>
              <IconButton type="button" size="medium" color="secondary" onClick={props.postChat}>
                <Send fontSize="small" />
              </IconButton>
            </Grid>
            {props.smartphone ? (
              false
            ) : (
              <Grid item xs={12}>
                <div className="assist_key">Ctrl + Enterで送信</div>
              </Grid>
            )}
          </Grid>
        </form>
      </div>
    </React.Fragment>
  );
};
