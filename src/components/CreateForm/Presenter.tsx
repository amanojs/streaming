import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Card, Button, Box } from '@material-ui/core';
import { Home, PlayArrow } from '@material-ui/icons';
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
              <span>ルーム作成</span>
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
              作成
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
};
