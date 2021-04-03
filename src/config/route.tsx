import * as React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Loading } from '../components/Loading';

const Home = React.lazy(() => {
  return Promise.all([import('../pages/Home'), new Promise((resolve) => setTimeout(resolve, 1000))]).then(
    ([moduleExports]) => moduleExports
  );
});

interface RouteBase {
  path: string;
  exact: boolean;
  name: string;
  component: React.LazyExoticComponent<React.FC> | React.FC;
}

const routebases: Array<RouteBase> = [{ path: '/', exact: true, name: 'Home', component: Home }];

export const Routes: React.FC = () => {
  const makeRoute = (routebase: RouteBase) => {
    return (
      <Route path={routebase.path} exact={routebase.exact}>
        <routebase.component />
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
