import React from 'react';
import {
  IconButton,
  Menu,
  Dialog,
  List,
  ListItemText,
  ListItem,
  DialogTitle,
  ListItemAvatar,
  Avatar,
  Toolbar
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
      <DialogTitle id="user_list_title">
        <Toolbar>
          <div style={{ flexGrow: 1 }}>User List({props.userList.length})</div>
          <IconButton onClick={props.handleClose} color="secondary" aria-label="close UserList">
            <Close />
          </IconButton>
        </Toolbar>
      </DialogTitle>
    );
  };

  /** リスト部分 */
  const userListBody = (): JSX.Element => {
    return (
      <List style={{ flex: 1, maxHeight: '100%', overflow: 'auto' }}>
        {props.userList.map((user) => {
          return (
            <ListItem button key={user.id} onClick={props.handleClose}>
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
      <IconButton size="small" color="secondary" onClick={props.handleClick}>
        <Person />
        {props.userList.length}
      </IconButton>
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
        fullScreen
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        {userListHeader()}
        {userListBody()}
      </Dialog>
    </React.Fragment>
  );
};
