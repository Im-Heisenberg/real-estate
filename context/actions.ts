"use server";

import { auth } from "@/firebase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const setToken = async ({
	token,
	refreshToken,
}: {
	token: string;
	refreshToken: string;
}) => {
	const verifiedToken = await auth.verifyIdToken(token);
	if (!verifiedToken) return;

	const userRecord = await auth.getUser(verifiedToken.uid);
	// if current logged user is our admin but not yet got the admin tag
	if (
		process.env.ADMIN_EMIAL === userRecord.email &&
		!userRecord?.customClaims?.admin
	) {
		auth.setCustomUserClaims(userRecord.uid, { admin: true });
	}
	// set cookies
	const cookieStore = await cookies();
	cookieStore.set("firebaseAuthToken", token, {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
	});
	cookieStore.set("firebaseRefreshToken", refreshToken, {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
	});
	redirect('/')
};

export const removeToken = async () => {
	const cookieStore = await cookies();
	cookieStore.delete("firebaseAuthToken");
	cookieStore.delete("firebaseRefreshToken");
	redirect("/");
};
