import React, { Component } from 'react';

class TimerTime {
	mins: number;
	seconds: number;
	constructor(mins: number, seconds?: number) {
		this.mins = mins;
		this.seconds = seconds ? seconds : 0;
	}
	next(): TimerTime {
		const x = new TimerTime(this.mins, this.seconds);
		if (this.seconds === 0) {
			x.mins -= 1;
			x.seconds = 59;
		} else {
			x.seconds -= 1;
		}
		return x;
	}
	zero() {
		return this.seconds === 0 && this.mins === 0;
	}
}

type TimerProps = { mins: number; seconds?: number };
type TimerState = { running: boolean; time: TimerTime };

export default class Timer extends Component<TimerProps, TimerState> {
	interval: any;
	defaultTime: TimerTime;
	constructor(props: TimerProps) {
		super(props);
		this.state = {
			running: false,
			time: new TimerTime(props.mins, props.seconds),
		};
		this.interval = null;
		this.defaultTime = new TimerTime(
			props.mins,
			props.seconds ? props.seconds : 0
		);
	}
	down = () => {
		if (!this.state.time.zero()) {
			this.setState({ time: this.state.time.next() });
		} else {
			this.stop();
		}
	};
	start = () => {
		this.interval = setInterval(() => {
			this.down();
		}, 1000);
		this.setState({ running: true });
	};
	stop = () => {
		clearInterval(this.interval);
		this.setState({ running: false });
	};
	reset = () => {
		this.setState({
			time: new TimerTime(this.defaultTime.mins, this.defaultTime.seconds),
		});
	};
	render() {
		const body = (
			<div>
				<div className='text-2xl'> Timer </div>
				<div className='text-2xl'>
					{this.state.time.mins} m {this.state.time.seconds} s
				</div>
				<div className='flex'>
					<button
						className='flex-auto bg-green-400 hover:bg-green-500 p-3 m-1 rounded-lg text-white text-center transform hover:-translate-y-1'
						onClick={this.state.running ? this.stop : this.start}
					>
						{this.state.running ? 'Stop' : 'Start'}
					</button>
					{!this.state.running && (
						<button
							className='flex-auto bg-blue-400 hover:bg-blue-500 p-3 m-1 rounded-lg text-white text-center transform hover:-translate-y-1'
							onClick={this.reset}
						>
							Reset
						</button>
					)}
				</div>
			</div>
		);

		if (this.state.time.zero()) {
			return (
				<div className='bg-red-100 shadow-xl hover:shadow-2xl my-2 mx-3 md:mx-6 p-3 w-96 rounded-xl'>
					{body}
				</div>
			);
		} else {
			return (
				<div className='bg-gray-100 shadow-xl hover:shadow-2xl my-2 mx-3 md:mx-6 p-3 w-96 rounded-xl'>
					{body}
				</div>
			);
		}
	}
}
