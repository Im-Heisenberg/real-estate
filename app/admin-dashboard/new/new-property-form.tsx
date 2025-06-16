"use client";
import PropertyForm from "@/components/property-form";
import { propertyDataSchema } from "@/validation/propertySchema";
import { PlusCircleIcon } from "lucide-react";
import { z } from "zod";
import { createNewProperty } from "./action";
import { useAuth } from "@/context/auth";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
const NewPropertyForm = () => {
	const auth = useAuth();
	const router = useRouter();
	const handleSubmit = async (data: z.infer<typeof propertyDataSchema>) => {
		const token = await auth?.currentUser?.getIdToken();
		if (!token) return;
		const result = await createNewProperty(data, token);
		if (!result.error) {
			toast.success("Successfully added property");
			router.push("/admin-dashboard");
		} else if (result.error) {
			toast.error("Failed to add property");
		}
	};
	return (
		<PropertyForm
			handleSubmit={handleSubmit}
			submitButtonLabel={
				<>
					<PlusCircleIcon />
					Create Property
				</>
			}
		/>
	);
};

export default NewPropertyForm;
