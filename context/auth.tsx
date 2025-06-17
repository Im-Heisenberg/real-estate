"use client";

import { auth } from "@/firebase/client";
import {
	GoogleAuthProvider,
	ParsedToken,
	signInWithPopup,
	User,
} from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { removeToken, setToken } from "./actions";

type AuthContextType = {
	currentUser: User | null;
	logout: () => void;
	signInWithGoogle: () => void;
	customClaims: ParsedToken | null;
	fetchingUser: boolean;
};

// create context
const AuthContext = createContext<AuthContextType | null>(null);

// create Provider

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [currentUser, setCurrentUser] = useState<User | null>(null);
	const [customClaims, setCustomClaims] = useState<ParsedToken | null>(null);
	const [fetchingUser, setFetchingUser] = useState(true);

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
		await removeToken();
	};
	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged(async (user) => {
			setCurrentUser(user ?? null);
			if (user) {
				const tokenResult = await user.getIdTokenResult();
				const token = tokenResult?.token;
				const refreshToken = user?.refreshToken;
				const claims = tokenResult.claims;
				setCustomClaims(claims ?? null);
				if (token && refreshToken) {
					await setToken({ token, refreshToken });
				}
			}
			setFetchingUser(false);
		});
		return () => unsubscribe();
	}, []);

	return (
		<AuthContext.Provider
			value={{
				currentUser,
				logout,
				signInWithGoogle,
				customClaims,
				fetchingUser,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);
/**
 * if we had'nt created this custom hook then wherever we needed context value we had to do like this ;
 * const {auth} = useContext(AuthContext)
 */
