import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './Firebase';
import ContestMenu from './ContestMenu';
import { Error403 } from './Errors';
import '../index.css';
import { Link } from 'react-router-dom';
import Logo from '../svg/Logo.svg';

export function AboutPage() {
	return (
		<>
			<div className='m-2 p-3 dark:text-white'>
				<div className='text-center'>
					<img src={Logo} alt='Logo' className='w-20 mx-5 inline' />
				</div>
				<h1 className='font-bold text-center text-5xl dark:text-white'>
					The MAA{' '}
					<span className=' text-transparent bg-clip-text bg-blue-700 dark:bg-blue-500'>
						Contest Tester
					</span>
				</h1>
				<div className='flex flex-row flex-wrap justify-center'>
					<div className='m-2 p-3 text-xl max-w-2xl'>
						An integrated testing environment designed to help you achieve your
						math contest goals by automatically{' '}
						<span className='font-bold'> recording</span> and{' '}
						<span className='font-bold'>grading</span> practice contests
					</div>
				</div>
				<div className='m-2 p-3 text-xl text-center'>
					<h2 className='font-bold text-3xl'>
						<span className=' text-transparent bg-clip-text bg-blue-700 dark:bg-blue-500'>
							Support
						</span>{' '}
						for all modern non-proof MAA Contests
					</h2>
					<div className='m-3 flex justify-center'>
						<ul className='bg-gray-100 dark:bg-gray-800 dark:text-white min-w-96 m-2 p-3 rounded-xl text-left'>
							<li>
								<span className=' text-transparent bg-clip-text bg-blue-700 dark:bg-blue-500 font-bold'>
									{' '}
									All AMC 8{' '}
								</span>{' '}
								Contests (1999 -)
							</li>
							<li>
								<span className=' text-transparent bg-clip-text bg-blue-700 dark:bg-blue-500 font-bold'>
									{' '}
									All AMC 10/12{' '}
								</span>{' '}
								Contests (2000 -)
							</li>
							<li>
								<span className=' text-transparent bg-clip-text bg-blue-700 dark:bg-blue-500 font-bold'>
									{' '}
									All AIME{' '}
								</span>{' '}
								Contests (1983 -)
							</li>
						</ul>
					</div>
				</div>
				<div className='m-2 p-3 text-xl text-center'>
					<h2 className='font-bold text-3xl'>
						<span className=' text-transparent bg-clip-text bg-blue-700 dark:bg-blue-500'>
							Automated
						</span>{' '}
						Contest Grading
					</h2>
					<div className='m-3 flex justify-center'>
						<div className='bg-gray-100 dark:bg-gray-800 dark:text-white w-96 m-2 p-3 rounded-xl text-left'>
							The site uses a firebase function to scrape data from the AOPS
							answer key and parses the answers out with a regular expression.
						</div>
					</div>
				</div>
			</div>
			<div className='m-2 p-3 text-xl text-center'>
				<Link to='/preview'>
					<button className='bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl p-4 m-2 text-3xl transform hover:-translate-y-1 shadow-lg font-bold'>
						Preview
					</button>
				</Link>
			</div>
		</>
	);
}

export default function Home() {
	const [user] = useAuthState(auth);

	return <>{user ? <ContestMenu email={user.email} /> : <Error403 />}</>;
}
