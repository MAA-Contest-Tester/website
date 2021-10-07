import React, { useState, useEffect } from 'react';
import { getAllAMC, getAllAIME, ContestYear } from '../lib/fetchContests';
import { Link } from 'react-router-dom';
import { getExamsSolved } from '../lib/user_db';
import { perfectScore, correctAnswers, getNetScore } from '../lib/grade';
import StatusBar from './StatusBar';
import { auth } from './Firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Error403 } from './Errors';

enum ContestMenuType {
	AMC8,
	AMC10,
	AMC12,
	AIME,
}

const results = new Map<ContestMenuType, ContestYear[]>();
results.set(ContestMenuType.AMC8, getAllAMC(8));
results.set(ContestMenuType.AMC10, getAllAMC(10));
results.set(ContestMenuType.AMC12, getAllAMC(12));
results.set(ContestMenuType.AIME, getAllAIME());

function MenuItem(props: { name: string; done?: boolean; perfect?: boolean }) {
	const title = props.name.split('_').join(' ');
	return (
		<Link to={`/${props.name}`}>
			<div
				className={
					'transition duration-100 w-56 mx-1 my-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1 rounded-xl p-3 text-center dark:text-white' +
					' ' +
					(props.perfect
						? 'bg-green-100 dark:bg-green-600'
						: props.done
						? 'bg-yellow-100 dark:bg-yellow-600'
						: 'bg-gray-100 dark:bg-gray-800')
				}
			>
				<div className='text-xl'> {title} </div>
			</div>
		</Link>
	);
}

export default function Dashboard() {
	// preserve selection
	const bounds = (x: number) => 0 <= x && x < 4;
	const [contestType, setContestType] = useState(
		localStorage.getItem('maatester_selected') &&
			bounds(parseInt(localStorage.getItem('maatester_selected')!))
			? parseInt(localStorage.getItem('maatester_selected')!)
			: ContestMenuType.AMC8
	);

	const [user] = useAuthState(auth);
	// take from localstorage cache
	const [solved, setSolved] = useState(
		new Set<string>(
			JSON.parse(localStorage.getItem('maatester_solvedset') || '[]') || []
		)
	);
	const [perfect, setPerfect] = useState(
		new Set<string>(
			JSON.parse(localStorage.getItem('maatester_perfectset') || '[]') || []
		)
	);
	const [problemsSolved, setProblemsSolved] = useState(
		parseInt(localStorage.getItem('maatester_solvednumber') || '0') || 0
	);
	const [netScore, setNetScore] = useState(
		parseInt(localStorage.getItem('maatester_points') || '0') || 0
	);

	useEffect(() => {
		if (!user) return;
		getExamsSolved(user.email!)
			.then((result) => {
				const s: Set<string> = new Set();
				const p: Set<string> = new Set();
				// number of problems solved
				let solved = 0;
				let score = 0;
				result.forEach((d: any) => {
					if (d.exam) {
						s.add(d.exam);
						if (d.score && perfectScore(d.score)) {
							p.add(d.exam);
						}
					}
					if (d.correct) {
						solved += correctAnswers(d.correct);
						score += getNetScore(d.correct, d.exam);
					}
				});
				setSolved(s);
				setPerfect(p);
				setProblemsSolved(solved);
				setNetScore(score);
				// cache to localstorage
				localStorage.setItem('maatester_solvednumber', solved.toString());
				localStorage.setItem('maatester_points', score.toString());
				localStorage.setItem(
					'maatester_perfectset',
					JSON.stringify(Array.from(p.values()))
				);
				localStorage.setItem(
					'maatester_solvedset',
					JSON.stringify(Array.from(s.values()))
				);
			})
			.catch((e) => console.log('error', e));
	}, [user]);

	return user ? (
		<>
			<div className='m-2 p-3'>
				<h1 className='mx-0 my-2 font-bold dark:text-white'> Dashboard </h1>
				<StatusBar solved={problemsSolved} score={netScore} />
				<div className='flex flex-row flex-wrap py-2 justify-center sm:justify-start'>
					{['AMC 8', 'AMC 10', 'AMC 12', 'AIME'].map((val, index) => (
						<button
							className={
								'transition duration-100 w-40 rounded-lg m-2 my-3 p-3 text-lg transform hover:-translate-y-1 text-center text-white font-semibold' +
								' ' +
								(index === contestType
									? 'bg-gradient-to-r from-yellow-400 to-yellow-600 -translate-y-1'
									: 'bg-gradient-to-r from-blue-400 to-blue-500 shadow-lg')
							}
							key={'MenuBar' + index}
							onClick={(e) => {
								setContestType(index);
								localStorage.setItem('maatester_selected', index.toString());
							}}
						>
							{val}
						</button>
					))}
				</div>
				{results.get(contestType)!.map((y: ContestYear) => (
					<>
						<h2 className='text-2xl m-2 font-semibold dark:text-white'>
							{y.year}
						</h2>
						<div className='flex flex-row flex-wrap justify-center sm:justify-start'>
							{y.contests.map((s) => (
								<MenuItem
									name={s}
									done={solved.has(s)}
									perfect={perfect.has(s)}
								/>
							))}
						</div>
					</>
				))}
			</div>
		</>
	) : (
		<Error403 />
	);
}
