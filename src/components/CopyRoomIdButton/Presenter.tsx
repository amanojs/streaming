import * as React from 'react';
import { Button, Hidden, IconButton } from '@material-ui/core';
import { Share } from '@material-ui/icons';

interface PresenterProps {
  onClick: () => void;
  inputRef: React.RefObject<HTMLInputElement>;
  url: string;
}

export const Presenter: React.FC<PresenterProps> = (props: PresenterProps) => {
  return (
    <React.Fragment>
      <input
        type="text"
        value={props.url}
        onChange={() => {
          /* valueを設定しているとonChangeを設定しないといけないので */
        }}
        ref={props.inputRef}
        style={{ opacity: 0, height: 1, width: 1, marginLeft: -1, padding: 0, border: 'none' }}
      />
      <Hidden xsDown>
        <Button
          startIcon={<Share />}
          {...{ onClick: props.onClick, disableElevation: true, variant: 'contained', color: 'secondary' }}
          style={{ borderRadius: '1000px' }}
        >
          INVITE ROOM
        </Button>
      </Hidden>
      <Hidden smUp>
        <IconButton {...{ onClick: props.onClick, disableElevation: true, variant: 'contained', color: 'secondary' }}>
          <Share />
        </IconButton>
      </Hidden>
    </React.Fragment>
  );
};
