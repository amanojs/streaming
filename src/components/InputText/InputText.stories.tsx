import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { InputText, ContainerProps } from './index';

export default {
  title: 'Atom/InputText',
  component: InputText
} as Meta;

const Template: Story<ContainerProps> = (props: ContainerProps) => <InputText {...props} />;

export const Test = Template.bind({});
Test.args = {
  label: '名前',
  placeholder: 'super man',
  value: '',
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onChange: () => {}
};
