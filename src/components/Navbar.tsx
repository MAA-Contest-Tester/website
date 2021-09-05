import React from 'react';

import { auth, LogIn, LogOut } from './Firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import Home from '../svg/Home.svg';

export default function Navbar() {
	const [user] = useAuthState(auth);
	return (
		<div className='sticky left-3 top-3 bg-yellow-400 shadow-lg rounded-lg flex flex-row justify-between items-center m-3 p-1'>
			<div className='text-black text-3xl m-2'>MAA Contest Tester</div>
			<div className='right-0'>
				{user ? (
					<div className='flex flex-col md:flex-row'>
						<Link to='/'>
							<div className='auth'>
								<img src={Home} className='w-7' alt='Home Logo' />
							</div>
						</Link>
						<LogOut />
					</div>
				) : (
					<LogIn />
				)}
			</div>
		</div>
	);
}
