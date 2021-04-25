import { IconButton, Menu, MenuItem, Dialog } from '@material-ui/core';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { User } from '../../store/modules/roomModule';
import { State } from '../../store/store';

import { Person } from '@material-ui/icons';

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
      >
        {userList.map((user) => {
          return <MenuItem key={user.id}>{user.name}</MenuItem>;
        })}
      </Menu>
      <Dialog
        className="userList_modal"
        style={{ position: 'absolute' }}
        open={Boolean(anchorEl) && isSmallScreen()}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div>
          {userList.map((user) => {
            return <div key={user.id}>{user.name}</div>;
          })}
        </div>
      </Dialog>
    </div>
  );
};
