import ReactDOM from 'react-dom/client';
import React from 'react';
import App from './App';
import { createBrowserHistory, BrowserHistory } from 'history';
import { matchPath } from 'react-router-dom';

let root: ReactDOM.Root;

function mount(el: Element, pathname: string, options?: { onNavigate: () => ()=> void }) {
  const history: BrowserHistory = createBrowserHistory();
  function onParentNavigate({ pathname: nextPathname }: { pathname: string }) {
    console.log(`parent navigated from ${pathname} to ${nextPathname}`)
    history.push(nextPathname);
  }
  const onNavigate = options?.onNavigate;
  onNavigate && history.listen(onNavigate);
  root = root || ReactDOM.createRoot(el);
  root.render(<App history={history} />);

  return {
    onParentNavigate
  };
};


if (process.env.NODE_ENV === 'development') {
  const devRoot = document.querySelector('#_shop-dev-root');

  if (devRoot) {
    mount(devRoot );
  }
}

export default mount;
