import React from 'react';

function Ref(props: { link: string; name: string }) {
	return (
		<a
			className='text-blue-300 hover:text-blue-400'
			href={props.link}
			target='_blank'
			rel='noreferrer'
		>
			{props.name}
		</a>
	);
}

export default function Citation() {
	return (
		<div className='text-gray-400 m-2 p-3'>
			This website is hosted on{' '}
			<Ref link='https://netlify.com' name='Netlify' /> and is written with{' '}
			<Ref link='https://reactjs.org' name='React' />,{' '}
			<Ref link='https://firebase.google.com' name='Firebase' />, and{' '}
			<Ref link='https://tailwindcss.com' name='Tailwind CSS' />. Source code is
			publicly available on{' '}
			<Ref link='https://github.com/junikimm717/MAA_Tester' name='Github' />.
			<br />
			<br />© 2021-2021 Juni C. Kim and Tei D. Kim
		</div>
	);
}
