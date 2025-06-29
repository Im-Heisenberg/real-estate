"use client";
import PropertyForm from "@/components/property-form";
import { Property } from "@/types/property";
import { propertySchema } from "@/validation/propertySchema";
import { SaveIcon } from "lucide-react";
import { z } from "zod";
import { updateProperty } from "./action";
import { toast } from "sonner";
import { useAuth } from "@/context/auth";
import { useRouter } from "next/navigation";
import {
	deleteObject,
	ref,
	uploadBytesResumable,
	UploadTask,
} from "firebase/storage";
import { storage } from "@/firebase/client";
import { savePropertyImages } from "../../actions";

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
	images = [],  //storage path of firestore bucket
}: Props) => {
	const auth = useAuth();
	const router = useRouter();
	const handleSubmit = async (data: z.infer<typeof propertySchema>) => {
		try {
			const token = await auth?.currentUser?.getIdToken();
			if (!token) return;
			const { images: newImages, ...rest } = data; //newImage are [images.file]
			const response = await updateProperty({ id, ...rest }, token);
			if (!!response?.error) {
				toast.error("Unexpected Error Occured");
				return;
			}  
			// find images user have deleted
			const storageTasks: (UploadTask | Promise<void>)[] = [];
			const imagesToDelete = images.filter(
				(image) => !newImages.find((newImage) => image === newImage.url)
			);
			imagesToDelete.forEach((image) => {
				storageTasks.push(deleteObject(ref(storage, image)));
			});
			// upload new images
			const paths: string[] = [];
			newImages.forEach((image, index) => {
				if (image.file) {
					const path = `properties/${id}/${Date.now()}-${index}-${
						image.file.name
					}`;
					paths.push(path);
					const storageRef = ref(storage, path);
					// specify what to upload and at what location
					storageTasks.push(uploadBytesResumable(storageRef, image.file));
				} else {
					// to keep existing image , have to keep track of the path.
					paths.push(image.url);
				}
			});
			await Promise.all(storageTasks);
			await savePropertyImages({ propertyId: id, images: paths }, token);
			toast.success("Property updated successfully");
			router.push("/admin-dashboard");
		} catch (error) {
			console.log(error);
			toast.error("Unexpected Error Occured");
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
					images: images.map((image) => ({ id: image, url: image })), //doing this map becase Image has a type and in propertForm the url first needs to be formatted
				}}
			/>
		</>
	);
};

export default EditPropertyForm;
