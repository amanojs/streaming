import * as React from 'react';
import { Grid } from '@material-ui/core';
import { CreateForm, InputSub } from '../../components/CreateForm';
import { makeStyles } from '@material-ui/core/styles';
import Logo from '../../assets/Streaming-logo.png';
import './main.css';

interface PresenterProps {
  createForm: {
    inputs: InputSub[];
    onSubmit: () => any;
  };
}

export const Presenter: React.FC<PresenterProps> = (props: PresenterProps) => {
  const useStyles = makeStyles({
    baseGrid: {
      position: 'relative',
      height: '100%',
      zIndex: 2
    }
  });
  const classes = useStyles();
  return (
    <div className="base">
      <Grid container justify="center" alignItems="center" className={classes.baseGrid}>
        <Grid item xs={11} sm={9} md={6} lg={4} xl={3} style={{ marginBottom: '80px' }}>
          <Grid container spacing={1}>
            <Grid item className="logo" xs={12}>
              <Grid container justify="center" spacing={0}>
                <Grid item xs={3}>
                  <img src={Logo} width="100%" alt="Logo" />
                </Grid>
                <Grid item xs={12}>
                  <span>S</span>treaming!!
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <CreateForm width="100%" head="ルーム作成" btn="作成" {...props.createForm} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <div className="wave"></div>
    </div>
  );
};
