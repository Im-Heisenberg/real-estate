"use client";

import { useRef } from "react";
import { Button } from "./ui/button";
import Image from "next/image";

export type ImageUpload = {
	id: string;
	url: string;
	file?: File;
};

type Props = {
	images?: ImageUpload[];
	onImagesChange: (images: ImageUpload[]) => void;
};
/**
 *
 * @param param0
 * @returns
 * this componets is responsible only to add or remove the images , uploading or removal will be handled in respective forms
 */
const MultiImageUploader = ({ images = [], onImagesChange }: Props) => {
	const uploadInputRef = useRef<HTMLInputElement | null>(null);
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = Array.from(e.target.files || []);
		const newImages = files.map((file, index) => {
			return {
				id: `${Date.now()}-${index}-${file.name}`,
				url: URL.createObjectURL(file),
				file,
			};
		});
		onImagesChange([...images, ...newImages]);
	};
	return (
		<div className="w-full max-w-3xl mx-auto p-4 flex justify-center">
			{images &&
				images.map((img) => (
					<Image
						key={img.id}
						src={img.url}
						alt={`img-${img.id}-${img.file}`}
						height={100}
						width={100}
					/>
				))}
			<input
				ref={uploadInputRef}
				type="file"
				multiple
				accept="images/*"
				className="hidden"
				onChange={handleInputChange}
			/>
			<Button type="button" onClick={() => uploadInputRef?.current?.click()}>
				Upload Images
			</Button>
		</div>
	);
};

export default MultiImageUploader;
