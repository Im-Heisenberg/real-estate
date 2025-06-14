"use client";

import { useAuth } from "@/context/auth";
import Link from "next/link";
import { Button } from "./ui/button";

const AuthButtons = () => {
	const auth = useAuth();
	return (
		<div>
			{!!auth?.currentUser && (
				<>
					<div>{auth.currentUser.email}</div>
					<Button onClick={auth.logout}>Logout</Button>
				</>
			)}
			{!auth?.currentUser && (
				<>
					<Link href="/login">Login</Link>
					<Link href="/register">Signup</Link>
				</>
			)}
		</div>
	);
};

export default AuthButtons;
