'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Shield,
  ArrowLeft,
  Heart,
  CheckCircle,
  FileText,
  Users,
  Lock,
  Eye,
  Database,
  Trash2,
  Mail
} from 'lucide-react';

export default function PrivacyPolicyPage() {
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
								<Shield className="h-6 w-6 text-white" />
							</div>
							<div>
								<h1 className="text-xl font-bold text-gray-900">Privacy Policy</h1>
								<p className="text-xs text-gray-500">Data Protection & Privacy</p>
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
						<Shield className="h-3 w-3 mr-1" />
						Last updated: {new Date().toLocaleDateString()}
					</Badge>
					<h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
						Privacy Policy
					</h1>
					<p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
						Your privacy is important to us. This policy explains how we collect, use, and protect your information
						when you use our AI-powered breast cancer detection platform.
					</p>
				</div>

				{/* Overview Section */}
				<Card className="border-0 shadow-lg mb-8">
					<CardHeader>
						<CardTitle className="flex items-center space-x-2">
							<Eye className="h-5 w-5" />
							<span>Overview</span>
						</CardTitle>
						<CardDescription>
							Understanding our commitment to your privacy
						</CardDescription>
					</CardHeader>
					<CardContent>
						<p className="text-gray-700 leading-relaxed">
							This Privacy Policy explains how the Breast Cancer Detection app collects, uses, and safeguards
							your information. We are committed to protecting your privacy and ensuring the security of your
							personal and medical data in accordance with applicable privacy laws and regulations.
						</p>
					</CardContent>
				</Card>

				{/* Information Collection */}
				<Card className="border-0 shadow-lg mb-8">
					<CardHeader>
						<CardTitle className="flex items-center space-x-2">
							<Database className="h-5 w-5" />
							<span>Information We Collect</span>
						</CardTitle>
						<CardDescription>
							Types of data we gather and why
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							<div className="flex items-start space-x-3">
								<CheckCircle className="h-5 w-5 text-green-600 mt-1" />
								<div>
									<h4 className="font-semibold text-gray-900">Account Information</h4>
									<p className="text-gray-600">Name, email address, username, age, and phone number</p>
								</div>
							</div>
							<div className="flex items-start space-x-3">
								<CheckCircle className="h-5 w-5 text-green-600 mt-1" />
								<div>
									<h4 className="font-semibold text-gray-900">Medical Data</h4>
									<p className="text-gray-600">Uploaded images and tabular inputs for predictions</p>
								</div>
							</div>
							<div className="flex items-start space-x-3">
								<CheckCircle className="h-5 w-5 text-green-600 mt-1" />
								<div>
									<h4 className="font-semibold text-gray-900">Usage Analytics</h4>
									<p className="text-gray-600">Platform usage patterns to improve our services</p>
								</div>
							</div>
						</div>
					</CardContent>
				</Card>

				{/* Data Usage */}
				<Card className="border-0 shadow-lg mb-8">
					<CardHeader>
						<CardTitle className="flex items-center space-x-2">
							<FileText className="h-5 w-5" />
							<span>How We Use Your Information</span>
						</CardTitle>
						<CardDescription>
							Purposes for which we process your data
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="grid md:grid-cols-2 gap-6">
							<div className="space-y-3">
								<div className="flex items-center space-x-2">
									<Heart className="h-4 w-4 text-blue-600" />
									<span className="text-sm font-medium">Provide AI predictions</span>
								</div>
								<div className="flex items-center space-x-2">
									<Users className="h-4 w-4 text-blue-600" />
									<span className="text-sm font-medium">Improve our services</span>
								</div>
								<div className="flex items-center space-x-2">
									<Shield className="h-4 w-4 text-blue-600" />
									<span className="text-sm font-medium">Maintain security</span>
								</div>
							</div>
							<div className="space-y-3">
								<div className="flex items-center space-x-2">
									<Mail className="h-4 w-4 text-blue-600" />
									<span className="text-sm font-medium">Respond to support requests</span>
								</div>
								<div className="flex items-center space-x-2">
									<Database className="h-4 w-4 text-blue-600" />
									<span className="text-sm font-medium">Prevent abuse and fraud</span>
								</div>
								<div className="flex items-center space-x-2">
									<FileText className="h-4 w-4 text-blue-600" />
									<span className="text-sm font-medium">Comply with legal obligations</span>
								</div>
							</div>
						</div>
					</CardContent>
				</Card>

				{/* Data Protection */}
				<Card className="border-0 shadow-lg mb-8">
					<CardHeader>
						<CardTitle className="flex items-center space-x-2">
							<Lock className="h-5 w-5" />
							<span>Data Protection & Security</span>
						</CardTitle>
						<CardDescription>
							How we keep your information safe
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							<p className="text-gray-700 leading-relaxed">
								We implement industry-standard security measures to protect your data, including:
							</p>
							<ul className="space-y-2">
								<li className="flex items-center space-x-2">
									<CheckCircle className="h-4 w-4 text-green-600" />
									<span className="text-sm">End-to-end encryption for data transmission</span>
								</li>
								<li className="flex items-center space-x-2">
									<CheckCircle className="h-4 w-4 text-green-600" />
									<span className="text-sm">Secure data storage with access controls</span>
								</li>
								<li className="flex items-center space-x-2">
									<CheckCircle className="h-4 w-4 text-green-600" />
									<span className="text-sm">Regular security audits and updates</span>
								</li>
								<li className="flex items-center space-x-2">
									<CheckCircle className="h-4 w-4 text-green-600" />
									<span className="text-sm">HIPAA-compliant data handling practices</span>
								</li>
							</ul>
						</div>
					</CardContent>
				</Card>

				{/* Your Rights */}
				<Card className="border-0 shadow-lg mb-8">
					<CardHeader>
						<CardTitle className="flex items-center space-x-2">
							<Users className="h-5 w-5" />
							<span>Your Rights</span>
						</CardTitle>
						<CardDescription>
							Control over your personal information
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="grid md:grid-cols-2 gap-6">
							<div className="space-y-3">
								<div className="flex items-start space-x-2">
									<Eye className="h-4 w-4 text-blue-600 mt-1" />
									<div>
										<h4 className="font-semibold text-sm">Access Your Data</h4>
										<p className="text-xs text-gray-600">View what information we have about you</p>
									</div>
								</div>
								<div className="flex items-start space-x-2">
									<FileText className="h-4 w-4 text-blue-600 mt-1" />
									<div>
										<h4 className="font-semibold text-sm">Update Information</h4>
										<p className="text-xs text-gray-600">Correct or modify your personal details</p>
									</div>
								</div>
							</div>
							<div className="space-y-3">
								<div className="flex items-start space-x-2">
									<Trash2 className="h-4 w-4 text-blue-600 mt-1" />
									<div>
										<h4 className="font-semibold text-sm">Delete Your Data</h4>
										<p className="text-xs text-gray-600">Request removal of your information</p>
									</div>
								</div>
								<div className="flex items-start space-x-2">
									<Shield className="h-4 w-4 text-blue-600 mt-1" />
									<div>
										<h4 className="font-semibold text-sm">Withdraw Consent</h4>
										<p className="text-xs text-gray-600">Opt out of data processing</p>
									</div>
								</div>
							</div>
						</div>
					</CardContent>
				</Card>

				{/* Data Retention */}
				<Card className="border-0 shadow-lg mb-8">
					<CardHeader>
						<CardTitle className="flex items-center space-x-2">
							<Database className="h-5 w-5" />
							<span>Data Retention</span>
						</CardTitle>
						<CardDescription>
							How long we keep your information
						</CardDescription>
					</CardHeader>
					<CardContent>
						<p className="text-gray-700 leading-relaxed">
							We retain your data only as long as necessary for the purposes described in this policy.
							Medical data is typically retained for 7 years in accordance with healthcare regulations,
							while account information is kept until you request deletion or close your account.
						</p>
					</CardContent>
				</Card>

				{/* Contact Section */}
				<Card className="border-0 shadow-lg">
					<CardHeader>
						<CardTitle className="flex items-center space-x-2">
							<Mail className="h-5 w-5" />
							<span>Contact Us</span>
						</CardTitle>
						<CardDescription>
							Questions about your privacy? We're here to help.
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="text-center">
							<p className="text-gray-700 mb-4">
								If you have any questions about this Privacy Policy or how we handle your data,
								please don't hesitate to contact us.
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
