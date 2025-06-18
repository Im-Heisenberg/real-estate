"use client";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "@/context/auth";
import AuthButtons from "./auth-buttons";
import Link from "next/link";
import Image from "next/image";
import SectionSpinner from "./section-spinner";
import { useRouter } from "next/navigation";
const HeaderOptions = () => {
	const auth = useAuth();
	const router = useRouter();
	const nameInitial: string | null =
		auth?.currentUser?.displayName?.[0] ||
		auth?.currentUser?.email?.[0] ||
		null;
	const isAdmin: boolean | null =
		auth?.customClaims?.admin &&
		typeof auth?.customClaims?.admin === "boolean"
			? auth?.customClaims?.admin
			: null;
	if (auth?.fetchingUser) {
		return <SectionSpinner />;
	}
	return (
		<>
			{auth?.currentUser ? (
				<DropdownMenu>
					<DropdownMenuTrigger>
						<Avatar>
							{/* <AvatarImage src={`${auth?.currentUser?.photoURL}`} /> */}
							{!!auth?.currentUser?.photoURL ? (
								<Image
									src={auth?.currentUser?.photoURL}
									alt="profile image"
									height={50}
									width={50}
								/>
							) : (
								<AvatarFallback>{nameInitial}</AvatarFallback>
							)}
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
						{isAdmin ? (
							<DropdownMenuItem asChild>
								<Link href="/admin-dashboard">Admin Dashboard</Link>
							</DropdownMenuItem>
						) : (
							<DropdownMenuItem asChild>
								<Link href="/account/my-favourites">My Favourites</Link>
							</DropdownMenuItem>
						)}
						<DropdownMenuItem
							onClick={async () => {
								await auth.logout();
								router.refresh();
							}}
						>
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
