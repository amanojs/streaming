import * as React from 'react';
import { Button, Grid, TextField } from '@material-ui/core';

interface PresenterProps {
  videoId: string;
  onChange: (value: string) => void;
  addMovieHandler: (e: React.FormEvent<HTMLFormElement>) => void;
}

export const Presenter: React.FC<PresenterProps> = (props: PresenterProps) => {
  return (
    <form style={{ width: '100%' }} onSubmit={props.addMovieHandler}>
      <Grid container spacing={1}>
        <Grid item xs={12} lg={11} xl={11}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="YouTube Movie URL"
            color="secondary"
            style={{ borderRadius: 'none', background: '#f9f9f9', height: '100%' }}
            value={props.videoId}
            onChange={(e) => props.onChange(e.target.value)}
          ></TextField>
        </Grid>
        <Grid item xs={12} lg={1} xl={1}>
          <Button
            fullWidth
            type="submit"
            color="secondary"
            variant="contained"
            style={{ height: '100%' }}
            disableElevation
          >
            変更
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};
