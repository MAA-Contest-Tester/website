import React from 'react';
import Contest from './Contest';
import { gradeAMC } from '../../lib/aops';

export default class AMC8 extends Contest {
	numberOfProblems() {
		return 25;
	}
	timeGiven() {
		return 40;
	}
	grade(url: string, updatedAnswer: any[]) {
		return gradeAMC(url, updatedAnswer);
	}
	score() {
		return `${this.state.correct
			.map((x) => {
				if (x === 1) return 1;
				else return 0;
			})
			.reduce((prev: number, val: number) => prev + val, 0)}/25`;
	}
	renderInputField(number: number) {
		return ['A', 'B', 'C', 'D', 'E', 'Clear'].map((letter) => (
			<>
				{letter}{' '}
				<input
					name={number.toString()}
					type='radio'
					value={letter}
					checked={
						this.state.answer[number] === letter && letter !== 'Clear'
							? true
							: false
					}
					onChange={(e) => {
						this.setState({
							answer: this.state.answer.map((el: string, index: number) => {
								if (el === 'Clear' && index === number) return null;
								if (index === number) return e.target.value;
								return el;
							}),
						});
					}}
				/>
				<br />
			</>
		));
	}
}
