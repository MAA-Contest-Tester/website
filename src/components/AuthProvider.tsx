import { User } from "firebase/auth";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@components/Firebase";

export const AuthContext = React.createContext<User | null>(null);

export default function AuthProvider(props: { children: React.ReactNode }) {
  const [user, loading] = useAuthState(auth);
  return (
    <>
      {!loading ? (
        <AuthContext.Provider value={user}>
          {props.children}
        </AuthContext.Provider>
      ) : null}
    </>
  );
}
