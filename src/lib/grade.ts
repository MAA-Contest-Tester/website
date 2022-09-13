//import axios from 'axios';
import axios from "axios";
import { AnswerState } from "./questions";

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

// checks if a string is a perfect score.
export const perfectScore = (s: string) => {
  const [a, b] = s.split("/").map((x) => parseInt(x));
  return !isNaN(a) && a === b;
};

// multipliers for AMC 8, 10, 12, and AIME.
// first value is a regex, next is a multiplier.
export class Multiplier {
  regex: RegExp;
  multiplier: number;
  name: string;
  constructor(regex: RegExp, multiplier: number, name: string) {
    this.regex = regex;
    this.multiplier = multiplier;
    this.name = name;
  }
}
export const Multipliers: Multiplier[] = [
  new Multiplier(/AIME/, 3, "AIME"),
  new Multiplier(/AHSME/, 2, "AHSME"),
  new Multiplier(/AMC_12/, 2, "AMC 12"),
  new Multiplier(/AMC_10/, 2, "AMC 10"),
  new Multiplier(/AMC_8/, 1, "AMC 8"),
  new Multiplier(/AJHSME/, 1, "AJHSME"),
];

export const correctAnswers = (graded: AnswerState[]) =>
  graded
    .map((x) => (x === 1 ? 1 : 0))
    .reduce((a: number, b: number) => a + b, 0);

export const getNetScore = (graded: AnswerState[], examName: string) => {
  let res: number = 0;
  Multipliers.forEach((x: Multiplier) => {
    if (x.regex.test(examName)) {
      res = x.multiplier;
    }
  });
  return res * correctAnswers(graded);
};
