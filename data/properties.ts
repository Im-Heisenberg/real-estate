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
	let page =1;
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
	if (options?.pagination?.page) {
		page = options.pagination.page ?? 1; // Default to 1 if undefined
		if (page < 1) page = 1;
		if (page && page > totalPages) page = totalPages;
	}
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
