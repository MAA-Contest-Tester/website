import React from 'react';
import Contest from './Contest';
import { gradeAMC } from '../../lib/grade';
import { AnswerState } from '../../lib/questions';

export default class AMC extends Contest {
	numberOfProblems() {
		return 25;
	}
	timeGiven() {
		return 75;
	}
	grade(url: string, updatedAnswer: any[]) {
		return gradeAMC(url, updatedAnswer);
	}
	score() {
		return `${this.state.correct
			.map((x) => {
				if (x === 0) return 1.5;
				else if (x === 1) return 6;
				else return 0;
			})
			.reduce((prev: number, val: number) => prev + val, 0)}/150`;
	}
	renderInputField(number: number) {
		return ['A', 'B', 'C', 'D', 'E', 'Clear'].map((letter) => (
			<>
				<button
					className={
						'rounded-full m-1 p-3 bg-gradient-to-r text-white' +
						' ' +
						(letter !== 'Clear'
							? this.state.answer[number] === letter
								? 'from-yellow-400 to-yellow-600'
								: 'from-blue-400 to-blue-600'
							: 'from-red-400 to-red-600')
					}
					onClick={() => {
						this.setState({
							answer: this.state.answer.map((el: string, index: number) => {
								if (index === number) {
									if (letter === 'Clear') return null;
									return letter;
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
				>
					{letter}
				</button>
				<br />
			</>
		));
	}
}
