import * as React from 'react';
import { Presenter } from './Presenter';
import { ContainerProps as Input } from '../InputText';

export interface ContainerProps {
  width: string;
  setSocketHandler(): Promise<SocketIOClient.Socket | null>;
}

export interface InputSub extends Input {
  validate: (val: string) => { error: boolean; msg: string };
  setter: React.Dispatch<
    React.SetStateAction<{
      value: string;
      error: boolean;
      msg: string;
    }>
  >;
}

export const CreateForm: React.FC<ContainerProps> = (props: ContainerProps) => {
  const [userName, setUserName] = React.useState({ value: '', error: false, msg: '' });

  const inputs: InputSub[] = [
    {
      label: 'ユーザネーム*',
      placeholder: '須鳥武 太郎',
      value: userName.value,
      error: userName.error,
      msg: userName.msg,
      onChange: function (e) {
        const { error, msg } = this.validate(e.target.value);
        this.setter({ value: e.target.value, error, msg });
      },
      validate: (val) => {
        const response = { error: false, msg: '' };
        if (val === '') {
          response.error = true;
          response.msg = 'ユーザネームを入力してください';
        } else if (val.length > 13) {
          response.error = true;
          response.msg = '12文字以内で入力してください';
        }
        return response;
      },
      setter: setUserName
    }
  ];

  for (const input of inputs) {
    input.onChange = input.onChange.bind(input);
  }

  const validateAll = () => {
    let errorFlag = false;
    for (const input of inputs) {
      const response = input.validate(input.value);
      if (response.error) errorFlag = true;
      input.setter({ value: input.value, error: response.error, msg: response.msg });
    }
    return errorFlag;
  };

  const submitEvent = async () => {
    if (validateAll()) {
      return console.log('aaa');
    }
    const socket = await props.setSocketHandler();
    console.log(socket);
    if (socket) {
      socket.emit('create_room', 'takashi', (res: any) => {
        console.log(res);
      });
    }
    console.log('submit');
  };

  return <Presenter width={props.width} inputs={inputs} submitEvent={submitEvent} />;
};
CreateForm.defaultProps = {
  width: '100%'
};
