import * as React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { State } from '../../store/store';
import { Presenter } from './Presenter';

export const Header: React.FC = () => {
  const history = useHistory();
  const header = useSelector((state: State) => state.app.header);
  const backClick = () => {
    history.push('/');
  };
  return header ? <Presenter backClick={backClick} /> : <React.Fragment></React.Fragment>;
};

export default Header;
