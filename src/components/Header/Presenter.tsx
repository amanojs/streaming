import * as React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Button } from '@material-ui/core';
import { CopyRoomIdButton } from '../CopyRoomIdButton';
import { ArrowLeftRounded } from '@material-ui/icons';
import Logo from '../../assets/Streaming-logo.png';
import './main.css';

interface PresenterProps {
  backClick: () => void;
}

export const Presenter: React.FC<PresenterProps> = (props: PresenterProps) => {
  return (
    <div style={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton size="small" edge="start" color="default" aria-label="menu" onClick={props.backClick}>
            <ArrowLeftRounded fontSize="large" />
          </IconButton>
          <h2 style={{ flexGrow: 1, display: 'flex' }} className="header_logo">
            <img src={Logo} width="25px" style={{ marginRight: '5px' }} />
            <span>S</span>treaming!!
          </h2>
          <CopyRoomIdButton />
        </Toolbar>
      </AppBar>
    </div>
  );
};
