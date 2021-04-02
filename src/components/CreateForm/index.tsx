import * as React from 'react';
import { Presenter, Input } from './Presenter';

export interface ContainerProps {
  width: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const CreateForm: React.FC<ContainerProps> = (props: ContainerProps) => {
  const [userName, setUserName] = React.useState('');
  const inputs: Input[] = [
    {
      label: 'ユーザネーム',
      placeholder: 'superman',
      value: userName,
      onChange: (e) => setUserName(e.target.value)
    }
  ];
  return <Presenter width={props.width} inputs={inputs} />;
};
CreateForm.defaultProps = {
  width: '100%'
};
