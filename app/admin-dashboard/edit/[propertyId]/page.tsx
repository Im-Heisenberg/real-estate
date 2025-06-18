import { Breadcrumbs } from "@/components/ui/breadcrumb";
import { getPorpertyById } from "@/data/properties";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import EditPropertyForm from "./edit-property-form";

const EditProperty = async ({
	params,
}: {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	params: Promise<any>;
}) => {
	const { propertyId } = await params;
	const propertyData = await getPorpertyById(propertyId);
	const {
		id,
		address1,
		address2,
		bathrooms,
		bedrooms,
		city,
		description,
		postcode,
		price,
		status,
	} = propertyData.property;
	return (
		<>
			<Breadcrumbs
				items={[
					{ href: "/admin-dashboard", label: "Dashboard" },
					{ label: "Edit" },
				]}
			/>
			<Card className="mt-5">
				<CardHeader>
					<CardTitle className="text-3xl font-bold">
						Edit Property
					</CardTitle>
				</CardHeader>
				<CardContent>
					<EditPropertyForm
						id={id}
						address1={address1}
						address2={address2}
						city={city}
						postcode={postcode}
						price={price}
						bedrooms={bedrooms}
						bathrooms={bathrooms}
						description={description}
						status={status}
					/>
				</CardContent>
			</Card>
		</>
	);
};

export default EditProperty;
