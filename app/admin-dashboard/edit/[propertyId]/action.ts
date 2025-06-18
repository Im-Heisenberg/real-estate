"use server";

import { auth, firestore } from "@/firebase/server";
import { Property } from "@/types/property";
import { propertyDataSchema } from "@/validation/propertySchema";

export const updateProperty = async (data: Property, authToken: string) => {
	const { id, ...propertyData } = data;
	const verifiedToken = await auth.verifyIdToken(authToken);
	if (!verifiedToken.admin) {
		// user is not admin --> cant add property
		return {
			error: true,
			message: "Unauthorized",
		};
	}
	// verify data received from client
	const validation = propertyDataSchema.safeParse(propertyData);
	// if theres any error , return the 1st error in response
	if (!validation.success) {
		return {
			error: true,
			message: validation.error.issues[0]?.message ?? "An error occurred",
		};
	}
    await firestore
		.collection("properties")
		.doc(id)
		.update({ ...propertyData, updated: new Date() });
};
