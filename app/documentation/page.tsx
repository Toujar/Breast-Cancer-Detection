export const metadata = {
	title: "Documentation · Breast Cancer Detection",
	description: "Documentation for using the Breast Cancer Detection app, including features and FAQs.",
};

export default function DocumentationPage() {
	return (
		<main className="container mx-auto max-w-3xl px-4 py-10">
			<h1 className="text-3xl font-bold mb-6">Documentation</h1>
			<section className="space-y-4">
				<p>
					Welcome to the Breast Cancer Detection app documentation. This guide provides an overview
					of features, how to get started, and answers to common questions.
				</p>
				<h2 className="text-xl font-semibold mt-6">Getting Started</h2>
				<ol className="list-decimal pl-6 space-y-2">
					<li>Create an account or sign in from the Auth page.</li>
					<li>Navigate to Predict to upload an image or fill the tabular form.</li>
					<li>Review your results and access history from the Dashboard.</li>
				</ol>

				<h2 className="text-xl font-semibold mt-6">Features</h2>
				<ul className="list-disc pl-6 space-y-2">
					<li>Image-based prediction using a CNN model.</li>
					<li>Tabular data prediction using a trained classifier.</li>
					<li>Results history, PDF export, and secure sharing links.</li>
				</ul>

				<h2 className="text-xl font-semibold mt-6">FAQ</h2>
				<div className="space-y-3">
					<p>
						<strong>Q:</strong> What formats are supported for image upload?
						<br />
						<strong>A:</strong> PNG and JPEG formats up to 5MB.
					</p>
					<p>
						<strong>Q:</strong> Can I download my results?
						<br />
						<strong>A:</strong> Yes, you can export as PDF from the results page.
					</p>
				</div>
			</section>
		</main>
	);
}
