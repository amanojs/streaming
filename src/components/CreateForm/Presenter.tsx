import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Card, Button, Box } from '@material-ui/core';
import { InputText } from '../InputText';
import { InputSub } from './index';
import './main.css';

export interface PresenterProps {
  width: string;
  head: string;
  btn: string;
  inputs: InputSub[];
  submitEvent: () => any;
}

export const Presenter: React.FC<PresenterProps> = (props: PresenterProps) => {
  const useStyles = makeStyles({
    form_card: {
      width: props.width,
      padding: '55px 0'
    }
  });
  const classes = useStyles();
  return (
    <Card className={classes.form_card}>
      <Grid container justify="center" spacing={1}>
        <Grid container xs={10} spacing={1}>
          <Grid item xs={12}>
            <Box
              className="create_room_head"
              display="flex"
              justifyContent="center"
              alignItems="center"
              lineHeight="0px"
              marginBottom="30px"
            >
              <span>{props.head}</span>
            </Box>
          </Grid>
          {props.inputs.map((input: InputSub) => {
            return (
              <Grid item xs={12} key={input.label}>
                <InputText
                  label={input.label}
                  error={input.error}
                  msg={input.msg}
                  placeholder={input.placeholder}
                  value={input.value}
                  onChange={input.onChange}
                />
              </Grid>
            );
          })}
          <Grid item xs={12}>
            <Button fullWidth variant="contained" disableElevation color="secondary" onClick={props.submitEvent}>
              {props.btn}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
};
