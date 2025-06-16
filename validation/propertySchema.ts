import { z } from "zod";

export const propertyDataSchema = z.object({
	address1: z.string().min(1, "Address line 1 must contain a value"),
	address2: z.string().optional(),
	city: z.string().min(3, "City must contain at least 3 characters"),
	postcode: z.string()
		.refine((postcode) => {
		const postcodeRegex = /^[1-9][0-9]{5}$/;
		return postcodeRegex.test(postcode);
	}, "Invalid postcode"),
	price: z.coerce.number().positive("Price must be greater than zero"),
	description: z
		.string()
		.min(40, "Description must contain at least 40 characters"),
	bedrooms: z.coerce.number().min(1, "Bedrooms must be at least 1"),
	bathrooms: z.coerce.number().min(1, "Bathrooms must be at least 1"),
	status: z.enum(["draft", "for-sale", "withdrawn", "sold"]),
});
