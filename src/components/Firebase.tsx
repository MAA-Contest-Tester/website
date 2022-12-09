import React from "react";
import "@/index.css";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// redirection (from stackoverflow)
import { NavLink } from "react-router-dom";
import "firebase/firestore";
import {
  connectAuthEmulator,
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { AuthButton } from "./Navbar";
import {
  connectFirestoreEmulator,
  doc,
  getDoc,
  getFirestore,
  setDoc,
} from "firebase/firestore";

//import GoogleLogo from '../images/Google.svg';
const GoogleLogo = "/images/Google.svg";

// Your web app's Firebase configuration
const firebaseConfig = JSON.parse(import.meta.env.REACT_APP_FIREBASECONFIG!);

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const analytics = getAnalytics(app);
auth.useDeviceLanguage();
const googleprovider = new GoogleAuthProvider();

export const db = getFirestore();

if ((import.meta.env as any).DEV) {
  connectAuthEmulator(auth, "http://localhost:5001");
  connectFirestoreEmulator(db, "localhost", 5003);
}

export function LogIn() {
  const login = async (provider: GoogleAuthProvider) => {
    signInWithPopup(auth, provider);
  };
  return (
    <button
      onClick={() => {
        login(googleprovider);
      }}
    >
      <AuthButton>
        <div className="flex flex-row gap-1">
          <span> Log in with </span>
          <img src={GoogleLogo} className="w-5" alt="google logo" />
        </div>
      </AuthButton>
    </button>
  );
}

export function LogOut() {
  return (
    auth.currentUser && (
      <NavLink to="/">
        <button onClick={() => signOut(auth)}>
          <AuthButton>Log Out</AuthButton>
        </button>
      </NavLink>
    )
  );
}
