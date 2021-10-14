import React, { useEffect, useState } from 'react';
import { Switch } from '@headlessui/react';

export default function Settings() {
	const [darkmode, setDarkMode] = useState(
		localStorage.getItem('darkmode') === 'true'
	);
	useEffect(() => {
		localStorage.setItem('darkmode', darkmode.toString());
		if (darkmode) {
			document.body.classList.add('dark');
			document.body.classList.add('bg-gray-900');
			document.body.classList.add('text-white');
		} else {
			document.body.classList.remove('dark');
			document.body.classList.remove('bg-gray-900');
			document.body.classList.remove('text-white');
		}
	}, [darkmode]);
	return (
		<div className='m-2 p-3'>
			<h1 className='font-bold dark:text-white my-5'> Settings </h1>
			<div>
				<span className='m-2 p-3 dark:text-white text-xl rounded-lg shadow-lg bg-gray-200 dark:bg-gray-700 font-bold'>
					<span className='mx-5'>Dark Mode</span>
					<Switch
						checked={darkmode}
						onChange={setDarkMode}
						className={`${
							darkmode ? 'bg-blue-600' : 'bg-gray-300'
						} relative inline-flex items-center h-6 rounded-full w-11`}
					>
						<span
							className={`${
								darkmode ? 'translate-x-6' : 'translate-x-1'
							} inline-block w-4 h-4 transform duration-100 bg-white rounded-full`}
						/>
					</Switch>
				</span>
			</div>
		</div>
	);
}
