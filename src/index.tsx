import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Navbar from './components/Navbar';
import Home, { AboutPage } from './components/Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Contest from './components/getContest';
import { Error404 } from './components/Errors';
import Citation from './components/Citation';
import Info from './components/Info';

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
						<Route path='/' exact component={AboutPage} />
						<Route path='/home' exact component={Home} />
						<Route path='/info' exact component={Info} />
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
