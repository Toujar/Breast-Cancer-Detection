'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Heart,
  ArrowLeft,
  HelpCircle,
  MessageSquare,
  FileText,
  Shield,
  Phone
} from 'lucide-react';

export default function HelpPage() {
  const faqs = [
    { q: 'How do I make a prediction?', a: 'Go to Predict > choose Data or Image, fill inputs or upload an image, then submit.' },
    { q: 'Where can I see my results?', a: 'Your latest predictions appear on the Dashboard and all past ones in History.' },
    { q: 'Who can access my data?', a: 'Only you and admins. We enforce cookie-based auth and store results in MongoDB.' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-3">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Home
              </Button>
            </Link>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Help Center</h1>
                <p className="text-xs text-gray-500">FAQs and Support</p>
              </div>
            </div>
            <div>
              <Link href="/dashboard">
                <Button size="sm">Dashboard</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto p-6">
        <div className="text-center mb-10">
          <Badge className="mb-4 bg-blue-100 text-blue-800">
            <HelpCircle className="h-3 w-3 mr-1" />
            We are here to help
          </Badge>
          <h1 className="text-3xl font-bold text-gray-900 mb-3">Frequently Asked Questions</h1>
          <p className="text-gray-600">Find quick answers or reach out to support.</p>
        </div>

        <div className="space-y-4 mb-12">
          {faqs.map((f, i) => (
            <Card key={i} className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">{f.q}</CardTitle>
                <CardDescription>{f.a}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>

        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MessageSquare className="h-5 w-5" />
              <span>Need more help?</span>
            </CardTitle>
            <CardDescription>Contact us for assistance</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col sm:flex-row gap-3">
            <Link href="/predict/tabular">
              <Button>
                <FileText className="h-4 w-4 mr-2" />
                Try Data Analysis
              </Button>
            </Link>
            <a href="mailto:support@example.com" className="inline-flex">
              <Button variant="outline">
                <Shield className="h-4 w-4 mr-2" />
                Email Support
              </Button>
            </a>
            <a href="tel:+10000000000" className="inline-flex">
              <Button variant="outline">
                <Phone className="h-4 w-4 mr-2" />
                Call Support
              </Button>
            </a>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}


