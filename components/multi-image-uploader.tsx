"use client";

import { useRef } from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import {
	DragDropContext,
	Draggable,
	Droppable,
	DropResult,
} from "@hello-pangea/dnd";
import { Badge } from "./ui/badge";
import { MoveIcon, XIcon } from "lucide-react";
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
		// get all files
		const files = Array.from(e.target.files || []);
		const newImages = files.map((file, index) => {
			// create object for each image uploaded and wrap in an array
			return {
				id: `${Date.now()}-${index}-${file.name}`,
				url: URL.createObjectURL(file),
				file,
			};
		});
		// call the function passed from parent form to this <MultiImageUploader/> component
		onImagesChange([...images, ...newImages]);
	};
	function onDragEnd(result: DropResult) {
		if (!result.destination) {
			return;
		}
		const items = [...images];
		const [reorderedImage] = items.splice(result.source.index, 1);
		items.splice(result.destination.index, 0, reorderedImage);
		onImagesChange(items);
	}
	const handleDelete = (imageId: string) => {
		const updatedImages = images.filter((image) => image.id !== imageId);
		onImagesChange(updatedImages);
	};
	return (
		<div className="w-full max-w-3xl mx-auto p-4">
			<input
				ref={uploadInputRef}
				type="file"
				multiple
				accept="images/*"
				className="hidden"
				onChange={handleInputChange}
			/>
			<Button
				type="button"
				className="w-full"
				variant={"outline"}
				onClick={() => uploadInputRef?.current?.click()}
			>
				Upload Images
			</Button>
			<DragDropContext onDragEnd={onDragEnd}>
				<Droppable droppableId="images-list">
					{(provided) => (
						<div ref={provided.innerRef} {...provided.droppableProps}>
							{images?.map((img, i) => (
								<Draggable draggableId={img.id} index={i} key={img.id}>
									{(provided) => (
										<div
											{...provided.draggableProps}
											{...provided.dragHandleProps}
											ref={provided.innerRef}
											className="relative p-2"
										>
											<div className="bg-gray-100 rounded-lg flex gap-2 items-center overflow-hidden">
												<div className="size-16 w-16 h-16 relative">
													<Image
														src={img.url}
														alt={`img-${img.id}-${img.file}`}
														fill
														className="object-cover"
													/>
												</div>
												<div className="flex-grow">
													<p className="text-sm font-medium flex gap-3">
														Image {i + 1}
														{i === 0 && (
															<Badge variant={"success"}>
																Featured
															</Badge>
														)}
													</p>
												</div>
												<div className="flex items-center p-2">
													<button
														className="text-red-500"
														onClick={() => handleDelete(img.id)}
													>
														<XIcon />
													</button>
													<div className="text-gray-500">
														<MoveIcon />
													</div>
												</div>
											</div>
										</div>
									)}
								</Draggable>
							))}
							{provided.placeholder}
						</div>
					)}
				</Droppable>
			</DragDropContext>
		</div>
	);
};

export default MultiImageUploader;
