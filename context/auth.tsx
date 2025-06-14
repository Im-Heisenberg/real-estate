"use client";

import { auth } from "@/firebase/client";
import { GoogleAuthProvider, signInWithPopup, User } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";

type AuthContextType = {
	currentUser: User | null;
	logout: () => void;
	signInWithGoogle: () => void;
};

// create context
const AuthContext = createContext<AuthContextType | null>(null);

// create Provider

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [currentUser, setCurrentUser] = useState<User | null>(null);
	function signInWithGoogle() {
		const provider = new GoogleAuthProvider();
		try {
			signInWithPopup(auth, provider);
		} catch (error) {
			console.error("Error signing in with Google", error);
		}
	}
	const logout = async () => {
		await auth.signOut();
	};
	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((user) => {
			setCurrentUser(user ?? null);
		});
		return () => unsubscribe();
	}, []);

	return (
		<AuthContext.Provider value={{ currentUser, logout, signInWithGoogle }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);
/**
 * if we had'nt created this custom hook then wherever we needed context value we had to do like this ;
 * const {auth} = useContext(AuthContext)
 */
