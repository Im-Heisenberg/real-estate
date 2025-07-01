import PropertyStatusBadge from "@/components/status-badge";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
} from "@/components/ui/carousel";
import { getPorpertyById } from "@/data/properties";
import Image from "next/image";
import numeral from "numeral";
import ReactMarkdown from "react-markdown";
import BackButton from "./back-btn";
import { BathIcon, Bed } from "lucide-react";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const PropertyPage = async ({ params }: { params: Promise<any> }) => {
	const { propertyId } = await params;
	const { property } = await getPorpertyById(propertyId);
	const addressLines = [
		property.address1,
		property.address2,
		property.city,
		property.postcode,
	].filter((addressLine) => !!addressLine);
	return (
		<div className="grid grid-cols-[1fr_500px]">
			<div>
				{!!property.images && (
					<Carousel className="w-full">
						<CarouselContent>
							{property.images.map((image) => {
								return (
									<CarouselItem key={image}>
										<div className="relative h-[80vh] min-h-80">
											<Image
												src={`https://firebasestorage.googleapis.com/v0/b/fire-homes-55261.firebasestorage.app/o/${encodeURIComponent(
													image
												)}?alt=media`}
												alt="property-image"
												fill
												className="object-cover"
											/>
										</div>
									</CarouselItem>
								);
							})}
						</CarouselContent>
					</Carousel>
				)}
				<div className="property-description max-w-screen-md mx-auto py-10 px-4">
					<BackButton />
					<ReactMarkdown>{property.description}</ReactMarkdown>
				</div>
			</div>
			<div className="bg-sky-200 h-screen sticky top-0 flex justify-center items-center p-10">
				<div className="flex flex-col gap-10 w-full">
					<div>
						<PropertyStatusBadge
							status={property.status}
							className="mr-auto text-base"
						/>
					</div>
					<h1 className="text-4xl font-semibold">
						{addressLines.map((addressLine, index) => (
							<div key={index}>
								{addressLine}
								{index < addressLines.length - 1 && ","}
							</div>
						))}
					</h1>
					<h2 className="text-3xl font-light">
						${numeral(property.price).format("0,0")}
					</h2>
					<div className="flex gap-10">
						<div className="flex gap-2">
							<Bed/> {property.bedrooms}
						</div>
						<div className="flex gap-2">
							<BathIcon/> {property.bathrooms}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PropertyPage;
