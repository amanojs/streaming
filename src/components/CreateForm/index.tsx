import * as React from 'react';
import { Presenter } from './Presenter';
import { InputTextProps } from '../InputText';

export interface InputSub extends InputTextProps {
  validate: (val: string) => { error: boolean; msg: string };
}

export interface CreateFormProps {
  /** 横幅 px や % で指定 */
  width: string;
  /** フォームタイトル*/
  head: string;
  /** フォームのサブミットボタンのタイトル */
  btn: string;
  /** ロード中か */
  load: boolean;
  /** InputText型にバリデーション処理を加えたインプットの配列 */
  inputs: InputSub[];
  /** サブミット処理(オールバリデーション処理の後に実行されます) */
  onSubmit: () => any;
}

/** タイトルとインプットテキストとサブミットボタンのシンプルなフォーム */
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

  const submitEvent = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateAll()) {
      return;
    }
    await props.onSubmit();
  };

  return (
    <Presenter
      width={props.width}
      head={props.head}
      btn={props.btn}
      inputs={props.inputs}
      load={props.load}
      submitEvent={submitEvent}
    />
  );
};
CreateForm.defaultProps = {
  width: '100%'
};
