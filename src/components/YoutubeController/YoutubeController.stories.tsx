import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { YoutubeController, YoutubeControllerProps } from './index';
import { ThemeProvider } from '@material-ui/styles';
import { theme } from '../../config/theme';

export default {
  title: 'Box/YoutubeController',
  component: YoutubeController
} as Meta;

const Template: Story<YoutubeControllerProps> = (props) => (
  <ThemeProvider theme={theme}>
    <div style={{ marginTop: '50px' }}></div>
    <YoutubeController {...props} />
  </ThemeProvider>
);

export const Play = Template.bind({});
Play.args = {
  youtubeDisp: undefined,
  videoStatus: 1
};

export const Stop = Template.bind({});
Play.args = {
  youtubeDisp: undefined,
  videoStatus: 0
};
