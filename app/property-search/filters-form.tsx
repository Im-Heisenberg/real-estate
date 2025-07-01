"use client";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
	minPrice: z.string().optional(),
	maxPrice: z.string().optional(),
	minBedroom: z.string().optional(),
});
const FilterForm = () => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			minPrice: searchParams.get("minPrice") ?? "",
			maxPrice: searchParams.get("maxPrice") ?? "",
			minBedroom: searchParams.get("minBedroom") ?? "",
		},
	});
	const handleSubmit = (data: z.infer<typeof formSchema>) => {
		const newSearchParams = new URLSearchParams();
		if (data.minPrice) {
			newSearchParams.set("minPrice", data.minPrice);
		}
		if (data.maxPrice) {
			newSearchParams.set("maxPrice", data.maxPrice);
		}
		if (data.minBedroom) {
			newSearchParams.set("minBedroom", data.minBedroom);
		}
		newSearchParams.set("page", "1");
		router.push(`/property-search?${newSearchParams.toString()}`);
	};
	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(handleSubmit)}
				className="grid grid-cols-4 gap-20"
			>
				<FormField
					control={form.control}
					name="minPrice"
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Input
									{...field}
									placeholder="Min Price"
									type="number"
									min={0}
								/>
							</FormControl>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="maxPrice"
					render={({field}) => (
						<FormItem>
							<FormControl>
								<Input
									{...field}
									placeholder="Max Price"
									type="number"
									min={0}
								/>
							</FormControl>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="minBedroom"
					render={({field}) => (
						<FormItem>
							<FormControl>
								<Input
									{...field}
									placeholder="Min Bedroom"
									type="number"
									min={0}
								/>
							</FormControl>
						</FormItem>
					)}
				/>
				<Button>Search</Button>
			</form>
		</Form>
	);
};

export default FilterForm;
