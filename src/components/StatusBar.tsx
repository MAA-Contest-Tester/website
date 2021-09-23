import React, { useState } from 'react';
import { numberOfProblems } from '../lib/fetchContests';

const problems = numberOfProblems();

type Level = {
	min: number;
	message: React.ReactNode;
};

const levels: Level[] = [
	{ min: 0, message: <span className='text-gray-400'> Noob </span> },
	{ min: 50, message: <span className='text-green-400'> Apprentice </span> },
	{ min: 200, message: <span className='text-blue-400'> Officer </span> },
	{ min: 600, message: <span className='text-yellow-400'> Master </span> },
	{
		min: 1500,
		message: <span className='text-red-400'> Supreme Master </span>,
	},
	{
		min: 3000,
		message: (
			<span className='text-red-400'>
				<span className='dark:text-white text-black'>G</span>od Mode{' '}
			</span>
		),
	},
];

export default function StatusBar(props: { solved: number }) {
	const percentage = `${((props.solved / problems) * 100).toPrecision(3)}%`;
	let message = null;
	levels.forEach((x: Level) => {
		if (x.min <= props.solved) message = x.message;
	});

	const [verbose, setVerbose] = useState(false);
	return (
		<div className='dark:bg-gray-800 bg-gray-100 dark:text-white text-black m-2 p-3 rounded-xl shadow-lg font-bold'>
			<div className='text-green-700 dark:text-green-300 m-2 text-lg'>
				You have solved {props.solved} problems!
			</div>
			<div className='bg-gray-100 dark:bg-gray-800 dark:text-white m-2 text-lg'>
				Level: {message}{' '}
				<button
					onClick={() => {
						setVerbose(!verbose);
					}}
					className='text-gray-500 underline mx-5'
				>
					?
				</button>
			</div>
			<div className='dark:bg-yellow-700 bg-yellow-300 dark:text-white text-black m-2 p-0 rounded-xl'>
				<div style={{ width: percentage }}>
					<div className='bg-green-300 h-5 rounded-xl' />
				</div>
			</div>
			{verbose ? (
				<div className='m-2 flex flex-row flex-wrap justify-between gap-4'>
					<div>
						Minimum Problems Per Level
						{levels.map((x: Level) => (
							<div>
								{x.message}: {x.min}{' '}
							</div>
						))}
					</div>
					<div className='flex items-start'>
						<button
							onClick={() => {
								setVerbose(!verbose);
							}}
							className='text-white bg-red-400 p-2 rounded-lg my-1'
						>
							{verbose ? 'X' : '?'}
						</button>
					</div>
				</div>
			) : null}
		</div>
	);
}
