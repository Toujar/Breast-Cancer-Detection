'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  FileText,
  ArrowLeft,
  Heart,
  CheckCircle,
  AlertTriangle,
  Shield,
  Users,
  Scale,
  Mail,
  Lock,
  Eye
} from 'lucide-react';

export default function TermsAndConditionsPage() {
	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
			{/* Navigation */}
			<nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex justify-between items-center h-16">
						<div className="flex items-center space-x-3">
							<Link href="/">
								<Button variant="ghost" size="sm">
									<ArrowLeft className="h-4 w-4 mr-2" />
									Home
								</Button>
							</Link>
							<div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
								<Scale className="h-6 w-6 text-white" />
							</div>
							<div>
								<h1 className="text-xl font-bold text-gray-900">Terms of Service</h1>
								<p className="text-xs text-gray-500">Legal Terms & Conditions</p>
							</div>
						</div>
						<div className="flex items-center space-x-4">
							<Link href="/contact">
								<Button variant="outline" size="sm">Contact Us</Button>
							</Link>
						</div>
					</div>
				</div>
			</nav>

			<div className="max-w-4xl mx-auto p-6">
				{/* Header */}
				<div className="text-center mb-12">
					<Badge className="mb-4 bg-blue-100 text-blue-800">
						<FileText className="h-3 w-3 mr-1" />
						Last updated: {new Date().toLocaleDateString()}
					</Badge>
					<h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
						Terms of Service
					</h1>
					<p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
						Please read these terms carefully before using our AI-powered breast cancer detection platform.
						By using our service, you agree to be bound by these terms.
					</p>
				</div>

				{/* Acceptance of Terms */}
				<Card className="border-0 shadow-lg mb-8">
					<CardHeader>
						<CardTitle className="flex items-center space-x-2">
							<CheckCircle className="h-5 w-5" />
							<span>Acceptance of Terms</span>
						</CardTitle>
						<CardDescription>
							Your agreement to these terms and conditions
						</CardDescription>
					</CardHeader>
					<CardContent>
						<p className="text-gray-700 leading-relaxed">
							By accessing and using the Breast Cancer Detection app, you acknowledge that you have read,
							understood, and agree to be bound by these Terms of Service. If you do not agree to these terms,
							please do not use our service.
						</p>
					</CardContent>
				</Card>

				{/* Use of Service */}
				<Card className="border-0 shadow-lg mb-8">
					<CardHeader>
						<CardTitle className="flex items-center space-x-2">
							<Users className="h-5 w-5" />
							<span>Use of Service</span>
						</CardTitle>
						<CardDescription>
							Guidelines for using our platform
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							<div className="flex items-start space-x-3">
								<CheckCircle className="h-5 w-5 text-green-600 mt-1" />
								<div>
									<h4 className="font-semibold text-gray-900">Accurate Information</h4>
									<p className="text-gray-600">Provide accurate and truthful information when using the service</p>
								</div>
							</div>
							<div className="flex items-start space-x-3">
								<CheckCircle className="h-5 w-5 text-green-600 mt-1" />
								<div>
									<h4 className="font-semibold text-gray-900">Proper Use</h4>
									<p className="text-gray-600">Do not misuse the app or interfere with its operation</p>
								</div>
							</div>
							<div className="flex items-start space-x-3">
								<AlertTriangle className="h-5 w-5 text-amber-600 mt-1" />
								<div>
									<h4 className="font-semibold text-gray-900">Medical Disclaimer</h4>
									<p className="text-gray-600">Predictions are for informational purposes only and not a substitute for medical diagnosis</p>
								</div>
							</div>
							<div className="flex items-start space-x-3">
								<CheckCircle className="h-5 w-5 text-green-600 mt-1" />
								<div>
									<h4 className="font-semibold text-gray-900">Compliance</h4>
									<p className="text-gray-600">Use the service in compliance with all applicable laws and regulations</p>
								</div>
							</div>
						</div>
					</CardContent>
				</Card>

				{/* Account Responsibilities */}
				<Card className="border-0 shadow-lg mb-8">
					<CardHeader>
						<CardTitle className="flex items-center space-x-2">
							<Lock className="h-5 w-5" />
							<span>Account Responsibilities</span>
						</CardTitle>
						<CardDescription>
							Your obligations regarding account security
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							<p className="text-gray-700 leading-relaxed">
								You are responsible for maintaining the confidentiality of your account credentials and for all
								activities that occur under your account. This includes:
							</p>
							<ul className="space-y-2">
								<li className="flex items-center space-x-2">
									<CheckCircle className="h-4 w-4 text-blue-600" />
									<span className="text-sm">Keeping your password secure and confidential</span>
								</li>
								<li className="flex items-center space-x-2">
									<CheckCircle className="h-4 w-4 text-blue-600" />
									<span className="text-sm">Notifying us immediately of any unauthorized use</span>
								</li>
								<li className="flex items-center space-x-2">
									<CheckCircle className="h-4 w-4 text-blue-600" />
									<span className="text-sm">Ensuring all account information is accurate and up-to-date</span>
								</li>
								<li className="flex items-center space-x-2">
									<CheckCircle className="h-4 w-4 text-blue-600" />
									<span className="text-sm">Taking responsibility for all actions performed under your account</span>
								</li>
							</ul>
						</div>
					</CardContent>
				</Card>

				{/* Intellectual Property */}
				<Card className="border-0 shadow-lg mb-8">
					<CardHeader>
						<CardTitle className="flex items-center space-x-2">
							<Eye className="h-5 w-5" />
							<span>Intellectual Property</span>
						</CardTitle>
						<CardDescription>
							Ownership and usage rights
						</CardDescription>
					</CardHeader>
					<CardContent>
						<p className="text-gray-700 leading-relaxed">
							The service and its original content, features, and functionality are owned by our company and are
							protected by international copyright, trademark, patent, trade secret, and other intellectual property
							or proprietary rights laws. You may not modify, reproduce, distribute, or create derivative works
							based on our service without explicit written permission.
						</p>
					</CardContent>
				</Card>

				{/* Limitation of Liability */}
				<Card className="border-0 shadow-lg mb-8">
					<CardHeader>
						<CardTitle className="flex items-center space-x-2">
							<Shield className="h-5 w-5" />
							<span>Limitation of Liability</span>
						</CardTitle>
						<CardDescription>
							Important legal disclaimers
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							<div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
								<div className="flex items-start space-x-2">
									<AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5" />
									<div>
										<h4 className="font-semibold text-amber-800">Medical Disclaimer</h4>
										<p className="text-sm text-amber-700 mt-1">
											Our AI predictions are for informational purposes only and should not be considered as medical advice,
											diagnosis, or treatment. Always consult with qualified healthcare professionals for medical decisions.
										</p>
									</div>
								</div>
							</div>
							<p className="text-gray-700 leading-relaxed">
								To the maximum extent permitted by law, we shall not be liable for any indirect, incidental, special,
								consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill,
								or other intangible losses resulting from your use of the service.
							</p>
						</div>
					</CardContent>
				</Card>

				{/* Service Availability */}
				<Card className="border-0 shadow-lg mb-8">
					<CardHeader>
						<CardTitle className="flex items-center space-x-2">
							<Heart className="h-5 w-5" />
							<span>Service Availability</span>
						</CardTitle>
						<CardDescription>
							Uptime and service modifications
						</CardDescription>
					</CardHeader>
					<CardContent>
						<p className="text-gray-700 leading-relaxed">
							We strive to maintain high service availability but cannot guarantee uninterrupted access. We reserve
							the right to modify, suspend, or discontinue the service at any time with or without notice. We are
							not liable for any loss or damage resulting from service interruptions or modifications.
						</p>
					</CardContent>
				</Card>

				{/* Changes to Terms */}
				<Card className="border-0 shadow-lg mb-8">
					<CardHeader>
						<CardTitle className="flex items-center space-x-2">
							<FileText className="h-5 w-5" />
							<span>Changes to Terms</span>
						</CardTitle>
						<CardDescription>
							How we handle updates to these terms
						</CardDescription>
					</CardHeader>
					<CardContent>
						<p className="text-gray-700 leading-relaxed">
							We reserve the right to modify these terms at any time. We will notify users of significant changes
							via email or through the service. Your continued use of the service after such modifications
							constitutes acceptance of the updated terms. If you do not agree to the modified terms, you should
							discontinue use of the service.
						</p>
					</CardContent>
				</Card>

				{/* Governing Law */}
				<Card className="border-0 shadow-lg mb-8">
					<CardHeader>
						<CardTitle className="flex items-center space-x-2">
							<Scale className="h-5 w-5" />
							<span>Governing Law</span>
						</CardTitle>
						<CardDescription>
							Legal jurisdiction and dispute resolution
						</CardDescription>
					</CardHeader>
					<CardContent>
						<p className="text-gray-700 leading-relaxed">
							These terms shall be governed by and construed in accordance with applicable laws. Any disputes
							arising from these terms or your use of the service shall be resolved through binding arbitration
							or in the courts of competent jurisdiction.
						</p>
					</CardContent>
				</Card>

				{/* Contact Section */}
				<Card className="border-0 shadow-lg">
					<CardHeader>
						<CardTitle className="flex items-center space-x-2">
							<Mail className="h-5 w-5" />
							<span>Contact Information</span>
						</CardTitle>
						<CardDescription>
							Questions about these terms? We're here to help.
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="text-center">
							<p className="text-gray-700 mb-4">
								If you have any questions about these Terms of Service, please contact us through our support channels.
							</p>
							<Link href="/contact">
								<Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
									<Mail className="h-4 w-4 mr-2" />
									Contact Support
								</Button>
							</Link>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
