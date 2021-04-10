import { Button } from '@material-ui/core';
import * as React from 'react';

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
        ref={props.inputRef}
        style={{ opacity: 0, height: 1, width: 1, marginLeft: -1, padding: 0, border: 'none' }}
      />
      <Button {...{ onClick: props.onClick }}>Copy URL</Button>
    </React.Fragment>
  );
};
