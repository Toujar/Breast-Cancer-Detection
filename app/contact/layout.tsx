import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Contact · Breast Cancer Detection",
	description: "Get in touch with the Breast Cancer Detection app team.",
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
	return children;
}
