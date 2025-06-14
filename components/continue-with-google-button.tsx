"use client";

import { Button } from "./ui/button";

import { useAuth } from "@/context/auth";

const ContinueWithGoogleButton = () => {
	const auth = useAuth();
	return (
		<Button onClick={auth?.signInWithGoogle}>Continue with Google</Button>
	);
};

export default ContinueWithGoogleButton;
