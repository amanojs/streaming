import * as React from 'react';
import { Grid, TextField, IconButton } from '@material-ui/core';
import './main.css';
import { ArrowDropDownOutlined, ArrowDropUpOutlined, Forum, Send } from '@material-ui/icons';

export const PresenterDesk: React.FC = () => {
  const [isOpen, setOpen] = React.useState<boolean>(false);
  return (
    <Grid container className="chatBase">
      <Grid item xs={12} className="chatWrap">
        <div className="chatHeader">
          <Forum />
          <span style={{ margin: '0 5px' }}>Chat</span>
          <IconButton size="small" onClick={() => setOpen(!isOpen)}>
            {isOpen ? <ArrowDropUpOutlined fontSize="small" /> : <ArrowDropDownOutlined fontSize="small" />}
          </IconButton>
        </div>
        <div className="chatList" style={{ height: isOpen ? '200px' : '0' }}>
          <Grid container className="chats">
            <Grid item xs={12} className="commentUser">
              tanabe1422
            </Grid>
            <Grid item xs={12} className="commentText">
              ここおもろい！！
            </Grid>
          </Grid>
          <Grid container className="chats">
            <Grid item xs={12} className="commentUser">
              amanojs
            </Grid>
            <Grid item xs={12} className="commentText">
              そうかな～
            </Grid>
          </Grid>
          <Grid container className="chats">
            <Grid item xs={12} className="commentUser">
              amanojs
            </Grid>
            <Grid item xs={12} className="commentText">
              そうかな～
            </Grid>
          </Grid>
          <Grid container className="chats">
            <Grid item xs={12} className="commentUser">
              amanojs
            </Grid>
            <Grid item xs={12} className="commentText">
              そうかな～
            </Grid>
          </Grid>
        </div>
        <div className="chatActions">
          <form style={{ width: '100%' }}>
            <Grid container justify="center" alignItems="center" spacing={1}>
              <Grid item xs={9} sm={10} md={10} lg={9} xl={9}>
                <TextField
                  multiline
                  fullWidth
                  rowsMax={2}
                  variant="standard"
                  size="small"
                  placeholder="amanojsとしてチャットを送信"
                />
              </Grid>
              <Grid item xs={1} md={1} lg={1} xl={1}>
                <IconButton type="submit" size="medium" color="secondary">
                  <Send fontSize="small" />
                </IconButton>
              </Grid>
            </Grid>
          </form>
        </div>
      </Grid>
    </Grid>
  );
};
