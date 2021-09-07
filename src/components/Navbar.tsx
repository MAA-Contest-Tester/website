import React, { useState } from 'react';

import { auth, LogIn, LogOut } from './Firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import Home from '../svg/Home.svg';

export default function Navbar() {
	const [user] = useAuthState(auth);
	const [hidden, setHidden] = useState(false);
	return (
		<>
			{hidden ? (
				<div className='sticky left-0 top-0 z-50'>
					<div className='relative'>
						<div className='absolute right-0'>
							<button
								className='text-black bg-green-400 shadow-lg mx-3 my-2 px-2 py-6 rounded-lg text-2xl'
								onClick={() => setHidden(false)}
							>
								+
							</button>
						</div>
					</div>
				</div>
			) : (
				<div className='sticky left-3 top-3 bg-yellow-400 shadow-lg rounded-lg flex flex-row flex-wrap justify-between items-center m-3 p-1 z-50'>
					<Link to='/about'>
						<div className='text-black text-3xl m-2'>MAA Contest Tester</div>
					</Link>
					{user ? (
						<>
							<div className='text-black p-4 m-2 text-lg'>{user.email}</div>
							<div className='flex flex-wrap flex-row justify-between'>
								<Link to='/'>
									<div className='auth'>
										<img src={Home} className='w-7' alt='Home Logo' />
									</div>
								</Link>
								<LogOut />
								<button
									className='text-black mx-3 my-2 px-2 py-4 text-2xl bg-green-400 rounded-lg shadow-lg'
									onClick={() => setHidden(true)}
								>
									-
								</button>
							</div>
						</>
					) : (
						<LogIn />
					)}
				</div>
			)}
		</>
	);
}
