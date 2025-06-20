"use client";
import { propertyDataSchema } from "@/validation/propertySchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "./ui/form";
import { z } from "zod";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "./ui/select";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import React from "react";
import SectionSpinner from "./section-spinner";

type Props = {
	handleSubmit: (data: z.infer<typeof propertyDataSchema>) => void;
	submitButtonLabel: React.ReactNode;
	defaultValues?: z.infer<typeof propertyDataSchema>;
};
const PropertyForm = ({
	handleSubmit,
	submitButtonLabel,
	defaultValues,
}: Props) => {
	const combinedValues: z.infer<typeof propertyDataSchema> = {
		...{
			address1: "",
			address2: "",
			city: "",
			postcode: "",
			price: 0,
			bedrooms: 0,
			bathrooms: 0,
			status: "draft",
			description: "",
		},
		...defaultValues,
	};
	const form = useForm<z.infer<typeof propertyDataSchema>>({
		resolver: zodResolver(propertyDataSchema),
		defaultValues: combinedValues,
	});
	return (
		<>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(handleSubmit)}>
					<div className="grid grid-cols-2 gap-4">
						<fieldset
							className="flex flex-col gap-2"
							disabled={form.formState.isSubmitting}
						>
							<FormField
								control={form.control}
								name="status"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Status</FormLabel>
										<FormControl>
											<Select
												onValueChange={field.onChange}
												defaultValue={field.value}
											>
												<SelectTrigger className="w-[180px]">
													<SelectValue />
												</SelectTrigger>
												<SelectContent>
													<SelectItem value="draft">
														Draft
													</SelectItem>
													<SelectItem value="for-sale">
														For Sale
													</SelectItem>
													<SelectItem value="withdrawn">
														Withdrawn
													</SelectItem>
													<SelectItem value="sold">
														Sold
													</SelectItem>
												</SelectContent>
											</Select>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="address1"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Address Line 1</FormLabel>
										<FormControl>
											<Input {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="address2"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Address Line 2</FormLabel>
										<FormControl>
											<Input {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="city"
								render={({ field }) => (
									<FormItem>
										<FormLabel>City</FormLabel>
										<FormControl>
											<Input {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="postcode"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Postal Code</FormLabel>
										<FormControl>
											<Input {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</fieldset>
						<fieldset
							className="flex flex-col gap-2"
							disabled={form.formState.isSubmitting}
						>
							<FormField
								control={form.control}
								name="price"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Price</FormLabel>
										<FormControl>
											<Input {...field} type="number" />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="bedrooms"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Bedrooms</FormLabel>
										<FormControl>
											<Input {...field} type="number" />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="bathrooms"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Bathrooms</FormLabel>
										<FormControl>
											<Input {...field} type="number" />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="description"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Description</FormLabel>
										<FormControl>
											<Textarea
												rows={5}
												placeholder="Tell us a little bit about yourself"
												className="resize-none"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</fieldset>
					</div>
					<Button
						type="submit"
						className="w-full max-w-md mx-auto mt-2 flex gap-2"
					>
						<span>
							{form.formState.isSubmitting && <SectionSpinner />}
						</span>
						{submitButtonLabel}
					</Button>
				</form>
			</Form>
		</>
	);
};

export default PropertyForm;
