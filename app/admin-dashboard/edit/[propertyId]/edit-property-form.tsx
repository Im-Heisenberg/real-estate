"use client";
import PropertyForm from "@/components/property-form";
import { Property } from "@/types/property";
import { propertyDataSchema } from "@/validation/propertySchema";
import { SaveIcon } from "lucide-react";
import { z } from "zod";
import { updateProperty } from "./action";
import { toast } from "sonner";
import { useAuth } from "@/context/auth";
import { useRouter } from "next/navigation";

type Props = Property;

const EditPropertyForm = ({
	id,
	address1,
	address2,
	city,
	postcode,
	bathrooms,
	bedrooms,
	description,
	price,
	status,
}: Props) => {
	const auth = useAuth();
	const router = useRouter();
	const handleSubmit = async (data: z.infer<typeof propertyDataSchema>) => {
		try {
			const token = await auth?.currentUser?.getIdToken();
			if (!token) return;
			await updateProperty({ id, ...data }, token);
			toast.success("Property updated successfully");
			router.push("/admin-dashboard");
		} catch (error) {
			console.log(error)
			toast.error('Unexpected Error Occured')
		}
	};
	return (
		<>
			<PropertyForm
				handleSubmit={handleSubmit}
				submitButtonLabel={
					<>
						<SaveIcon /> SAVE PROPERTY
					</>
				}
				defaultValues={{
					address1,
					address2,
					city,
					postcode,
					bathrooms,
					bedrooms,
					description,
					price,
					status,
				}}
			/>
		</>
	);
};

export default EditPropertyForm;
