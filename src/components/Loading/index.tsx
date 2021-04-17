import * as React from 'react';
import { Box, CircularProgress } from '@material-ui/core';
import './main.css';

/** ローディング画面 */
export const Loading: React.FC = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      className="loadBox"
      style={{ background: 'linear-gradient(45deg, #23d5ab,#23a6d5,#ee7752)' }}
    >
      <CircularProgress size={60} style={{ color: '#fff' }} />
    </Box>
  );
};
