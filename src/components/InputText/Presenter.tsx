import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';

interface PresenterProps {
  label: string;
  placeholder?: string;
  value: string;
  error: boolean;
  msg: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Presenter: React.FC<PresenterProps> = (props: PresenterProps) => {
  return (
    <div>
      <div style={{ color: '#777', padding: '0 0 3px 0', fontSize: '15px' }}>{props.label}</div>
      <TextField
        fullWidth
        error={props.error}
        helperText={props.msg}
        variant="outlined"
        value={props.value}
        onChange={props.onChange}
        placeholder={props.placeholder}
      />
    </div>
  );
};