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
	return (
		<>
			<button
				className='auth'
				onClick={() => {
					login(googleprovider);
				}}
			>
				<div className='flex flex-row gap-1'>
					<span> Log in with </span>
					<img src={GoogleLogo} className='w-5' alt='google logo' />
				</div>
			</button>
		</>
	);
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
