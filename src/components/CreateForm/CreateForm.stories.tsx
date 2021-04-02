import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { CreateForm, ContainerProps } from './index';

export default {
  title: 'Block/CreateForm',
  component: CreateForm
} as Meta;

const Template: Story<ContainerProps> = (props: ContainerProps) => <CreateForm {...props} />;

export const NoValue = Template.bind({});
NoValue.args = {};
