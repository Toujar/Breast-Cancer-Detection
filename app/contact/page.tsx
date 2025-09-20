"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function ContactPage() {
	const [formState, setFormState] = useState({ name: "", email: "", message: "" });
	const [submitting, setSubmitting] = useState(false);
	const [submitted, setSubmitted] = useState(false);

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setSubmitting(true);
		try {
			await new Promise((res) => setTimeout(res, 600));
			setSubmitted(true);
		} finally {
			setSubmitting(false);
		}
	}

	return (
		<main className="container mx-auto max-w-xl px-4 py-10">
			<h1 className="text-3xl font-bold mb-6">Contact</h1>
			<p className="mb-6 text-muted-foreground">
				Have a question or feedback? Send us a message below.
			</p>
			{submitted ? (
				<div className="rounded-md border p-4">
					<p>Thanks! We received your message and will get back to you soon.</p>
				</div>
			) : (
				<form onSubmit={handleSubmit} className="space-y-4">
					<div className="space-y-2">
						<label htmlFor="name" className="text-sm font-medium">Name</label>
						<Input
							id="name"
							value={formState.name}
							onChange={(e) => setFormState({ ...formState, name: e.target.value })}
							required
						/>
					</div>
					<div className="space-y-2">
						<label htmlFor="email" className="text-sm font-medium">Email</label>
						<Input
							id="email"
							type="email"
							value={formState.email}
							onChange={(e) => setFormState({ ...formState, email: e.target.value })}
							required
						/>
					</div>
					<div className="space-y-2">
						<label htmlFor="message" className="text-sm font-medium">Message</label>
						<Textarea
							id="message"
							rows={5}
							value={formState.message}
							onChange={(e) => setFormState({ ...formState, message: e.target.value })}
							required
						/>
					</div>
					<Button type="submit" disabled={submitting}>
						{submitting ? "Sending..." : "Send message"}
					</Button>
				</form>
			)}
		</main>
	);
}
