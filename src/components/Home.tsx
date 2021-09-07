import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './Firebase';
import ContestMenu from './ContestMenu';
import '../index.css';

export function AboutPage() {
	return (
		<>
			<h1> The MAA Contest Tester </h1>
			<div className='flex flex-row flex-wrap'>
				<div className='text-xl rounded-lg shadow-lg p-2 m-3 bg-gray-100 max-w-xl text-center items-center flex'>
					This React/Firebase Website is designed to help facilitate AMC/AIME
					Test Prep and practice tests. It supports all AMC 10/12 contests from
					2000 onwards, all AMC 8 contests from 1999 onwards, and all AIME
					contests from 1983 onwards.
				</div>
				<div className='text-xl rounded-lg shadow-lg p-2 m-3 bg-gray-100 max-w-xl text-center items-center flex'>
					If you do not have an account, logging in will automatically create a
					new account for you.
				</div>
			</div>
		</>
	);
}

export default function Home() {
	const [user] = useAuthState(auth);

	return (
		<div className='m-2 p-3'>
			{!user ? <AboutPage /> : <ContestMenu email={user.email} />}
		</div>
	);
}
