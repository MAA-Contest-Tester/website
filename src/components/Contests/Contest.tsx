import React, { Component } from 'react';
import { urlSeparator } from '../../lib/fetchContests';
import { defaults, getAnswerStateEl, AnswerState } from '../../lib/questions';
import { addExam, getResponse, clearResponse } from '../../lib/exam_db';
import Timer from '../Timer';
import Loading from '../../svg/Loading.svg';
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

export default abstract class Contest extends Component<{ name: string }> {
	// authentication
	public auth: Auth;

	// name, AOPS answer key url, and state
	protected name: string;
	protected url: string;
	public state: ContestStateType;

	protected iterationArray: number[];
	protected defaultAnswer: string[];
	protected defaultCorrect: number[];

	abstract numberOfProblems(): number;
	abstract grade(url: string, updatedAnswer: any[]): Promise<AnswerState[]>;
	abstract timeGiven(): number;
	abstract score(): string;

	// number is 0-indexed.
	abstract renderInputField(number: number): React.ReactNode;

	constructor(props: { name: string }) {
		super(props);
		this.auth = getAuth(app);
		this.name = props.name;
		this.url = props.name + '_Answer_Key';
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

	changeAuth = (user: any) => {
		this.setState({ email: user.email });
	};

	componentDidMount() {
		if (this.state.email === null) {
			console.log("this.state.email is null. This shouldn't happen.");
			return;
		}
		window.addEventListener('beforeunload', this.beforeunload);
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

	componentWillUnmount() {
		window.removeEventListener('beforeunload', this.beforeunload);
	}

	updateAnswers = async () => {
		try {
			this.setState({ loading: true });
			const updatedAnswer = this.state.answer.map((x: string) => {
				if (x === 'Nothing') return null;
				return x;
			});
			const graded = await this.grade(this.url, updatedAnswer);
			await addExam(
				this.state.email!,
				this.name,
				updatedAnswer,
				graded,
				this.score(),
				this.state.notes
			);
			this.setState({ correct: graded, loading: false, saved: true });
		} catch (e) {
			this.setState({
				errors: 'Oops! Looks like the API or AOPS is down.',
				loading: false,
			});
			console.error('error', e);
		}
	};

	saveAnswers = async () => {
		try {
			this.setState({ loading: true });
			await addExam(
				this.state.email!,
				this.name,
				this.state.answer,
				this.state.correct,
				this.score(),
				this.state.notes
			);
			this.setState({ loading: false, saved: true });
		} catch (e) {
			this.setState({ errors: 'DB might be down.', loading: false });
			console.error('error', e);
		}
	};

	clearAnswers = async () => {
		if (
			_.isEqual(this.state.answer, this.defaultAnswer) &&
			_.isEqual(this.state.correct, this.defaultCorrect)
		) {
			this.setState({
				saved: true,
			});
			return;
		}
		this.setState({
			answer: this.defaultAnswer,
			correct: this.defaultCorrect,
		});
		this.setState({ saved: false });
	};

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

	beforeunload = (e: Event) => {
		if (!this.state.saved) {
			e.preventDefault();
			e.returnValue = true;
		}
	};

	render() {
		return (
			<div className='m-4 p-2'>
				<h1 className='mx-3 md:mx-5 my-3 p-2 rounded-lg font-bold'>
					{this.name.split(urlSeparator).join(' ')} ({this.score()})
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
					<button
						className='bg-gradient-to-r from-blue-500 to-blue-600 font-semibold text-white text-xl p-3 m-3 rounded-xl transform hover:-translate-y-1'
						// prevent concurrent API calls
						onClick={this.state.loading ? () => 0 : this.saveAnswers}
					>
						Save{!this.state.saved ? '*' : null}
					</button>
					<a
						href={`https://artofproblemsolving.com/wiki/index.php/${this.name}_Problems`}
						target='_blank'
						rel='noreferrer'
						className='m-3'
						// prevent concurrent API calls
					>
						<button className='bg-gradient-to-r from-blue-500 to-blue-600 font-semibold text-white text-xl p-3 rounded-xl text-center w-full h-full transform hover:-translate-y-1'>
							Go to <br /> Contest
						</button>
					</a>

					<button
						className='bg-gradient-to-r from-gray-700 to-black font-semibold text-white text-xl p-3 m-3 rounded-xl transform hover:-translate-y-1'
						// prevent concurrent API calls
						onClick={this.state.loading ? () => 0 : this.updateAnswers}
					>
						Grade
					</button>
					<textarea
						rows={4}
						cols={40}
						className='border-2 border-black outline-none rounded-lg m-3 p-3'
						placeholder='Notes Pad for anything involving the contest.'
						value={this.state.notes || ''}
						onChange={(e) => this.setState({ notes: e.target.value })}
					/>
				</div>
				<div className='p-3'>
					<h1 className='mx-3 md:mx-5 my-3 p-2 rounded-lg font-bold'>
						Answer Sheet
					</h1>
					<div className='flex flex-wrap flex-row justify-left'>
						{this.iterationArray.map((number) => (
							<div
								className='shadow-lg hover:shadow-xl m-3 p-2 rounded-lg w-72 bg-gray-100 flex flex-col md:flex-row'
								key={number}
							>
								<label className='m-2 text-2xl'> {number + 1} </label>
								<div className='border-none rounded-lg m-2 px-1'>
									{this.renderInputField(number)}
								</div>

								{getAnswerStateEl(
									this.state.correct[number],
									this.state.answer[number]
								)}
							</div>
						))}
					</div>
					<div className='min-w-96 bg-gray-100 rounded-xl mx-2 my-7 shadow-xl'>
						<h1 className='font-bold my-2 p-3 mx-0'>Danger Zone</h1>
						<div className='flex flex-row flex-wrap'>
							<button
								className='bg-gradient-to-r from-red-500 to-red-600 font-semibold text-white text-xl p-3 m-3 rounded-xl w-48 transform hover:-translate-y-1'
								// prevent concurrent API calls
								onClick={this.state.loading ? () => 0 : this.clearAnswers}
							>
								Clear Answers Only
							</button>
							<button
								className='bg-gradient-to-r from-red-500 to-red-600 font-semibold text-white text-xl p-3 m-3 rounded-xl w-48 transform hover:-translate-y-1'
								// prevent concurrent API calls
								onClick={this.state.loading ? () => 0 : this.clearEverything}
							>
								Wipe Exam from Database
							</button>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
