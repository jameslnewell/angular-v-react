import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { App } from './components/App';
import Github from './services/Github';

ReactDOM.render(
  <App github={new Github()} />,
  document.getElementById('app')
)