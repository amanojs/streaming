import * as React from 'react';
import { Presenter } from './Presenter';

export interface InputTextProps {
  label: string;
  placeholder?: string;
  value: string;
  error: boolean;
  msg: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const InputText: React.FC<InputTextProps> = (props: InputTextProps) => {
  return (
    <Presenter
      error={props.error}
      msg={props.msg}
      value={props.value}
      placeholder={props.placeholder}
      label={props.label}
      onChange={props.onChange}
    />
  );
};
