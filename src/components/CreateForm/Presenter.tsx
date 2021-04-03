import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Card, Button } from '@material-ui/core';
import { InputText } from '../InputText';
import { InputSub } from './index';

export interface PresenterProps {
  width: string;
  inputs: InputSub[];
  submitEvent: () => void;
}

export const Presenter: React.FC<PresenterProps> = (props: PresenterProps) => {
  const useStyles = makeStyles({
    form_card: {
      width: props.width,
      padding: '30px 0'
    }
  });
  const classes = useStyles();
  return (
    <Card className={classes.form_card}>
      <Grid container justify="center" spacing={1}>
        {props.inputs.map((input: InputSub) => {
          return (
            <Grid item xs={8} key={input.label}>
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
        <Grid item xs={8}>
          <Button fullWidth variant="contained" disableElevation color="primary" onClick={props.submitEvent}>
            作成
          </Button>
        </Grid>
      </Grid>
    </Card>
  );
};
