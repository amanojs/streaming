import * as React from 'react';
import { Presenter, PresenterProps } from './Presenter';

export interface ContainerProps {
  width: string;
}

export const CreateForm: React.FC<ContainerProps> = (props: ContainerProps) => {
  const [userName, setUserName] = React.useState('');
  const inputs: PresenterProps['inputs'] = [
    {
      label: 'ユーザネーム',
      placeholder: '須鳥武 太郎',
      value: userName,
      onChange: (e) => setUserName(e.target.value)
    }
  ];
  const submitEvent = () => {
    console.log('submit');
  };
  return <Presenter width={props.width} inputs={inputs} submitEvent={submitEvent} />;
};
CreateForm.defaultProps = {
  width: '100%'
};
