import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { Home } from '.';

export default {
  title: 'Page/Home',
  component: Home
} as Meta;

const Template: Story = () => <Home />;

export const Default = Template.bind({});
