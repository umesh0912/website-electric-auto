import { createStore } from 'redux';
import rootReducer from '../reducers';
import ReactDOMServer from 'react-dom/server';
import { Provider } from 'react-redux';
import React from 'react';
import { StaticRouter } from 'react-router';
import RouteMap from './../router';
import { renderHTML } from './helper';
const data = require('../../build/stats.json');
const mainFiles = data['assetsByChunkName']['main'];
const vendorfiles = data['assetsByChunkName']['vendor'];

const mobileDetect = require('mobile-detect');

const errorHandler = (err: any, req: any, res: any, next: any) => {
  const md = new mobileDetect(req.headers['user-agent']);
  const context = {};
  let preloadedState = {
    common: {
      isMobile: md.mobile() ? true : false,
      isBot: md.is('bot'),
    },
  };

  if (err) {
    const cleanedData = {
      error: {
        is404: [400, 401].indexOf(res.statusCode) > -1,
        is500:
          [500, 501, 502, 503].indexOf(res.statusCode) > -1 ||
          (err.response === undefined && err.isAxiosError),
      },
    };
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
    const finalState = store.getState();
    res.send(renderHTML(mainFiles, content, finalState, vendorfiles, null));
  }
  next();
};

export default errorHandler;
