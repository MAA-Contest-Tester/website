import React from 'react';

export default function Citation() {
	return (
		<div className='text-gray-400 m-2 p-3 text-center'>
			© 2021-{new Date().getFullYear()} Juni C. Kim and Tei D. Kim
		</div>
	);
}
