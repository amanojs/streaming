import * as React from 'react';
import { Presenter } from './Presenter';
import { PageProps } from '../../App';

const Home: React.FC<PageProps> = (props: PageProps) => {
  const [mout, mountkeeper] = React.useState();

  React.useEffect(() => {
    props.clearSocket();
  }, [mountkeeper]);
  return <Presenter {...props} />;
};

export default Home;
