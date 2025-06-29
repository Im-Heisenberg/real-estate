import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "./ui/pagination";

export const AdminPagination = ({
	page,
	totalPages,
}: {
	page: number;
	totalPages: number;
}) => {
	return (
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
								href={`/admin-dashboard/?page=${i + 1}`}
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
	);
};
