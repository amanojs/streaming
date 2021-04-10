import * as React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Loading } from '../components/Loading';
import { PageProps } from '../App';
import { Header } from '../components/Header';

const Home = React.lazy(() => {
  return Promise.all([import('../pages/Home'), new Promise((resolve) => setTimeout(resolve, 1000))]).then(
    ([moduleExports]) => moduleExports
  );
});
const Room = React.lazy(() => {
  return Promise.all([import('../pages/Room'), new Promise((resolve) => setTimeout(resolve, 1000))]).then(
    ([moduleExports]) => moduleExports
  );
});

interface RouteBase {
  path: string;
  exact: boolean;
  name: string;
  component: React.LazyExoticComponent<React.FC<any>> | React.FC<any>;
}

const routebases: Array<RouteBase> = [
  { path: '/', exact: true, name: 'Home', component: Home },
  { path: '/room', exact: true, name: 'Room', component: Room }
];

export const Routes: React.FC<PageProps> = (props) => {
  const makeRoute = (routebase: RouteBase) => {
    return (
      <Route path={routebase.path} exact={routebase.exact}>
        {routebase.path !== '/' ? <Header /> : false}
        <routebase.component {...props} />
      </Route>
    );
  };

  return (
    <Router>
      <React.Suspense fallback={<Loading />}>
        <Switch>{routebases.map((routebase: RouteBase) => makeRoute(routebase))}</Switch>
      </React.Suspense>
    </Router>
  );
};
