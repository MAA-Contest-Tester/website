import React from 'react';

export function Error404() {
	return (
		<div className='text-3xl m-2 p-3'>404 requested page is not present.</div>
	);
}

export function Error403() {
	return (
		<div className='text-3xl m-2 p-3'>
			403 you must register with an account to access contests.
		</div>
	);
}
