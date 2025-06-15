import { Breadcrumbs } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { PlusCircleIcon } from "lucide-react";
import Link from "next/link";

const AdminDashboard = () => {
	return (
		<>
			<Breadcrumbs items={[{ label: "Dashboard" }]} />
			<h1 className="text-4xl font-bold mt-6">Admin Dashboard</h1>
			<Button asChild>
				<Link href={"/admin-dashboard/new"}>
					<div className="inline-flex items-center gap-2">
						<PlusCircleIcon />
						New Property
					</div>
				</Link>
			</Button>
		</>
	);
};

export default AdminDashboard;
