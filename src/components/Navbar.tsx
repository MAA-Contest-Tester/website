import React, { useState } from 'react';

import { auth, LogIn, LogOut } from './Firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import Home from '../images/Home.svg';
import Remove from '../images/Remove.svg';
import Plus from '../images/Plus.svg';
import Info from '../images/Info.svg';
import Logo from '../images/Logo.png';
import SettingImage from '../images/Settings.png';
import { Transition } from '@headlessui/react';

export function AuthButton(props: { children: React.ReactNode }) {
	return (
		<div className='transition duration-100 ease-out bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl p-4 m-2 text-lg transform hover:-translate-y-1 shadow-lg font-bold'>
			{props.children}
		</div>
	);
}

export default function Navbar() {
	const [user] = useAuthState(auth);
	const hiddenState = localStorage.getItem('maatester_navbarmode') === 'true';
	const [hidden, setHidden] = useState(hiddenState);
	return (
		<>
			<Transition
				show={hidden}
				enter='transform transition duration-200'
				enterFrom='opacity-0 scale-x-95'
				enterTo='opacity-100 rotate-0 scale-100'
				leave='transform duration-200 transition ease-linear'
				leaveFrom='opacity-100 rotate-0 scale-100'
				leaveTo='opacity-0 scale-x-95'
				className='sticky left-0 top-0 z-50'
			>
				<div className='relative'>
					<div className='absolute left-0'>
						<button
							className='text-white bg-yellow-400 dark:bg-yellow-600 shadow-lg mx-3 my-3 px-2 py-5 rounded-lg text-2xl font-bold text-center'
							onClick={() => {
								setHidden(false);
								localStorage.setItem('maatester_navbarmode', 'false');
							}}
						>
							<img src={Plus} className='w-5' alt='expand navbar' />
						</button>
					</div>
				</div>
			</Transition>

			<Transition
				show={!hidden}
				enter='transform transition duration-200'
				enterFrom='opacity-0 scale-x-50'
				enterTo='opacity-100 rotate-0 scale-100'
				leave='transform duration-200 transition ease-linear'
				leaveFrom='opacity-100 rotate-0 scale-100'
				leaveTo='opacity-0 scale-x-50'
				className='sticky left-3 top-3'
			>
				<div className='bg-yellow-400 dark:bg-yellow-600 shadow-lg rounded-lg flex flex-row flex-wrap justify-between items-center m-3 p-1 z-50'>
					<div className='flex flex-row'>
						<button
							className='text-white mx-1 my-2 px-2 py-4 text-2xl rounded-lg font-bold text-center'
							onClick={() => {
								setHidden(true);
								localStorage.setItem('maatester_navbarmode', 'true');
							}}
						>
							<img src={Remove} className='w-5' alt='remove navbar' />
						</button>
					</div>

					{user ? (
						<>
							<div className='p-4 m-2 text-lg bg-gradient-to-r from-white to-gray-100 dark:from-gray-700 dark:to-gray-800 text-black dark:text-white rounded-xl shadow-sm'>
								<span className='font-bold'>{user.email}</span>
							</div>

							<div className='flex flex-wrap flex-row justify-between'>
								<Link to='/'>
									<div className='transition duration-100 ease-out bg-gradient-to-r from-gray-100 to-gray-400 text-white rounded-xl p-4 m-2 text-lg transform hover:-translate-y-1 shadow-lg font-bold'>
										<img src={Logo} className='w-7' alt='MAA Tester Logo' />
									</div>
								</Link>
								<Link to='/dashboard'>
									<AuthButton>
										<img src={Home} className='w-7' alt='Home Logo' />
									</AuthButton>
								</Link>
								<Link to='/info'>
									<AuthButton>
										<img src={Info} className='w-7' alt='Home Logo' />
									</AuthButton>
								</Link>
								<Link to='/settings'>
									<AuthButton>
										<img src={SettingImage} className='w-7' alt='Home Logo' />
									</AuthButton>
								</Link>
								<LogOut />
							</div>
						</>
					) : (
						<div className='flex flex-wrap flex-row justify-between'>
							<Link to='/'>
								<div className='bg-gradient-to-r from-gray-100 to-gray-400 text-white rounded-xl p-4 m-2 text-lg transform hover:-translate-y-1 shadow-lg font-bold'>
									<img src={Logo} className='w-7' alt='MAA Tester Logo' />
								</div>
							</Link>
							<Link to='/info'>
								<AuthButton>
									<img src={Info} className='w-7' alt='Home Logo' />
								</AuthButton>
							</Link>
							<Link to='/settings'>
								<AuthButton>
									<img src={SettingImage} className='w-7' alt='Home Logo' />
								</AuthButton>
							</Link>
							<LogIn />
						</div>
					)}
				</div>
			</Transition>
		</>
	);
}
