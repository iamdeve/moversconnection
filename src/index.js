import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import './I18next';
import * as serviceWorker from './serviceWorker';
import App from './App';

require('dotenv').config();

ReactDOM.render(
  <Suspense fallback={<div>Please wait...</div>}>
    <App />
  </Suspense>,
  document.getElementById('root')
);

serviceWorker.unregister();
