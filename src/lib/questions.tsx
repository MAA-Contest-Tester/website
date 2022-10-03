import React from "react";

export enum AnswerState {
  undefined = 0,
  correct = 1,
  incorrect = 2,
}

export const AnswerStateDisplay = (state: AnswerState, answer: any) => {
  if (state === AnswerState.correct) {
    return (
      <div className="m-2 p-1 bg-gradient-to-r from-green-400 to-green-500 text-center text-white rounded-lg flex-auto flex font-semibold">
        <div className="m-auto">Correct</div>
      </div>
    );
  } else if (state === AnswerState.incorrect) {
    return (
      <div className="m-2 p-1 bg-gradient-to-r from-red-400 to-red-500 text-center text-white rounded-lg flex-auto flex font-semibold">
        <div className="m-auto">Incorrect</div>
      </div>
    );
  } else {
    if (answer) {
      return (
        <div className="m-2 p-1 bg-gradient-to-r from-yellow-400 to-yellow-500 text-center text-white rounded-lg flex-auto flex font-semibold">
          <div className="m-auto">Answered</div>
        </div>
      );
    }
    return (
      <div className="m-2 p-1 bg-gradient-to-r from-blue-600 to-blue-800 text-center text-white rounded-lg flex-auto flex font-semibold">
        <div className="m-auto">Blank</div>
      </div>
    );
  }
};

export const defaults = (number: number): [number[], any[], AnswerState[]] => {
  const ar: number[] = [];
  const a: (number | null | string)[] = [];
  const b: AnswerState[] = [];
  for (let i: number = 0; i < number; i++) {
    ar.push(i);
    a.push(null);
    b.push(AnswerState.undefined);
  }
  return [ar, a, b];
};
