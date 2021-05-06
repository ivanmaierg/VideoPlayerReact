/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable global-require */
import express from 'express';
import dotenv from 'dotenv';
import webpack from 'webpack';

import helmet from 'helmet';

import React from 'react';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server';
import { createStore } from 'redux';
import { renderRoutes } from 'react-router-config';
import { StaticRouter } from 'react-router-dom';
import serverRoutes from '../frontend/routes/serverRoutes';

import reducer from '../frontend/reducers/reducer';
import initialState from '../frontend/initalState';

import getManifest from './getManifest';

dotenv.config();

const { ENV, PORT } = process.env;
const app = express();

if (ENV === 'development') {
  console.log('Development config');
  // webpack integration
  const webpackConfig = require('../../webpack.config');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const compiler = webpack(webpackConfig);
  const serverConfig = { port: PORT, hot: true };

  app.use(webpackDevMiddleware(compiler, serverConfig));
  app.use(webpackHotMiddleware(compiler));
} else {
  //get manifest
  app.use((req, res, next) => {
    // retorna el manifest si este no existe
    if (!req.hashManifest) req.hashManifest = getManifest();
    next();
  });
  app.use(express.static(`${__dirname}/public`));
  app.use(helmet({ contentSecurityPolicy: false }));
  app.use(helmet.permittedCrossDomainPolicies());
  app.disable('x-powered-by');
}
const setResponse = (html, preloadedState, manifest) => {
  // const mainStyles = manifest ? manifest['main.css'] : 'assets/app.css'; //original
  const mainStyles = manifest ? manifest['vendors.css'] : 'assets/app.css';
  //al parecer splitChunks genera un vendor para los css y lo mapea en el manifest con otro nombre
  const mainBuild = manifest ? manifest['main.js'] : 'assets/app.js';
  const vendorBuild = manifest ? manifest['vendors.js'] : 'assets/app.js';
  return (
    `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="description" content="Space video Inc , video player">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link rel="stylesheet" href=${mainStyles} type="text/css">
      <title>Document</title>
  </head>
  <body>
      <div id="root">
      ${html}
      </div>
      <script type="text/javascript">
          window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')};
      </script>
      <script type="module" src=${mainBuild} type="text/javascript"></script>
        <script type="module" src=${vendorBuild} type="text/javascript"></script>
      </body>
</html>
  `);
};

const renderApp = (req, res) => {
  const store = createStore(reducer, initialState);
  const preloadedState = store.getState();
  const html = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.url} context={{}}>
        {renderRoutes(serverRoutes)}
      </StaticRouter>
    </Provider>,
  );
  res.send(setResponse(html, preloadedState, req.hashManifest));
};

app.get('*', renderApp);

app.listen(PORT, (err) => {
  if (err) console.log(err);
  else console.log(`Server listen on port http://localhost:${PORT}`);
});
