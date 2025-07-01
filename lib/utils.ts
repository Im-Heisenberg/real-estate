import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const imageUrlFormatter = (url: string) => {
	return `https://firebasestorage.googleapis.com/v0/b/fire-homes-55261.firebasestorage.app/o/${encodeURIComponent(
		url
	)}?alt=media`;
};
