import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Card, Button } from '@material-ui/core';
import { InputText, ContainerProps as Input } from '../InputText';

export interface PresenterProps {
  width: string;
  inputs: Input[];
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
        {props.inputs.map((input) => {
          return (
            <Grid item xs={8} key={input.label}>
              <InputText
                label={input.label}
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
