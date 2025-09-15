'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Heart,
  ArrowLeft,
  BookOpen,
  FlaskConical,
  FileText,
  LineChart,
  Brain,
  Database
} from 'lucide-react';

export default function ResearchPage() {
  const papers = [
    {
      title: 'Breast Cancer Wisconsin (Diagnostic) Dataset',
      venue: 'UCI Machine Learning Repository',
      link: 'https://archive.ics.uci.edu/dataset/17/breast+cancer+wisconsin+diagnostic',
      tags: ['Dataset', 'Tabular'],
    },
    {
      title: 'Deep Residual Learning for Image Recognition',
      venue: 'CVPR 2016',
      link: 'https://arxiv.org/abs/1512.03385',
      tags: ['CNN', 'ResNet', 'Vision'],
    },
    {
      title: 'Scikit-learn: Machine Learning in Python',
      venue: 'Journal of Machine Learning Research',
      link: 'https://jmlr.org/papers/v12/pedregosa11a.html',
      tags: ['ML', 'Python'],
    },
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
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Research</h1>
                <p className="text-xs text-gray-500">References and Methodology</p>
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

      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-indigo-100 text-indigo-800">
            <FlaskConical className="h-3 w-3 mr-1" />
            Scientific Basis
          </Badge>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Methodology & References</h1>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Core research materials, datasets, and methodologies that inform the tabular and image-based prediction pipelines.
          </p>
        </div>

        {/* Methodology */}
        <div className="grid lg:grid-cols-3 gap-6 mb-12">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Brain className="h-5 w-5 text-indigo-600" />
                <span>Tabular Pipeline</span>
              </CardTitle>
              <CardDescription>Preprocessing and model training</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-gray-700">
              <div>• Standardization using scikit-learn scaler</div>
              <div>• Feature selection and cross-validation</div>
              <div>• Random Forest classifier with tuned hyperparameters</div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Database className="h-5 w-5 text-green-600" />
                <span>Image Pipeline</span>
              </CardTitle>
              <CardDescription>Preparation and inference</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-gray-700">
              <div>• Resizing and normalization to 224×224</div>
              <div>• CNN backbone based on ResNet</div>
              <div>• ONNX runtime for efficient inference</div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <LineChart className="h-5 w-5 text-blue-600" />
                <span>Evaluation Metrics</span>
              </CardTitle>
              <CardDescription>How we measure performance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-gray-700">
              <div>• Accuracy, Precision, Recall, F1-Score</div>
              <div>• Stratified train/test splits</div>
              <div>• Reported metrics on held-out data</div>
            </CardContent>
          </Card>
        </div>

        {/* References */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {papers.map((p, i) => (
            <Card key={i} className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg flex items-start justify-between">
                  <span className="pr-4">{p.title}</span>
                  <a href={p.link} target="_blank" className="text-indigo-600 text-sm">View</a>
                </CardTitle>
                <CardDescription>{p.venue}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <Badge key={t} variant="secondary">{t}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Try the methodology yourself</h2>
          <p className="text-gray-600 mb-6">Run a data or image analysis and see the metrics live.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/predict/tabular">
              <Button>
                <FileText className="h-4 w-4 mr-2" />
                Start Data Analysis
              </Button>
            </Link>
            <Link href="/predict/image">
              <Button variant="outline">
                <FileText className="h-4 w-4 mr-2" />
                Start Image Analysis
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}


