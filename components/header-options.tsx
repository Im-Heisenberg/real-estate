"use client";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/context/auth";
import AuthButtons from "./auth-buttons";
import Link from "next/link";
const HeaderOptions = () => {
	const auth = useAuth();
	const nameInitial: string | null =
		auth?.currentUser?.displayName?.[0] ||
		auth?.currentUser?.email?.[0] ||
		null;
	return (
		<>
			{auth?.currentUser ? (
				<DropdownMenu>
					<DropdownMenuTrigger>
						<Avatar>
							<AvatarImage src={`${auth?.currentUser?.photoURL}`} />
							<AvatarFallback>{nameInitial}</AvatarFallback>
						</Avatar>
					</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuLabel>
							<div>{auth.currentUser.displayName}</div>
							<div className="font-normal text-xs">
								{auth.currentUser.email}
							</div>
						</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuItem asChild>
							<Link href="/account">My Account</Link>
						</DropdownMenuItem>
						<DropdownMenuItem asChild>
							<Link href="/admin-dashboard">Admin Dashboard</Link>
						</DropdownMenuItem>
						<DropdownMenuItem asChild>
							<Link href="/account/my-favourites">My Favourites</Link>
						</DropdownMenuItem>
						<DropdownMenuItem onClick={auth.logout}>
							Logout
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			) : (
				<AuthButtons />
			)}
		</>
	);
};

export default HeaderOptions;
