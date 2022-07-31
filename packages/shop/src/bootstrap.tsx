import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createMemoryHistory } from 'history';
const mount: (
  arg0: Element,
  arg1?: { onNavigate: () => {} }
) => { onParentNavigate: () => void } = (el, options) => {
  const onNavigate = options?.onNavigate;
  const history = createMemoryHistory();
  onNavigate && history.listen(onNavigate);
  ReactDOM.render(<App history={history} />, el);

  return {
    onParentNavigate() {
      console.log(`container just navigateds`);
    }
  };
};
if (process.env.NODE_ENV === 'development') {
  const devRoot = document.querySelector('#_shop-dev-root');
  if (devRoot) {
    mount(devRoot);
  }
}

export default mount;
