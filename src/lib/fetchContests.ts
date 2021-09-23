import AMC10Contests from './contests/amc10.json';
import AMC12Contests from './contests/amc12.json';
import AMC8Contests from './contests/amc8.json';
import AIMEContests from './contests/aime.json';
export const urlSeparator = '_';

export type ContestYear = { year: string; contests: string[] };

// get all contests (array of strings)
export function getAllAMC(grade: number) {
	if (grade === 8) return AMC8Contests as ContestYear[];
	else if (grade === 10) return AMC10Contests as ContestYear[];
	return AMC12Contests as ContestYear[];
}

export function getAllAIME() {
	return AIMEContests as ContestYear[];
}

function existsInCategory(
	name: string,
	obj: { year: string; contests: string[] }[]
) {
	for (const k in obj) {
		for (let i = 0; i < obj[k]['contests'].length; i++) {
			if (obj[k]['contests'][i] === name) {
				return true;
			}
		}
	}
	return false;
}

export function AMCExists(name: string) {
	if (name.match(/AMC_8/)) {
		return existsInCategory(name, AMC8Contests);
	} else if (name.match(/AMC_10/)) {
		return existsInCategory(name, AMC10Contests);
	} else if (name.match(/AMC_12/)) {
		return existsInCategory(name, AMC12Contests);
	}
	return false;
}

export function AIMEExists(name: string) {
	return existsInCategory(name, AIMEContests);
}

export function numberOfProblems() {
	const count = (problems: number, contest: ContestYear[]) =>
		problems * contest.map((x) => x.contests.length).reduce((a, b) => a + b, 0);
	return (
		count(25, AMC8Contests) +
		count(25, AMC10Contests) +
		count(25, AMC12Contests) +
		count(15, AIMEContests)
	);
}
