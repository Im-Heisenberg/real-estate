import Link from "next/link";

const AuthButtons = () => {
	return (
		<div>
			<div className="flex gap-2 items-center">
				<Link
					href="/login"
					className="uppercase tracking-widest hover:underline"
				>
					Login
				</Link>
				<div className="h-8 w-[1px] bg-white/50" />
				<Link
					href="/register"
					className="uppercase tracking-widest hover:underline"
				>
					Signup
				</Link>
			</div>
		</div>
	);
};

export default AuthButtons;
