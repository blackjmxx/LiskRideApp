import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App'
import { BrowserRouter } from 'react-router-dom'

import './styles/normalize.css'
import './styles/layout.css'
import './styles/animation.css'
import * as serviceWorker from "./serviceWorker";

window.addEventListener('beforeinstallprompt', (e) => {
    e.prompt();
});

window.onload = () => {
  ReactDOM.render((
    <BrowserRouter>
      <App />
    </BrowserRouter>
  ), document.getElementById('app'));

  document.body.style.height = window.innerHeight + 'px';
}

serviceWorker.register();