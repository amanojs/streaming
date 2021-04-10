import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { CreateForm, CreateFormProps } from './index';
import { ThemeProvider } from '@material-ui/styles';
import { theme } from '../../config/theme';

export default {
  title: 'Block/CreateForm',
  component: CreateForm
} as Meta;

const Template: Story<CreateFormProps> = (props: CreateFormProps) => (
  <ThemeProvider theme={theme}>
    <CreateForm {...props} />
  </ThemeProvider>
);

const DefaultProps: CreateFormProps = {
  width: '400px',
  head: 'ヘッドタイトル',
  btn: '送信',
  inputs: [
    {
      label: 'ユーザネーム',
      placeholder: 'テストユーザ',
      value: '',
      error: false,
      msg: '',
      onChange: function (val) {
        console.log('onChange');
      },
      validate: (val) => {
        console.log('validate');
        return { error: true, msg: 'エラーメッセージ' };
      }
    }
  ],
  onSubmit: () => {
    console.log('onSubmit');
  }
};

export const Default = Template.bind({});
Default.args = DefaultProps;

export const Error = Template.bind({});
const ErrorProps: CreateFormProps = { ...DefaultProps };
ErrorProps.inputs = [
  {
    label: 'ユーザネーム',
    placeholder: 'テストユーザ',
    value: '',
    error: true,
    msg: '入力値が誤っています',
    onChange: function (val) {
      console.log('onChange');
    },
    validate: (val) => {
      console.log('validate');
      return { error: true, msg: 'エラーメッセージ' };
    }
  }
];
Error.args = ErrorProps;

export const MultiInput = Template.bind({});
const MultiInputProps: CreateFormProps = { ...DefaultProps };
MultiInputProps.inputs = [
  ...MultiInputProps.inputs,
  {
    label: 'メールアドレス',
    placeholder: 'streaming@steream.com',
    value: '',
    error: false,
    msg: '',
    onChange: function (val) {
      console.log('onChange');
    },
    validate: (val) => {
      console.log('validate');
      return { error: true, msg: 'エラーメッセージ' };
    }
  }
];
console.log(MultiInputProps);

MultiInput.args = MultiInputProps;
