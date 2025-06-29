import { AdminPagination } from "@/components/Pagination";
import PropertyStatusBadge from "@/components/status-badge";
import { Button } from "@/components/ui/button";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { getProperties } from "@/data/properties";
import { EyeIcon, PencilIcon } from "lucide-react";
import Link from "next/link";
import numeral from "numeral";

const PropertiesTable = async ({ page = 1 }: { page?: number }) => {
	const { data, totalPages } = await getProperties({
		pagination: {
			pageSize: 5,
			page,
		},
	});

	return (
		<>
			{!data && (
				<h1 className="text-center text-zinc-400 py-20 font-bold text-3xl">
					Zero properties listed by you yet !{" "}
				</h1>
			)}
			{data && (
				<Table className="mt-5">
					<TableHeader>
						<TableRow>
							<TableHead>Address</TableHead>
							<TableHead>Listing Price</TableHead>
							<TableHead>Status</TableHead>
							<TableHead />
						</TableRow>
					</TableHeader>
					<TableBody>
						{data.map((property) => {
							const address = [
								property.address1,
								property.address2,
								property.city,
								property.postcode,
							]
								.filter((addressLine) => !!addressLine)
								.join(", ");
							return (
								<TableRow key={property.id}>
									<TableCell>{address}</TableCell>
									<TableCell>
										${numeral(property.price).format("0,0")}
									</TableCell>
									<TableCell>
										{<PropertyStatusBadge status={property.status} />}
									</TableCell>
									<TableCell className="flex justify-end gap-1 items-center">
										<Button asChild variant={"outline"} size={"sm"}>
											<Link href={`/property/${property.id}`}>
												<EyeIcon />
											</Link>
										</Button>
										<Button asChild variant={"outline"} size={"sm"}>
											<Link
												href={`/admin-dashboard/edit/${property.id}`}
											>
												<PencilIcon />
											</Link>
										</Button>
									</TableCell>
								</TableRow>
							);
						})}
					</TableBody>
				</Table>
			)}
			<AdminPagination page={page} totalPages={totalPages} />
		</>
	);
};

export default PropertiesTable;
