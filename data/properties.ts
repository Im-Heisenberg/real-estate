import "server-only";
import { firestore } from "@/firebase/server";
import { Property } from "@/types/property";
import { PropertyStatus } from "@/types/propertyStatus";
import { getTotalPages } from "@/firebase/server";
type GetPropertiesOptions = {
	filters?: {
		minPrice?: number | null;
		maxPrice?: number | null;
		minBedrooms?: number | null;
		status?: PropertyStatus[] | null;
	};
	pagination: {
		pageSize?: number | null;
		page?: number | null;
	};
};
export const getProperties = async (options?: GetPropertiesOptions) => {
	// const page = (options?.pagination?.page && options?.pagination?.page > 0) || 1;
	let page = 1;
	const pageSize = options?.pagination?.pageSize || 10;

	const { maxPrice, minPrice, minBedrooms, status } = options?.filters || {};

	let propertiesQuery = firestore
		.collection("properties")
		.orderBy("updated", "desc");
	if (minPrice !== null && minPrice !== undefined) {
		propertiesQuery = propertiesQuery.where("price", ">=", minPrice);
	}
	if (maxPrice !== null && maxPrice !== undefined) {
		propertiesQuery = propertiesQuery.where("price", "<=", maxPrice);
	}
	if (minBedrooms !== null && minBedrooms !== undefined) {
		propertiesQuery = propertiesQuery.where("bedrooms", ">=", minBedrooms);
	}
	if (status) {
		propertiesQuery = propertiesQuery.where("stauts", "in", status);
	}
	const totalPages = await getTotalPages(propertiesQuery, pageSize);
	// const res2 = await totalPages('properties', pageSize);
	// pagination edge case handled
	if (
		options?.pagination?.page !== undefined &&
		options?.pagination?.page !== null
	) {
		page = Math.max(1, options.pagination.page); // Ensure page is at least 1
		if (totalPages > 0 && page > totalPages) {
			page = totalPages;
		}
	}

	// Ensure page is never less than 1 to prevent negative offset
	page = Math.max(1, page);

	const propertiesSnapshot = await propertiesQuery
		.limit(pageSize)
		.offset((page - 1) * pageSize)
		.get();
	const properties = propertiesSnapshot.docs.map(
		(doc) =>
			({
				id: doc.id,
				...doc.data(),
			} as Property)
	);
	return { data: properties, totalPages };
};

export const getPorpertyById = async (propertyId: string) => {
	const propertySnapshot = await firestore
		.collection("properties")
		.doc(propertyId)
		.get();
	const propertyData = {
		id: propertyId,
		...propertySnapshot.data(),
	} as Property;
	return { property: propertyData };
};
