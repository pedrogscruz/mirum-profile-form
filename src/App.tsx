import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { Home, Form, Profile } from './pages';

// 'App' will manage redux and routes
function App() {
	return (
		<BrowserRouter>
			<Switch>
				<Route exact path="/" component={Home} />
				<Route path="/form" component={Form} />
				<Route path="/profile" component={Profile} />
				
				<Route component={() => <h1>404</h1>}/>
			</Switch>
		</BrowserRouter>
	);
}

export default App;