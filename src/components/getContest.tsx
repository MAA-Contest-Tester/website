import React from 'react';
import AMC from './Contests/AMC';
import AMC8 from './Contests/AMC8';
import AIME from './Contests/AIME';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './Firebase';
import { Error403, Error404 } from './Errors';
import { AMCExists, AIMEExists } from '../lib/fetchContests';

const getAMC = (props: string) => {
	if (AMCExists(props)) {
		return <AMC name={props} />;
	} else {
		return <Error404 />;
	}
};

const getAMC8 = (props: string) => {
	if (AMCExists(props)) {
		return <AMC8 name={props} />;
	} else {
		return <Error404 />;
	}
};

const getAIME = (props: string) => {
	if (AIMEExists(props)) {
		return <AIME name={props} />;
	} else {
		return <Error404 />;
	}
};

export default function Contest(props: { name: string; preview?: boolean }) {
	const [user] = useAuthState(auth);
	const preview = props.preview ? props.preview : false;
	if (!user && !preview) {
		return <Error403 />;
	}
	if (props.name.match(/AMC_8/)) {
		return getAMC8(props.name);
	} else if (props.name.match(/AMC/)) {
		return getAMC(props.name);
	} else {
		return getAIME(props.name);
	}
}
