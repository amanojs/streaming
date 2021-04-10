import * as React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { CopyRoomIdButton } from './index';
import { ThemeProvider } from '@material-ui/styles';
import { theme } from '../../config/theme';
import { SnackbarProvider } from 'notistack';

export default {
  title: 'Atom/CopyRoomIdButton',
  component: CopyRoomIdButton
} as Meta;

const Template: Story = () => (
  <ThemeProvider theme={theme}>
    <SnackbarProvider maxSnack={1}>
      <CopyRoomIdButton />
    </SnackbarProvider>
  </ThemeProvider>
);

export const Default = Template.bind({});
