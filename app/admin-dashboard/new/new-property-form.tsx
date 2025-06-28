"use client";
import PropertyForm from "@/components/property-form";
import { propertySchema } from "@/validation/propertySchema";
import { PlusCircleIcon } from "lucide-react";
import { z } from "zod";
import { createNewProperty, savePropertyImages } from "./action";
import { useAuth } from "@/context/auth";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { ref, uploadBytesResumable, UploadTask } from "firebase/storage";
import { storage } from "@/firebase/client";
const NewPropertyForm = () => {
	const auth = useAuth();
	const router = useRouter();
	const handleSubmit = async (data: z.infer<typeof propertySchema>) => {
		const token = await auth?.currentUser?.getIdToken();
		if (!token) return;
		const { images, ...rest } = data;
		const result = await createNewProperty(rest, token);
		if (!!result.error || !result.propertyId) {
			toast.error("Failed to add property");
			return;
		}	
		const uploadTask: UploadTask[] = [];
		const paths: string[] = [];
		images.forEach((image, index) => {
			if (image.file) {
				// create path where the file will be stored
				const path = `properties/${
					result.propertyId
				}/${Date.now()}-${index}-${image.file.name}`;
				paths.push(path);
				//  ref --> this tell firebase where i'll put the image
				const storageRef = ref(storage, path);
				// since we want to upload all at once , we have used promuise.all
				uploadTask.push(uploadBytesResumable(storageRef, image.file));
			}
		});
		await Promise.all(uploadTask);
		await savePropertyImages(
			{ propertyId: result.propertyId, images: paths },
			token
		);
		toast.success("Successfully added property");
		router.push("/admin-dashboard");
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
