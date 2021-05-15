import * as React from 'react';
import YouTube from 'react-youtube';
import { YouTubePlayer } from 'youtube-player/dist/types';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Slider, IconButton, Hidden } from '@material-ui/core';
import { PlayArrow, Pause, FastForward, FastRewind } from '@material-ui/icons';
import { Volume } from '../Volume';

export interface PresenterProps {
  statusIcon: 'play' | 'pause';
  timed: number;
  duratioin: number;
  sliderOnChange: (e: any, value: any) => void;
  fastTimed: (value: number) => void;
  valueLabelFormat: (value: number) => string;
  playOrPause: () => void;
  isMute: boolean;
  volumeOnClick: () => any;
  volumeSliderOnChange: (e: React.ChangeEvent<any>, value: number | number[]) => any;
  volume: number;
}

const PrettoSlider = withStyles({
  root: {
    color: '#1dd1a1',
    paddingTop: 0
  },
  thumb: {
    height: 10,
    width: 10,
    backgroundColor: 'currentColor',
    marginTop: -1,
    marginLeft: -1,
    border: '2px solid currentColor',
    '&:hover': {
      boxShadow: '2px 2px 8px currentColor',
      height: 16,
      width: 16,
      marginTop: -6,
      marginLeft: -10,
      backgroundColor: 'currentColor'
    },
    '&:focus': {
      boxShadow: '2px 2px 8px currentColor'
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
    height: 8,
    borderRadius: 0
  },
  rail: {
    height: 8,
    borderRadius: 0
  }
})(Slider);

export const Presenter: React.FC<PresenterProps> = (props: PresenterProps) => {
  return (
    <React.Fragment>
      <Grid container style={{ background: '#fff', marginTop: '-11px' }}>
        <Grid item xs={12}>
          <PrettoSlider
            style={{ height: 'auto' }}
            valueLabelDisplay="auto"
            defaultValue={0.0}
            value={props.timed}
            min={0.0}
            max={props.duratioin}
            step={0.000000001}
            onChange={props.sliderOnChange}
            getAriaValueText={props.valueLabelFormat}
            valueLabelFormat={props.valueLabelFormat}
          />
        </Grid>
        <Grid container alignItems="center" style={{ padding: '0 20px 10px 20px' }}>
          <Grid item xs={1} sm={3} md={3} lg={3} xl={3} style={{ color: '#777' }}>
            <Grid container alignItems="center" wrap="wrap">
              <Hidden xsDown>
                <Grid item sm={12} md={12} lg={5} xl={3} style={{ fontFamily: 'Noto Sans JP', fontSize: '14px' }}>
                  <span>{props.valueLabelFormat(props.timed)}</span>/
                  <span>{props.valueLabelFormat(props.duratioin)}</span>
                </Grid>
              </Hidden>
              <Grid item sm={12} md={12} lg={7} xl={5}>
                <Volume
                  isMute={props.isMute}
                  onChange={props.volumeSliderOnChange}
                  onClick={props.volumeOnClick}
                  volume={props.volume}
                ></Volume>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={10} sm={6} md={6} lg={6} xl={6}>
            <Grid container justify="center" alignItems="center" spacing={1}>
              <Grid item>
                <IconButton size="medium" onClick={() => props.fastTimed(-15)} onKeyUp={(e) => e.preventDefault()}>
                  <FastRewind fontSize="small" color="secondary" />
                </IconButton>
              </Grid>
              <Grid item>
                <IconButton onClick={props.playOrPause} onKeyUp={(e) => e.preventDefault()}>
                  {props.statusIcon === 'play' ? (
                    <PlayArrow fontSize="large" color="secondary" />
                  ) : (
                    <Pause fontSize="large" color="secondary" />
                  )}
                </IconButton>
              </Grid>
              <Grid item>
                <IconButton size="medium" onClick={() => props.fastTimed(15)} onKeyUp={(e) => e.preventDefault()}>
                  <FastForward fontSize="small" color="secondary" />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={1} sm={3} md={3} lg={3} xl={3}></Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
