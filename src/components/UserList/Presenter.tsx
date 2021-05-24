import React from 'react';
import {
  Button,
  IconButton,
  Menu,
  Dialog,
  List,
  ListItemText,
  ListItem,
  Box,
  ListItemAvatar,
  Avatar
} from '@material-ui/core';
import { Close, Person } from '@material-ui/icons';
import { User } from '../../store/modules/roomModule';

interface PresenterProps {
  userList: User[];
  anchorEl: null | HTMLElement;
  /** 画面サイズの判定 */
  isSmallScreen: () => boolean;
  handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  handleClose: () => void;
}

export const Presenter: React.FC<PresenterProps> = (props: PresenterProps) => {
  /** ヘッダ部分 */
  const userListHeader = (): JSX.Element => {
    return (
      <Box display="flex" alignItems="center" style={{ padding: '10px 10px 10px 30px' }}>
        <div style={{ flexGrow: 1, fontFamily: 'Noto Sans JP', color: '#222' }}>Users({props.userList.length})</div>
        <IconButton onClick={props.handleClose} color="secondary" size="small" aria-label="close UserList">
          <Close />
        </IconButton>
      </Box>
    );
  };

  /** リスト部分 */
  const userListBody = (): JSX.Element => {
    return (
      <List style={{ flex: 1, maxHeight: '100%', overflow: 'auto', background: '#f9f9f9' }}>
        {props.userList.map((user) => {
          return (
            <ListItem
              button
              key={user.id}
              onClick={props.handleClose}
              style={{ padding: '10px 40px 10px 30px', color: '#444' }}
            >
              <ListItemAvatar>
                <Avatar>
                  <Person />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={user.name} />
            </ListItem>
          );
        })}
      </List>
    );
  };

  return (
    <React.Fragment>
      <Button size="small" color="secondary" onClick={props.handleClick}>
        <Person />
        <span>{props.userList.length}</span>
      </Button>
      <Menu
        id="user_list_menu"
        anchorEl={props.anchorEl}
        keepMounted={true}
        open={Boolean(props.anchorEl) && !props.isSmallScreen()}
        onClose={props.handleClose}
      >
        {userListHeader()}
        {userListBody()}
      </Menu>
      <Dialog
        className="user_list_modal"
        style={{ position: 'absolute' }}
        open={Boolean(props.anchorEl) && props.isSmallScreen()}
        onClose={props.handleClose}
        aria-labelledby="modal-title"
        maxWidth="sm"
        fullWidth
        aria-describedby="modal-description"
      >
        {userListHeader()}
        {userListBody()}
      </Dialog>
    </React.Fragment>
  );
};
