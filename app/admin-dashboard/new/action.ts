"use server";

import { auth, firestore } from "@/firebase/server";
import { propertyDataSchema } from "@/validation/propertySchema";

export const createNewProperty = async (
	data: {
		address1: string;
		address2?: string;
		city: string;
		postcode: string;
		description: string;
		price: number;
		bedrooms: number;
		bathrooms: number;
		status: "for-sale" | "draft" | "withdrawn" | "sold";
	},
	authToken: string
) => {
	const verifiedToken = await auth.verifyIdToken(authToken);
	if (!verifiedToken.admin) {
		// user is not admin --> cant add property
		return {
			error: true,
			message: "Unauthorized",
		};
	}
	// verify data received from client
	const validation = propertyDataSchema.safeParse(data);
	// if theres any error , return the 1st error in response
	if (!validation.success) {
		return {
			error: true,
			message: validation.error.issues[0]?.message ?? "An error occurred",
		};
	}
	// add property to DB
	const property = await firestore.collection("properties").add({
		...data,
		created: new Date(),
		updated: new Date(),
	});
	return {
		propertyId: property.id,
	};
};
