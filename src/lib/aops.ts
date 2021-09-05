//import axios from 'axios';
import axios from 'axios';
import { AnswerState } from './questions';

const getUrl = async (url: string) =>
	await axios.get(process.env.REACT_APP_AOPSFUNCTION!, {
		params: {
			url: url,
		},
	});

export type AnswerType = string;

export async function gradeAIME(
	url: string,
	answer: AnswerType[]
): Promise<AnswerState[]> {
	try {
		const response = await getUrl(url);
		const correct = response.data;
		const res: AnswerState[] = [];
		for (let i = 0; i < correct.length; i++) {
			if (answer[i] === null) {
				res[i] = AnswerState.undefined;
			} else if (
				parseInt(answer[i]).toString() !== parseInt(correct[i]).toString()
			) {
				res.push(AnswerState.incorrect);
			} else {
				res.push(AnswerState.correct);
			}
		}
		return res;
	} catch (e) {
		console.error(e);
		throw e;
	}
}

export async function gradeAMC(
	url: string,
	answer: AnswerType[]
): Promise<AnswerState[]> {
	try {
		const response = await getUrl(url);
		const correct = response.data;
		const res: AnswerState[] = [];
		for (let i = 0; i < correct.length; i++) {
			if (answer[i] === null) {
				res[i] = AnswerState.undefined;
			} else if (answer[i] !== correct[i]) {
				res.push(AnswerState.incorrect);
			} else {
				res.push(AnswerState.correct);
			}
		}
		return res;
	} catch (e) {
		console.error(e);
		throw e;
	}
}
