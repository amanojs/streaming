import {
  IconButton,
  Menu,
  MenuItem,
  Dialog,
  List,
  ListItemText,
  ListItem,
  DialogTitle,
  ListItemAvatar,
  Avatar
} from '@material-ui/core';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { User } from '../../store/modules/roomModule';
import { State } from '../../store/store';

import { Person, Close } from '@material-ui/icons';

export const UserList: React.FC = () => {
  const userList: User[] = useSelector((state: State) => state.room.userList);
  const [width, setWidth] = React.useState<number>(window.innerWidth);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const updateWidth = (event: any) => {
    setWidth(window.innerWidth);
  };

  React.useEffect(() => {
    window.addEventListener(`resize`, updateWidth, {
      capture: false,
      passive: true
    });

    return () => window.removeEventListener(`resize`, updateWidth);
  });

  const isSmallScreen = (): boolean => {
    return width <= 900;
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const userListBody = (): JSX.Element => {
    return (
      <List style={{ overflowY: 'scroll' }}>
        {userList.map((user) => {
          return (
            <ListItem key={user.id}>
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
    <div>
      <IconButton size="small" color="secondary" onClick={handleClick}>
        <Person />
        {userList.length}
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted={true}
        open={Boolean(anchorEl) && !isSmallScreen()}
        onClose={handleClose}
        style={{ overflowY: 'hidden' }}
      >
        <DialogTitle id="simple-dialog-title">
          <span>User List</span>
          <IconButton onClick={handleClose} color="secondary" aria-label="add to shopping cart">
            <Close />
          </IconButton>
        </DialogTitle>
        {userListBody()}
      </Menu>
      <Dialog
        className="userList_modal"
        style={{ position: 'absolute' }}
        open={Boolean(anchorEl) && isSmallScreen()}
        onClose={handleClose}
        fullScreen
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <DialogTitle id="simple-dialog-title">
          <span>User List</span>
          <IconButton onClick={handleClose} color="secondary" aria-label="add to shopping cart">
            <Close />
          </IconButton>
        </DialogTitle>
        {userListBody()}
      </Dialog>
    </div>
  );
};
