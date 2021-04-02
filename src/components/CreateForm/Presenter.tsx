import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card } from '@material-ui/core';
import { InputText } from '../InputText';

interface PresenterProps {
  width: string;
  inputs: Input[];
}

export interface Input {
  label: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
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
      {props.inputs.map((input) => {
        return (
          <InputText
            key={input.label}
            label={input.label}
            placeholder={input.placeholder}
            value={input.value}
            onChange={input.onChange}
          />
        );
      })}
    </Card>
  );
};
