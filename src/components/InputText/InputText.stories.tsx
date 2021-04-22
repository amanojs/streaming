import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { InputText, InputTextProps } from './index';
import { ThemeProvider } from '@material-ui/styles';
import { theme } from '../../config/theme';

export default {
  title: 'Atom/InputText',
  component: InputText
} as Meta;

const Template: Story<InputTextProps> = (props: InputTextProps) => (
  <ThemeProvider theme={theme}>
    <InputText {...props} />
  </ThemeProvider>
);

export const Default = Template.bind({});
Default.args = {
  label: '名前',
  placeholder: 'super man',
  value: '',
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onChange: () => {}
};

export const Error = Template.bind({});
Error.args = {
  label: '名前',
  placeholder: 'super man',
  value: '',
  error: true,
  msg: '入力値が誤っています',
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onChange: () => {}
};
