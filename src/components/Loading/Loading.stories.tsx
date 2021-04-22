import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { Loading } from './';

export default {
  title: 'Page/Loading',
  component: Loading
} as Meta;

const Template: Story = () => <Loading />;
export const Default = Template.bind({});
