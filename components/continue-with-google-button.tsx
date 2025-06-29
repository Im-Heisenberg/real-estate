"use client";

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { useAuth } from "@/context/auth";

const ContinueWithGoogleButton = () => {
	const auth = useAuth();
	const router = useRouter();
	return (
		<Button
			onClick={async () => {
				await auth?.signInWithGoogle();
				router?.refresh();
			}}
			className="w-full"
		>
			Continue with Google
		</Button>
	);
};

export default ContinueWithGoogleButton;
