import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './Firebase';
import ContestMenu from './ContestMenu';
import '../index.css';

export default function Home() {
	const [user] = useAuthState(auth);
	const description = (
		<div className='flex flex-col md:flex-row'>
			<div className='text-xl rounded-lg shadow-lg p-2 m-2 bg-gray-100 w-96 text-center items-center flex'>
				This React/Firebase Website is designed to help facilitate AMC/AIME Test
				Prep. It supports all AMC 10/12 contests from 2000 onwards, all AMC 8
				contests from 1999 onwards, and all AIME contests from 1983 onwards.
			</div>
			<div className='text-xl rounded-lg shadow-lg p-2 m-2 bg-gray-100 w-96 text-center items-center flex'>
				If you do not have an account, logging in will automatically create a
				new account for you.
			</div>
		</div>
	);
	return (
		<div className='m-2 p-3'>
			{!user ? description : <ContestMenu email={user.email} />}
		</div>
	);
}
