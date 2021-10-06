import React, { Component } from 'react';
import { urlSeparator } from '../../lib/fetchContests';
import { defaults, getAnswerStateEl, AnswerState } from '../../lib/questions';
import { addExam, getResponse, clearResponse } from '../../lib/exam_db';
import Timer from '../Timer';
import Loading from '../../images/Loading.svg';
import { getAuth, Auth } from 'firebase/auth';
import { app } from '../Firebase';
import { perfectScore } from '../../lib/grade';
import _ from 'lodash';

type ContestStateType = {
	answer: any[];
	correct: AnswerState[];
	loading: boolean;
	errors: string | null;
	email: string | null;
	notes: string | null;
	saved: boolean;
};

type ContestProps = {
	name: string;
	preview?: boolean;
};

export default abstract class Contest extends Component<ContestProps> {
	// authentication
	public auth: Auth;

	// name, AOPS answer key url, and state
	protected name: string;
	protected url: string;
	public state: ContestStateType;
	public preview: boolean;

	protected iterationArray: number[];
	protected defaultAnswer: string[];
	protected defaultCorrect: number[];

	abstract numberOfProblems(): number;
	abstract grade(url: string, updatedAnswer: any[]): Promise<AnswerState[]>;
	abstract timeGiven(): number;
	abstract score(): string;

	// number is 0-indexed.
	abstract renderInputField(number: number): React.ReactNode;

	constructor(props: ContestProps) {
		super(props);
		this.auth = getAuth(app);
		this.name = props.name;
		this.url = props.name + '_Answer_Key';
		this.preview = props.preview ? props.preview : false;
		[this.iterationArray, this.defaultAnswer, this.defaultCorrect] = defaults(
			this.numberOfProblems()
		);

		this.state = {
			answer: this.defaultAnswer,
			correct: this.defaultCorrect,
			loading: false,
			errors: null,
			email:
				this !== null && this.auth !== null && this.auth.currentUser !== null
					? this.auth.currentUser.email
					: null,
			notes: null,
			saved: true,
		};
	}

	componentDidMount() {
		if (this.state.email === null) {
			return;
		}
		if (!this.preview) {
			getResponse(this.state.email!, this.name)
				.then((res) => {
					if (res) {
						this.setState({
							answer: res.answer || this.defaultAnswer,
							correct: res.correct || this.defaultCorrect,
							notes: res.notes || null,
							errors: null,
						});
					}
				})
				.catch((e) => {
					console.error(e);
					this.setState({
						errors:
							'An error happened while attempting to fetch from the database.',
					});
				});
		}
	}

	// callback for updating answers.
	updateAnswers = async () => {
		try {
			this.setState({ loading: true });
			const updatedAnswer = this.state.answer.map((x: string) => {
				if (x === 'Nothing') return null;
				return x;
			});
			const graded = await this.grade(this.url, updatedAnswer);
			this.setState({ correct: graded, loading: false });
			if (!this.preview) this.setState({ saved: false });
			this.saveAnswers();
		} catch (e) {
			this.setState({
				errors: 'Oops! Looks like the API or AOPS is down.',
				loading: false,
			});
			console.error('error', e);
		}
	};

	// callback to automatically save answers to firestore.
	saveAnswers = async () => {
		try {
			if (!this.preview) {
				await addExam(
					this.state.email!,
					this.name,
					this.state.answer,
					this.state.correct,
					this.score(),
					this.state.notes
				);
			}
		} catch (e) {
			this.setState({ errors: 'DB might be down.' });
			console.error('error', e);
		}
		if (!this.preview) {
			this.setState({ saved: true });
		}
	};

	static warn(callback: () => any) {
		return () => {
			if (window.confirm('You will lose all of your progress. Are you sure?'))
				callback();
		};
	}
	// clear all of the answer choices
	clearAnswers = async () => {
		if (
			_.isEqual(this.state.answer, this.defaultAnswer) &&
			_.isEqual(this.state.correct, this.defaultCorrect)
		) {
			return;
		}
		this.setState({
			answer: this.defaultAnswer,
			correct: this.defaultCorrect,
		});
		this.setState({ saved: false });
		this.saveAnswers();
	};

	// clear answer choices + notes + entry from db
	clearEverything = async () => {
		try {
			this.setState({ loading: true });
			await clearResponse(this.state.email!, this.name);
			this.setState({
				answer: this.defaultAnswer,
				correct: this.defaultCorrect,
				notes: null,
				loading: false,
				saved: true,
			});
		} catch (e) {
			this.setState({ errors: 'DB might be down.', loading: false });
			console.error('error', e);
		}
	};

