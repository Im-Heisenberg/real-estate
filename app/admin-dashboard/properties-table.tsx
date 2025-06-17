import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { getProperties } from "@/data/properties";

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
									<TableCell>{property.price}</TableCell>
									<TableCell>{property.status}</TableCell>
									<TableCell>edit/view</TableCell>
								</TableRow>
							);
						})}
					</TableBody>
				</Table>
			)}
			<Pagination className="mt-4">
				<PaginationContent>
					<PaginationItem>
						<PaginationPrevious
							href={`/admin-dashboard/?page=${
								Number(page) - 1 > 0 && Number(page) - 1 <= totalPages
									? Number(page - 1)
									: 1
							}`}
						/>
					</PaginationItem>
					{Array.from({ length: totalPages }, (_, i) => {
						const isCurrentPage = Number(page) === i + 1;
						return (
							<PaginationItem key={i}>
								<PaginationLink
									isActive={isCurrentPage}
									href={`/admin-dashboard/?page=${
										i + 1
									}`}
								>
									{i + 1}
								</PaginationLink>
							</PaginationItem>
						);
					})}
					<PaginationItem>
						<PaginationNext
							href={`/admin-dashboard/?page=${Math.min(
								Math.max(1, Number(page) || 1) + 1, // Ensure page is at least 1
								Number(totalPages) || 1 // Ensure totalPages is at least 1
							)}`}
						/>
					</PaginationItem>
				</PaginationContent>
			</Pagination>
		</>
	);
};

export default PropertiesTable;
