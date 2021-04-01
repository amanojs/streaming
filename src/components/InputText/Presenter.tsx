import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Input } from '@material-ui/core';

interface PresenterProps {
  label: string;
  placeholder?: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Presenter: React.FC<PresenterProps> = (props: PresenterProps) => {
  return (
    <div>
      <label>{props.label}</label>
      <Input value={props.value} onChange={props.onChange} placeholder={props.placeholder} />
    </div>
  );
};
