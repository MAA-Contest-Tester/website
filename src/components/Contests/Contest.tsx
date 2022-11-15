import React, { Component } from "react";
import { urlSeparator } from "@lib/fetch_contests";
import { defaults, AnswerStateDisplay, AnswerState } from "@lib/questions";
import { addExam, clearResponse, getQueryEmailExam } from "@lib/exam_db";
import Timer from "@components/Timer";
//import Loading from '../../images/Loading.svg';
import { getAuth, Auth } from "firebase/auth";
import { app } from "@components/Firebase";
import { perfectScore } from "@lib/grade";
import { onSnapshot, Unsubscribe } from "@firebase/firestore";
import { debounce } from "debounce";
import ScoreBox from "@components/AMCScoreBox";
import RenderNotes from "@components/RenderNotes";

const Loading = "/images/Logo.png";

type ContestStateType = {
  answer: any[];
  correct: AnswerState[];
  loading: boolean;
  errors: string | null;
  email: string | null;
  notes: string | null;
  saved: boolean;
  // unix milliseconds since the last save.
  lastSaved: number;
};

export type ContestProps = {
  name: string;
  preview?: boolean;
  length?: number;
};

export default abstract class Contest extends Component<ContestProps> {
  // authentication
  public auth: Auth;

  // name, AOPS answer key url, and state
  protected name: string;
  protected url: string;
  public state: ContestStateType;
  public preview: boolean;

