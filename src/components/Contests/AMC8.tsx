import AMC from "./AMC";
import { gradeAMC } from "../../lib/grade";

export default class AMC8 extends AMC {
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
}
