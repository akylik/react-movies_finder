import React, { Suspense, lazy } from 'react';
import { Route, Switch } from 'react-router-dom';
import NotFoundView from './views/NotFoundView';
import AppBar from './components/AppBar';
import routes from './routes';

const HomeView = lazy(() =>
  import('./views/HomeView.js' /* webpackChunkName: "home-view" */),
);

const MoviesPageView = lazy(() =>
  import('./views/MoviesPageView.js' /* webpackChunkName: "movies-view" */),
);

const MovieDetailsView = lazy(() =>
  import('./views/MovieDetailsView.js' /* webpackChunkName: "movies-view" */),
);

const App = () => (
  <>
    <AppBar />

    <Suspense fallback={<h1>Загружаем...</h1>}>
      <Switch>
        <Route exact path={routes.home} component={HomeView} />
        <Route path="/movies/:movieId" component={MovieDetailsView} />
        <Route path={routes.movies} component={MoviesPageView} />
        <Route component={NotFoundView} />
      </Switch>
    </Suspense>
  </>
);

export default App;
