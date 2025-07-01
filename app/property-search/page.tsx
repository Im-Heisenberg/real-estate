import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import FilterForm from "./filters-form";
import { Suspense } from "react";
import { getProperties } from "@/data/properties";
import Image from "next/image";
import { imageUrlFormatter } from "@/lib/utils";
import { BathIcon, BedIcon, HomeIcon } from "lucide-react";
import numeral from "numeral";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const PropertySearch = async ({
	searchParams,
}: {
	searchParams: Promsie<any>;
}) => {
	const {
		minPrice: minPriceValue,
		minBedroom: minBedroomValue,
		maxPrice: maxPriceValue,
		page: pageValue,
	} = await searchParams;

	const page = isNaN(parseInt(pageValue)) ? 1 : pageValue;
	const minPrice = isNaN(parseInt(minPriceValue)) ? null : minPriceValue;
	const maxPrice = isNaN(parseInt(maxPriceValue)) ? null : maxPriceValue;
	const minBedroom = isNaN(parseInt(minBedroomValue)) ? null : minBedroomValue;

	const { data, totalPages } = await getProperties({
		pagination: {
			page,
			pageSize: 5,
		},
		filters: {
			minPrice,
			maxPrice,
			minBedrooms: minBedroom,
		},
	});
	return (
		<div className="max-w-screen-lg mx-auto">
			<h1 className="text-4xl font-bold p-5">Property Search</h1>
			<Card>
				<CardHeader>
					<CardTitle>Filters</CardTitle>
				</CardHeader>
				<CardContent>
					<Suspense>
						<FilterForm />
					</Suspense>
				</CardContent>
			</Card>
			<div className="grid grid-cols-3 mt-5 gap-5">
				{data.map((property) => {
					const addressLines = [
						property.address1,
						property.address2,
						property.city,
						property.postcode,
					]
						.filter((addressLine) => !!addressLine)
						.join(", ");
					return (
						<Card key={property.id} className="overflow-hidden">
							<CardContent className="px-0">
								<div className="h-40 relative bg-sky-50 text-zinc-400 items-center justify-center flex">
									{!!property?.images?.[0] && (
										<Image
											fill
											src={imageUrlFormatter(property.images[0])}
											alt="property-image"
											className="object-cover"
										/>
									)}
									{!property.images?.[0] && (
										<>
											<small>No Image</small>
											<HomeIcon />
										</>
									)}
								</div>
								<div className="flex flex-col gap-5 p-5">
									<p>{addressLines}</p>
									<div className="flex gap-5">
										<div className="flex gap-2">
											<BedIcon /> {property.bedrooms}
										</div>
										<div className="flex gap-2">
											<BathIcon /> {property.bathrooms}
										</div>
									</div>
									<p className="text-2xl">
										£{numeral(property.price).format("0,0")}
									</p>
									<Button asChild>
										<Link href={`/property/${property.id}`}>
											View Property
										</Link>
									</Button>
								</div>
							</CardContent>
						</Card>
					);
				})}
			</div>

		</div>
	);
};

export default PropertySearch;
