import React from 'react';
import ReactDOM from 'react-dom/client';
import { MemoryRouter, BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';

// Mount function to start up the app
let root: ReactDOM.Root | null = null;
const mount = (el: Element, { onNavigate, initialPath='/',  isIsolated= true }:
{ onNavigate?: ({pathname}:{pathname: string}) => void, initialPath?: string, isIsolated?: boolean}) => {
	if(!root) {
		root = ReactDOM.createRoot(el);
	}
	function getApp() {
		return <App onNavigate={onNavigate} initialPath={initialPath}/>
	}
	root.render(
		isIsolated ? 
		<MemoryRouter initialEntries={[initialPath]}>
			{getApp()}
		</MemoryRouter> : 
		<BrowserRouter>
			{getApp()}
		</BrowserRouter>
	);
	function onParentNavigate({pathname: nextPathname}:{pathname: string}) {
		if(nextPathname !== initialPath){
			mount(el, {onNavigate, initialPath: nextPathname})
		}
	}
	return onParentNavigate;
};

if (process.env.NODE_ENV === 'development') {
	const devRoot = document.querySelector('#_marketing-dev-root');
	if (devRoot) {
		mount(devRoot,{isIsolated: false});
	}
}

export default mount;
