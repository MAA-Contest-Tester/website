import React from 'react';
import Block, { Blue } from './Block';

export default function Info() {
	return (
		<div className='m-2 p-3 dark:text-white'>
			<h1 className='font-bold text-center text-5xl dark:text-white'>
				<span className=' text-transparent bg-clip-text bg-blue-700 dark:bg-blue-500'>
					Contest
				</span>{' '}
				Information
			</h1>
			<div className='flex flex-col gap-y-5'>
				<Block name={<Blue>AMC 8</Blue>}>
					The American Mathematics Competition 8 (AMC 8) is a 40 minute, 25
					question multiple choice exam taken by middle schoolers. The score is
					calculated as the number of correct answers and various distinctions
					exist for those that meet certain criteria and scores.
				</Block>
				<Block name={<Blue>AMC 10</Blue>}>
					The American Mathematics Competition 10 (AMC 10) is a 75 minute,
					25-question multiple choice test offered by the Mathematical
					Association of America. It has 25 questions, with correct answers
					worth 6 points, blank answers worth 1.5 points, and 0 points for
					incorrect answers (discouraging guessing). The perfect score in this
					contest is 150, and contestants generally need to score around a 110
					(top 2.5-5%) to participate in the AIME.
				</Block>
				<Block name={<Blue>AMC 12</Blue>}>
					The American Mathematics Competition 12 (AMC 12) is a 25-question
					multiple-choice exam identical in format to the AMC 10. However, it
					does cover topics that are traditionally not covered by the tenth
					grade, such as trigonometry and logarithms. The top 5-10% participate
					in the AIME, and participants score between 90 to 100 to advance.
				</Block>
				<Block name={<Blue>AIME</Blue>}>
					The American Invitational Mathematics Examination is a 3 hour,
					15-question exam where all answers are integers between 0 and 999. The
					questions are usually far more difficult than the AMC 10 or 12, and
					participants who score well on the exam can qualify for the USA
					Mathematical (Junior) Olympiad.
				</Block>
			</div>
		</div>
	);
}
