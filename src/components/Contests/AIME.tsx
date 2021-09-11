import React from 'react';
import { gradeAIME } from '../../lib/grade';
import Contest from './Contest';
import { AnswerState } from '../../lib/questions';

export default class AIME extends Contest {
	numberOfProblems() {
		return 15;
	}
	timeGiven() {
		return 180;
	}
	grade(url: string, updatedAnswer: any[]) {
		return gradeAIME(url, updatedAnswer);
	}
	score() {
		return `${this.state.correct
			.filter((x) => x === 1)
			.reduce((a: number, b: number) => a + b, 0)}/15`;
	}
	renderInputField(number: number) {
		return (
			<input
				name={number.toString()}
				type='number'
				min={0}
				max={999}
				value={
					typeof this.state.answer[number] === 'string'
						? this.state.answer[number]
						: ''
				}
				onChange={(e) => {
					this.setState({
						answer: this.state.answer.map((el: string, index: number) => {
							if (index === number) {
								if (e.target.value === '') {
									return null;
								}
								return e.target.value;
							}
							return el;
						}),
						correct: this.state.correct.map(
							(el: AnswerState, index: number) => {
								if (index === number) {
									return AnswerState.undefined;
								}
								return el;
							}
						),
						saved: false,
					});
				}}
				className={
					'w-20 text-xl rounded-full text-white m-1 p-3 bg-gradient-to-r from-blue-400 to-blue-600 focus:outline-none focus:ring'
				}
			/>
		);
	}
}
