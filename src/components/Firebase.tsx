import React from 'react';
import '../index.css';

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// redirection (from stackoverflow)
import { NavLink } from 'react-router-dom';
import 'firebase/firestore';
import {
	getAuth,
	GoogleAuthProvider,
	signInWithRedirect,
	signOut,
} from 'firebase/auth';

import { useAuthState } from 'react-firebase-hooks/auth';

import GoogleLogo from '../svg/Google.svg';

// Your web app's Firebase configuration
const firebaseConfig = JSON.parse(process.env.REACT_APP_FIREBASECONFIG!);

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
auth.useDeviceLanguage();
const googleprovider = new GoogleAuthProvider();

export function LogIn() {
	const login = async (provider: GoogleAuthProvider) => {
		try {
			await signInWithRedirect(auth, provider);
		} catch (e) {}
	};
	const [user] = useAuthState(auth);
	return !user ? (
		<>
			<button
				className='auth'
				onClick={() => {
					login(googleprovider);
				}}
			>
				<div className='flex flex-row gap-1'>
					<div> Log in with </div>
					<img src={GoogleLogo} alt='google logo' />
				</div>
			</button>
		</>
	) : null;
}

export function LogOut() {
	return (
		auth.currentUser && (
			<NavLink to='/'>
				<button className='auth' onClick={() => signOut(auth)}>
					Log Out
				</button>
			</NavLink>
		)
	);
}

export default function Auth() {
	const [user] = useAuthState(auth);
	if (user) {
		return (
			<>
				<h1 className='m-2'> U r logged in as {user.email}</h1> <LogOut />
			</>
		);
	} else {
		return (
			<>
				<LogIn /> <LogOut />
			</>
		);
	}
}
