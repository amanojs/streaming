import * as React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Button } from '@material-ui/core';
import { CopyRoomIdButton } from '../CopyRoomIdButton';
import { ArrowLeftRounded } from '@material-ui/icons';
import Logo2 from '../../assets/Streaming-logo2.png';
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
          <h2 style={{ flexGrow: 1, display: 'flex', alignItems: 'center' }} className="header_logo">
            <img src={Logo2} width="25px" height="25px" style={{ marginRight: '5px' }} />
            <span>S</span>treaming!!
          </h2>
          <CopyRoomIdButton />
        </Toolbar>
      </AppBar>
    </div>
  );
};
