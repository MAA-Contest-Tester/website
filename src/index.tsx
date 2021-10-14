import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import Home from './components/Information/Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Contest from './components/getContest';
import { Error404 } from './components/Errors';
import Citation from './components/Citation';
import Info from './components/Information/Info';
import Preview from './components/Preview';
import Settings from './components/Settings';

function URLContest({ match: { params } }: { match: { params: any } }) {
	return <Contest name={params.contest} />;
}

function App() {
	return (
		<div className='min-w-screen min-h-screen'>
			<Router>
				<Navbar />
				<div className='mx-2 px-5'>
					<Switch>
						<Route path='/' exact component={Home} />
						<Route path='/dashboard' exact component={Dashboard} />
						<Route path='/preview' exact component={Preview} />
						<Route path='/info' exact component={Info} />
						<Route path='/settings' exact component={Settings} />
						<Route path='/:contest' component={URLContest} />
						<Route path='*' component={Error404} />
					</Switch>
					<Citation />
				</div>
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
