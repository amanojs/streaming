import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, Input } from '@material-ui/core';

interface PresenterProps {
  width: string;
}

export const Presenter: React.FC<PresenterProps> = (props: PresenterProps) => {
  const useStyles = makeStyles({
    form_card: {
      width: props.width,
      padding: '10px'
    }
  });
  const classes = useStyles();
  return (
    <Card className={classes.form_card}>
      <Input />
    </Card>
  );
};