	render() {
		return (
			<div
				className={
					'm-3 p-1 max-w-7xl' +
					' ' +
					(this.preview
						? 'border-2 border-black dark:border-white rounded-lg'
						: null)
				}
			>
				<h1 className='mx-3 md:mx-5 my-3 p-2 rounded-lg font-bold dark:text-white'>
					{this.name.split(urlSeparator).join(' ')} ({this.score()}){' '}
					{!this.state.saved ? <span className='text-red-500'>*</span> : null}
				</h1>
				{perfectScore(this.score()) && (
					<h1 className='mx-3 md:mx-5 my-2 p-2 rounded-lg flex text-green-500'>
						Perfect Score
					</h1>
				)}
				{this.state.loading && (
					<img src={Loading} className='m-2 w-48' alt='loading svg' />
				)}
				{this.state.errors && (
					<div className='text-red-500 m-2 p-3 text-lg'>
						Error: {this.state.errors}
					</div>
				)}
				<div className='flex flex-row flex-wrap justify-center'>
					<Timer mins={this.timeGiven()} />
					<a
						href={`https://artofproblemsolving.com/wiki/index.php/${this.name}_Problems`}
						target='_blank'
						rel='noreferrer'
						className='m-3'
						// prevent concurrent API calls
					>
						<button className='bg-gradient-to-r from-blue-500 to-blue-600 font-semibold text-white text-xl p-3 rounded-xl text-center w-full h-full transform hover:-translate-y-1'>
							Problems
						</button>
					</a>

					<button
						className='bg-gradient-to-r from-gray-700 to-black dark:from-gray-100 dark:to-gray-300 font-semibold text-white dark:text-black text-xl p-3 m-3 rounded-xl transform hover:-translate-y-1'
						// prevent concurrent API calls
						onClick={this.state.loading ? () => 0 : this.updateAnswers}
					>
						Grade
					</button>
					<textarea
						rows={4}
						cols={30}
						className='border-2 border-black dark:border-white outline-none rounded-lg m-3 p-3 dark:bg-gray-800 dark:text-white'
						placeholder='Notes Pad for anything involving the contest.'
						value={this.state.notes || ''}
						onChange={async (e) => {
							await this.setState({ notes: e.target.value, saved: false });
							this.saveAnswers();
						}}
					/>
				</div>
				<div className='p-3'>
					<h1 className='mx-3 md:mx-5 my-3 p-2 rounded-lg font-bold dark:text-white'>
						Answer Sheet
					</h1>
					<div className='flex flex-wrap flex-row justify-left'>
						{this.iterationArray.map((number) => (
							<div
								className='shadow-lg hover:shadow-xl m-3 p-2 rounded-lg w-96 bg-gray-100 dark:bg-gray-800 flex flex-col md:flex-row'
								key={number}
							>
								<label className='m-2 text-2xl dark:text-white'>
									{' '}
									{number + 1}{' '}
								</label>
								<div className='border-none rounded-lg m-2 px-1 flex flex-row flex-wrap'>
									{this.renderInputField(number)}
								</div>

								{getAnswerStateEl(
									this.state.correct[number],
									this.state.answer[number]
								)}
							</div>
						))}
					</div>
					<div className='min-w-96 bg-gray-100 rounded-xl mx-2 my-7 shadow-xl dark:bg-gray-800 p-3'>
						<h1 className='font-bold my-2 p-3 mx-0 dark:text-white'>
							Danger Zone
						</h1>
						<div className='flex flex-row flex-wrap'>
							<button
								className='bg-gradient-to-r from-red-500 to-red-600 font-semibold text-white text-xl p-3 m-3 rounded-xl w-48 transform hover:-translate-y-1'
								// prevent concurrent API calls
								onClick={
									this.state.loading
										? undefined
										: Contest.warn(this.clearAnswers)
								}
							>
								Clear Answers
							</button>
							{!this.preview ? (
								<button
									className='bg-gradient-to-r from-red-500 to-red-600 font-semibold text-white text-xl p-3 m-3 rounded-xl w-48 transform hover:-translate-y-1'
									// prevent concurrent API calls
									onClick={
										this.state.loading
											? undefined
											: Contest.warn(this.clearEverything)
									}
								>
									Clear Answers + Unmark Exam
								</button>
							) : null}
						</div>
					</div>
				</div>
			</div>
		);
	}
}