  public subscribe?: Unsubscribe;

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
    this.url = props.name + "_Answer_Key";
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
      lastSaved: 0,
    };
  }

  componentDidMount() {
    if (this.state.email === null) {
      return;
    }
    if (!this.preview) {
      const q = getQueryEmailExam(this.state.email!, this.name);
      this.subscribe = onSnapshot(q, (snapshot) => {
        const res = snapshot.docs.shift()?.data();
        this.setState({
          answer: res?.answer || this.defaultAnswer,
          correct: res?.correct || this.defaultCorrect,
          notes: res?.notes || null,
          errors: null,
        });
      });
    }
  }

  componentWillUnmount() {
    if (this.subscribe) {
      this.subscribe!();
    }
  }

  // callback for updating answers.
  updateAnswers = async () => {
    try {
      this.setState({ loading: true });
      const updatedAnswer = this.state.answer.map((x: string) => {
        if (x === "Nothing") return null;
        return x;
      });
      const graded = await this.grade(this.url, updatedAnswer);
      this.setState({ correct: graded, loading: false });
      if (!this.preview) this.setState({ saved: false });
      this.debouncedSave();
    } catch (e) {
      this.setState({
        errors: "Oops! Looks like the API or AOPS is down.",
        loading: false,
      });
      console.error("error", e);
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
      this.setState({ errors: "DB might be down." });
      console.error("error", e);
    }
    if (!this.preview) {
      this.setState({ saved: true });
    }
  };

  debouncedSave = debounce(() => this.saveAnswers(), 1000);

  static warn(callback: () => any) {
    return () => {
      if (window.confirm("You will lose all of your progress. Are you sure?"))
        callback();
    };
  }
  _isEqual = (a: any[], b: any[]) => {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  };

  // clear all of the answer choices
  clearAnswers = async () => {
    if (
      this._isEqual(this.state.answer, this.defaultAnswer) &&
      this._isEqual(this.state.correct, this.defaultCorrect)
    ) {
      return;
    }
    await this.setState({
      answer: this.defaultAnswer,
      correct: this.defaultCorrect,
      saved: false,
    });
    this.debouncedSave();
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
      this.setState({ errors: "DB might be down.", loading: false });
      console.error("error", e);
    }
  };

  render() {
    return (
      <div
        className={
          "m-3 p-1 max-w-7xl" +
          " " +
          (this.preview
            ? "border-2 border-black dark:border-white rounded-lg"
            : null)
        }
      >
        <h1 className="mx-3 md:mx-5 my-3 p-2 rounded-lg font-bold dark:text-white">
          {this.name.split(urlSeparator).join(" ")} ({this.score()}){" "}
          {!this.state.saved && <span className="text-red-500">*</span>}
          {this.state.loading && (
            <img
              src={Loading}
              className="mx-4 w-7 animate-spin inline"
              alt="loading svg"
            />
          )}
        </h1>
        {perfectScore(this.score()) && (
          <h1 className="mx-3 md:mx-5 my-2 p-2 rounded-lg flex text-green-500">
            Perfect Score
          </h1>
        )}

        {this.state.errors && (
          <div className="text-red-500 m-2 p-3 text-lg">
            Error: {this.state.errors}
          </div>
        )}
        <div className="flex flex-row flex-wrap justify-center">
          <ScoreBox name={this.name} score={this.score()} />
          <Timer mins={this.timeGiven()} />
          <a
            href={`https://artofproblemsolving.com/wiki/index.php/${this.name}_Problems`}
            target="_blank"
            rel="noreferrer"
            className="m-3"
            // prevent concurrent API calls
          >
            <button className="transition duration-100 bg-gradient-to-r from-blue-500 to-blue-600 font-semibold text-white text-xl p-3 rounded-xl text-center w-full h-full transform hover:-translate-y-1">
              Problems
            </button>
          </a>

          <button
            className="transition duration-100 bg-gradient-to-r from-gray-700 to-black dark:from-gray-100 dark:to-gray-300 font-semibold text-white dark:text-black text-xl p-3 m-3 rounded-xl transform hover:-translate-y-1"
            // prevent concurrent API calls
            onClick={this.state.loading ? () => 0 : this.updateAnswers}
          >
            Grade
          </button>
        </div>
        <div className="p-3 mx-5 flex flex-row flex-wrap">
          <textarea
            rows={5}
            cols={40}
            className="border-2 border-black dark:border-white outline-none rounded-lg m-3 p-3 dark:bg-gray-800 dark:text-white"
            placeholder="Notes Pad. Inline LaTeX!"
            value={this.state.notes || ""}
            onChange={async (e) => {
              await this.setState({ notes: e.target.value, saved: false });
              this.debouncedSave();
            }}
          />
          <RenderNotes text={this.state.notes} />
        </div>

        <div className="p-3">
          <h1 className="mx-3 md:mx-5 my-3 p-2 rounded-lg font-bold dark:text-white">
            Answer Sheet
          </h1>
          <div className="flex flex-wrap flex-row justify-left">
            {this.iterationArray.map((number) => (
              <div
                className="shadow-lg hover:shadow-xl m-3 p-2 rounded-lg w-answer bg-gray-100 dark:bg-gray-800 flex flex-col md:flex-row"
                key={number}
              >
                <label className="m-2 text-2xl dark:text-white">
                  {" "}
                  {number + 1}{" "}
                </label>
                <div className="border-none rounded-lg m-2 px-1 flex flex-row flex-wrap">
                  {this.renderInputField(number)}
                </div>

                {AnswerStateDisplay(
                  this.state.correct[number],
                  this.state.answer[number]
                )}
              </div>
            ))}
          </div>
          <div className="min-w-96 bg-gray-100 rounded-xl mx-2 my-7 shadow-xl dark:bg-gray-800 p-3">
            <h1 className="font-bold my-2 p-3 mx-0 dark:text-white">
              Danger Zone
            </h1>
            <div className="flex flex-row flex-wrap">
              <button
                className="transition duration-100 bg-gradient-to-r from-red-500 to-red-600 font-semibold text-white text-xl p-3 m-3 rounded-xl w-48 transform hover:-translate-y-1"
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
                  className="transition duration-100 bg-gradient-to-r from-red-500 to-red-600 font-semibold text-white text-xl p-3 m-3 rounded-xl w-48 transform hover:-translate-y-1"
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
