import React, { Component } from "react";

type TimerProps = { mins: number; seconds?: number };
type TimerState = { running: boolean; seconds: number; end: number };

export default class Timer extends Component<TimerProps, TimerState> {
  interval: any;
  defaultSeconds: number;
  constructor(props: TimerProps) {
    super(props);
    this.state = {
      running: false,
      seconds: props.mins * 60 + (props.seconds || 0),
      end: Math.floor(Date.now() / 1000),
    };
    this.interval = null;
    this.defaultSeconds = props.mins * 60 + (props.seconds || 0);
  }

  componentDidMount() {
    document.addEventListener("beforeunload", this.beforeunload);
  }
  componentWillUnmount() {
    document.removeEventListener("beforeunload", this.beforeunload);
  }
  down = () => {
    if (this.state.seconds > 0) {
      this.setState({
        seconds: this.state.end - Math.floor(Date.now() / 1000),
      });
    } else {
      this.stop();
    }
  };
  start = () => {
    this.interval = setInterval(() => {
      this.down();
    }, 1000);
    this.setState({
      running: true,
      end: Math.floor(Date.now() / 1000) + this.state.seconds,
    });
  };
  stop = () => {
    clearInterval(this.interval);
    this.setState({
      running: false,
      seconds: Math.max(this.state.end - Math.floor(Date.now() / 1000), 0),
    });
  };
  reset = () => {
    this.setState({
      seconds: this.defaultSeconds,
    });
  };
  started = () => {
    return this.state.seconds !== this.defaultSeconds;
  };
  beforeunload = (e: Event) => {
    if (!this.started()) {
      e.preventDefault();
      e.returnValue = true;
    }
  };
  render() {
    const body = (
      <div>
        <div className="text-2xl font-bold dark:text-white"> Timer </div>
        <div className="text-2xl dark:text-white">
          {Math.floor(this.state.seconds / 60)} m {this.state.seconds % 60} s
        </div>
        <div className="flex">
          <button
            className="transition duration-100 flex-auto font-semibold bg-gradient-to-r from-yellow-500 to-yellow-600 p-3 m-1 rounded-lg text-white text-center transform hover:-translate-y-1"
            onClick={this.state.running ? this.stop : this.start}
          >
            {this.state.running ? "Stop" : "Start"}
          </button>
          {!this.state.running && (
            <button
              className="transition duration-100 flex-auto font-semibold bg-gradient-to-r from-blue-500 to-blue-600 p-3 m-1 rounded-lg text-white text-center transform hover:-translate-y-1"
              onClick={this.reset}
            >
              Reset
            </button>
          )}
        </div>
      </div>
    );

    if (this.state.seconds === 0) {
      return (
        <div className="bg-red-100 dark:bg-red-800 shadow-xl hover:shadow-2xl my-2 mx-3 md:mx-6 p-3 w-96 rounded-xl">
          {body}
        </div>
      );
    } else {
      return (
        <div className="bg-gray-100 dark:bg-gray-800 shadow-xl hover:shadow-2xl my-2 mx-3 md:mx-6 p-3 w-96 rounded-xl">
          {body}
        </div>
      );
    }
  }
}
