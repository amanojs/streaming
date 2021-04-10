import * as React from 'react';
import { Slider, IconButton, withStyles } from '@material-ui/core';
import { VolumeOff, VolumeDown, VolumeUp } from '@material-ui/icons';

interface PresenterProps {
  isMute: boolean;
  volume: number;
  onChange: (e: React.ChangeEvent<any>, value: number | number[]) => void;
  onClick: () => void;
}

export const Presenter: React.FC<PresenterProps> = (props: PresenterProps) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', width: '140px' }}>
      <IconButton onClick={props.onClick}>{props.isMute ? <VolumeOff></VolumeOff> : <VolumeUp></VolumeUp>}</IconButton>
      <VolumeSlider
        valueLabelDisplay="off"
        step={0.001}
        min={0.0}
        max={100.0}
        value={props.volume}
        onChange={props.onChange}
        style={{
          width: '100%',
          marginLeft: '10px'
        }}
      ></VolumeSlider>
    </div>
  );
};

const VolumeSlider = withStyles({
  root: {
    color: '#1dd1a1',
    paddingTop: 0,
    marginBottom: 0,
    padding: 0
  },
  thumb: {
    height: 14,
    width: 14,
    backgroundColor: 'currentColor',
    border: '2px solid currentColor',
    '&:hover': {
      height: 14,
      width: 14,
      backgroundColor: 'currentColor',
      boxShadow: 'none'
    },
    '&:focus': {
      boxShadow: 'none'
    },
    '&:active': {
      boxShadow: 'none'
    }
  },
  active: {},
  valueLabel: {
    left: 'calc(-80%)',
    '& *': {
      paddingRight: 5,
      background: 'transparent',
      color: '#fff',
      fontWeight: 'bold',
      textShadow: '2px 2px 4px #222'
    }
  },
  track: {
    height: 4,
    borderRadius: 0
  },
  rail: {
    height: 4,
    borderRadius: 0
  }
})(Slider);
