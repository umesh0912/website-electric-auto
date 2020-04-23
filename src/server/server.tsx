import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';
import compression from 'compression';
import { Provider } from 'react-redux';
// import Loadable from 'react-loadable';
import { Helmet } from 'react-helmet';
import express from 'express';
import { StaticRouter, matchPath } from 'react-router-dom';
import { createStore } from 'redux';
import rootReducer from '../reducers';
import Routes from '../routerLinks';
import RouteMap from './../router';
import { filterData } from '../utils/filters';
const mobileDetect = require('mobile-detect');
import errorHandler from './errorHandler';
import { renderHTML } from './helper';
const app = express();
const data = require('../../build/stats.json');
const PORT = process.env.PORT || 4001;

app.use(compression());
app.use(express.static('build'));

// temp favicon fix
app.get('/favicon.ico', (req, res) => res.status(204));

const mainFiles = data['assetsByChunkName']['main'];
const vendorfiles = data['assetsByChunkName']['vendor'];

app.get('*', (req, res, next) => {
  const md = new mobileDetect(req.headers['user-agent']);
  const context = {};
  let preloadedState = {
    common: {
      isMobile: md.mobile() ? true : false,
      isBot: md.is('bot'),
    },
  };
  const currentRoute = Routes.find((route) => matchPath(req.url, route)) || {
    routeName: 'pagenotfound',
  };

  let promise;
  try {
    promise = currentRoute['loadData']
      ? currentRoute['loadData'](req.url)
      : Promise.resolve({});

    promise
      .then((response: any) => {
        const cleanedData = filterData(currentRoute.routeName, response) || {};
        preloadedState = { ...preloadedState, ...cleanedData };
        const store = createStore(rootReducer, preloadedState);

        const content = ReactDOMServer.renderToString(
          <Provider store={store}>
            <StaticRouter location={req.path} context={context}>
              <div>
                <RouteMap />
              </div>
            </StaticRouter>
          </Provider>
        );
        const helmet = Helmet.renderStatic();
        const finalState = store.getState();
        promise = null;

        return res.send(
          renderHTML(mainFiles, content, finalState, vendorfiles, helmet)
        );
      })
      .catch((e) => {
        next(e);
      });
  } catch (e) {
    next(e);
  }
});

app.use(errorHandler);

app.listen(PORT, () =>
  console.log(`Frontend service listening on port: ${PORT}`)
);
