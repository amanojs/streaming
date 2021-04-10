import * as React from 'react';
import { Grid, Slider, IconButton, withStyles } from '@material-ui/core';
import { VolumeOff, VolumeDown, VolumeUp } from '@material-ui/icons';

export interface VolumeProps {
  isMute: boolean;
  volume: number;
  onChange: (e: React.ChangeEvent<any>, value: number | number[]) => any;
  onClick: () => any;
}

export const Volume: React.FC<VolumeProps> = (props: VolumeProps) => {
  return (
    <React.Fragment>
      <IconButton onClick={props.onClick}>{props.isMute ? <VolumeOff></VolumeOff> : <VolumeUp></VolumeUp>}</IconButton>
      <VolumeSlider
        valueLabelDisplay="off"
        step={0.001}
        min={0.0}
        max={100.0}
        value={props.volume}
        onChange={props.onChange}
      ></VolumeSlider>
    </React.Fragment>
  );
};

const VolumeSlider = withStyles({})(Slider);
