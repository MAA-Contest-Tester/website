import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Navbar from './components/Navbar';
import Home, { AboutPage } from './components/Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Contest from './components/getContest';
import { Error404 } from './components/Errors';

function URLContest({ match: { params } }: { match: { params: any } }) {
	return <Contest name={params.contest} />;
}

function App() {
	return (
		<div>
			<Router>
				<Navbar />
				<Switch>
					<Route path='/' exact component={Home} />
					<Route path='/about' exact component={AboutPage} />
					<Route path='/:contest' component={URLContest} />
					<Route path='*' component={Error404} />
				</Switch>
			</Router>
		</div>
	);
}

if (process.env.NODE_ENV === 'development') {
	ReactDOM.render(
		<React.StrictMode>
			<App />
		</React.StrictMode>,
		document.getElementById('root')
	);
} else {
	ReactDOM.render(<App />, document.getElementById('root'));
}
