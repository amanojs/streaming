import * as React from 'react';
import { Grid } from '@material-ui/core';
import { CreateForm, CreateFormProps } from '../../components/CreateForm';
import { makeStyles } from '@material-ui/core/styles';
import './main.css';

interface PresenterProps {
  createForm: {
    inputs: CreateFormProps['inputs'];
    onSubmit: CreateFormProps['onSubmit'];
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
        <Grid container xs={11} sm={7} md={4} xl={3} spacing={6}>
          <Grid item className="logo" xs={12}>
            <span>S</span>treaming!!
          </Grid>
          <CreateForm width="100%" head="ルーム作成" btn="作成" {...props.createForm} />
        </Grid>
      </Grid>
      <div className="wave"></div>
    </div>
  );
};
