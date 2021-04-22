import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Loading } from '../components/Loading';
import { PageProps } from '../App';

const Home = React.lazy(() => {
  return Promise.all([import('../pages/Home'), new Promise((resolve) => setTimeout(resolve, 500))]).then(
    ([moduleExports]) => moduleExports
  );
});
const Room = React.lazy(() => {
  return Promise.all([import('../pages/Room'), new Promise((resolve) => setTimeout(resolve, 500))]).then(
    ([moduleExports]) => moduleExports
  );
});
const Header = React.lazy(() => {
  return Promise.all([import('../components/Header'), new Promise((resolve) => setTimeout(resolve, 0))]).then(
    ([moduleExports]) => moduleExports
  );
});

export const Routes: React.FC<PageProps> = (props) => {
  return (
    <Router>
      <React.Suspense fallback={<Loading />}>
        <Switch>
          <Route path="/" exact={true}>
            <Home {...props} />
          </Route>
          <Route path="/room" exact={true}>
            <Header />
            <Room {...props} />
          </Route>
        </Switch>
      </React.Suspense>
    </Router>
  );
};
