import AMC from "./AMC";
import { gradeAMC } from "../../lib/grade";
import { ContestProps } from "./Contest";
import { defaults } from "../../lib/questions";

export default class AHSME extends AMC {
  problemcount: number;
  constructor(props: ContestProps) {
    super(props);
    this.problemcount = props.length!;
    [this.iterationArray, this.defaultAnswer, this.defaultCorrect] = defaults(
      this.numberOfProblems()
    );

    this.setState({
      answer: this.defaultAnswer,
      correct: this.defaultCorrect,
    });
  }
  numberOfProblems() {
    return this.problemcount;
  }
  timeGiven() {
    return 90;
  }
  grade(url: string, updatedAnswer: any[]) {
    return gradeAMC(url, updatedAnswer);
  }
  score() {
    return `${this.state.correct
      .map((x) => {
        if (x === 0) return 2;
        else if (x === 1) return 5;
        else return 0;
      })
      .reduce((prev: number, val: number) => prev + val, 0)}/150`;
  }
}
