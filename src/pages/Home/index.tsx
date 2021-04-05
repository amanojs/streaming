import * as React from 'react';
import { Presenter } from './Presenter';
import { PageProps } from '../../App';

const Home: React.FC<PageProps> = (props: PageProps) => {
  return <Presenter getSocket={props.getSocket} />;
};

export default Home;
