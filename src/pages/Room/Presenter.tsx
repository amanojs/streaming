import * as React from 'react';
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { YoutubeController } from '../../components/YoutubeController';

export const Presenter: React.FC = () => {
  return (
    <React.Fragment>
      <div>
        <div>header</div>
      </div>
      <Box>
        <YoutubeController />
      </Box>
    </React.Fragment>
  );
};
