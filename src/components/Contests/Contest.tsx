import React, { Component } from 'react';
import { urlSeparator } from '../../lib/fetchContests';
import { defaults, getAnswerStateEl, AnswerState } from '../../lib/questions';
import { addExam, getResponse, clearResponse } from '../../lib/exam_db';
import Timer from '../Timer';
import Loading from '../../svg/Loading.svg';
import { getAuth, Auth } from 'firebase/auth';
import { app } from '../Firebase';

type ContestStateType = {
	answer: any[];
	correct: AnswerState[];
	loading: boolean;
	errors: string | null;
	email: string | null;
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
		getResponse(this.state.email!, this.name)
			.then((res) => {
				if (res) {
					this.setState({
						answer: res.answer || this.defaultAnswer,
						correct: res.correct || this.defaultCorrect,
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
				this.score()
			);
			this.setState({ correct: graded, loading: false });
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
				this.score()
			);
			this.setState({ loading: false });
		} catch (e) {
			this.setState({ errors: 'DB might be down.', loading: false });
			console.error('error', e);
		}
	};

	clearAnswers = async () => {
		try {
			this.setState({ loading: true });
			await clearResponse(this.state.email!, this.name);
			this.setState({
				answer: this.defaultAnswer,
				correct: this.defaultCorrect,
				loading: false,
			});
		} catch (e) {
			this.setState({ errors: 'DB might be down.', loading: false });
			console.error('error', e);
		}
	};

	render() {
		return (
			<div className='m-4 p-2'>
				<a
					href={`https://artofproblemsolving.com/wiki/index.php/${this.name}_Problems`}
					target='_blank'
					rel='noreferrer'
				>
					<h1 className='mx-3 md:mx-5 my-3 p-2 bg-blue-200 text-black rounded-lg flex'>
						{this.name.split(urlSeparator).join(' ')} ({this.score()})
					</h1>
				</a>
				{this.state.loading && (
					<img src={Loading} className='m-2 w-48' alt='loading svg' />
				)}
				{this.state.errors && (
					<div className='text-red-500 m-2 p-3 text-lg'>
						Error: {this.state.errors}
					</div>
				)}
				<div className='flex flex-col md:flex-row justify-center'>
					<Timer mins={this.timeGiven()} />
					<button
						className='bg-blue-600 hover:bg-blue-500 text-white text-xl p-3 m-3 rounded-xl'
						// prevent concurrent API calls
						onClick={this.state.loading ? () => 0 : this.saveAnswers}
					>
						Save
					</button>
					<button
						className='bg-red-600 hover:bg-red-500 text-white text-xl p-3 m-3 rounded-xl'
						// prevent concurrent API calls
						onClick={this.state.loading ? () => 0 : this.updateAnswers}
					>
						Grade
					</button>
				</div>
				<div className='p-3'>
					<div className='flex flex-row flex-wrap justify-center'>
						{this.iterationArray.map((number) => (
							<div
								className='shadow-lg hover:shadow-xl m-3 p-2 rounded-lg w-72 bg-gray-100 flex flex-col md:flex-row'
								key={number}
							>
								<label className='m-2 text-2xl'> {number + 1} </label>
								<div className='border-none rounded-lg m-2 px-1'>
									{this.renderInputField(number)}
								</div>

								{getAnswerStateEl(this.state.correct[number])}
							</div>
						))}
					</div>
					<div className='flex flex-row justify-center'>
						<button
							className='bg-red-600 hover:bg-red-500 text-white text-xl p-3 m-3 rounded-xl w-48'
							// prevent concurrent API calls
							onClick={this.state.loading ? () => 0 : this.clearAnswers}
						>
							Clear
						</button>
					</div>
				</div>
			</div>
		);
	}
}
