import * as React from 'react';
import { useHistory } from 'react-router';
import { Presenter } from './Presenter';

export const Header: React.FC = () => {
  const history = useHistory();

  const backClick = () => {
    history.goBack();
  };
  return <Presenter backClick={backClick} />;
};
