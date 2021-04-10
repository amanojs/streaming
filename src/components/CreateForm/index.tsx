import * as React from 'react';
import { Presenter } from './Presenter';
import { InputTextProps } from '../InputText';

export interface InputSub extends InputTextProps {
  validate: (val: string) => { error: boolean; msg: string };
}

export interface CreateFormProps {
  width: string;
  head: string;
  btn: string;
  inputs: InputSub[];
  onSubmit: () => any;
}

export const CreateForm: React.FC<CreateFormProps> = (props: CreateFormProps) => {
  for (const input of props.inputs) {
    input.onChange = input.onChange.bind(input);
  }

  const validateAll = () => {
    let errorFlag = false;
    for (const input of props.inputs) {
      input.onChange(input.value);
      const { error } = input.validate(input.value);
      if (error) errorFlag = true;
    }
    return errorFlag;
  };

  const submitEvent = async () => {
    if (validateAll()) {
      return console.log('未入力の内容があります');
    }
    props.onSubmit();
  };

  return (
    <Presenter width={props.width} head={props.head} btn={props.btn} inputs={props.inputs} submitEvent={submitEvent} />
  );
};
CreateForm.defaultProps = {
  width: '100%'
};
