import 'core-js/stable';
import React from 'react';
import ReactDOM from 'react-dom';
import { hot } from 'react-hot-loader';
import App from './components/app';

const HotRootComponent = hot(module)(App);

ReactDOM.render(<HotRootComponent />, document.getElementById('root'));
