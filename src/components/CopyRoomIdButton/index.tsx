import { Button } from '@material-ui/core';
import * as React from 'react';

export const CopyRoomIdButton: React.FC = () => {
  const onClick = () => {
    console.log('押したよ！');
  };
  return <Button {...{ onClick: onClick }}>Copy URL</Button>;
};
