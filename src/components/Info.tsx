import React from 'react';

function ContestInfo(props: { name: string; children?: React.ReactNode }) {
	return (
		<div className='flex flex-row flex-wrap justify-center my-5'>
			<div className='m-2 p-5 bg-gray-100 dark:bg-gray-800 dark:text-white font-bold rounded-xl'>
				<h2 className='font-bold text-2xl text-center text-blue-700 dark:text-blue-500'>
					{props.name}
				</h2>
				<br />
				{props.children}
			</div>
		</div>
	);
}

export default function Info() {
	return (
		<div className='m-2 p-3 dark:text-white'>
			<h1 className='font-bold text-center text-5xl dark:text-white'>
				<span className=' text-transparent bg-clip-text bg-blue-700 dark:bg-blue-500'>
					Contest
				</span>{' '}
				Information
			</h1>
			<ContestInfo name='AMC 8'>
				The American Mathematics Competition 8 (AMC 8) is a 40 minute, 25
				question multiple choice exam taken by middle schoolers. The score is
				calculated as the number of correct answers and various distinctions
				exist for those that meet certain criteria and scores.
			</ContestInfo>
			<ContestInfo name='AMC 10'>
				The American Mathematics Competition 10 (AMC 10) is a 75 minute,
				25-question multiple choice test offered by the Mathematical Association
				of America. It has 25 questions, with correct answers worth 6 points,
				blank answers worth 1.5 points, and 0 points for incorrect answers
				(discouraging guessing). The perfect score in this contest is 150, and
				contestants generally need to score around a 110 (top 2.5-5%) to
				participate in the AIME.
			</ContestInfo>
			<ContestInfo name='AMC 12'>
				The American Mathematics Competition 12 (AMC 12) is a 25-question
				multiple-choice exam identical in format to the AMC 10. However, it does
				cover topics that are traditionally not covered by the tenth grade, such
				as trigonometry and logarithms. The top 5-10% participate in the AIME,
				and participants score between 90 to 100 to advance.
			</ContestInfo>
			<ContestInfo name='AIME'>
				The American Invitational Mathematics Examination is a 3 hour,
				15-question exam where all answers are integers between 0 and 999. The
				questions are usually far more difficult than the AMC 10 or 12, and
				participants who score well on the exam can qualify for the USA
				Mathematical (Junior) Olympiad.
			</ContestInfo>
		</div>
	);
}
