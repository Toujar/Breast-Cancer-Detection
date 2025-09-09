'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Heart, 
  ArrowLeft, 
  Download, 
  Share2,
  Brain,
  CheckCircle,
  AlertTriangle,
  BarChart3,
  FileText,
  Clock,
  Loader2
} from 'lucide-react';
// import { useAuth } from '@/lib/auth-context';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

interface PredictionResult {
  id: string;
  type: 'tabular' | 'image';
  prediction: 'benign' | 'malignant';
  confidence: number;
  inputData?: any;
  modelMetrics: {
    accuracy: number;
    precision: number;
    recall: number;
    f1Score: number;
  };
  timestamp: string;
  userId: string;
}

export default function ResultsPage() {
  // const { user } = useAuth();
  const router = useRouter();
  const params = useParams();
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [user, setUser] = useState<{ name: string } | null>(null);

  const predictionId = params.id as string;

   useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch('/api/auth/me');
        const data = await res.json();
        setUser(data.user);
      } catch (err) {
        console.error("Error fetching user:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    // if (!user) {
    //   router.push('/auth');
    //   return;
    // }

    fetchResult();
  }, [user, predictionId, router]);

  const fetchResult = async () => {
    try {
      const response = await fetch(`/api/results/${predictionId}`);
      if (response.ok) {
        const data = await response.json();
        setResult(data);
      } else {
        setError('Result not found');
      }
    } catch (error) {
      setError('Failed to load results');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownloadReport = async () => {
    try {
      const response = await fetch(`/api/results/${predictionId}/pdf`);
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `breast-cancer-analysis-${predictionId}.pdf`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  // if (!user) return null;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading analysis results...</p>
        </div>
      </div>
    );
  }

  if (error || !result) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="p-8 text-center">
            <AlertTriangle className="h-12 w-12 text-red-600 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Error Loading Results</h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <Link href="/dashboard">
              <Button>Return to Dashboard</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const confidenceData = [
    { name: 'Confidence', value: result.confidence },
    { name: 'Uncertainty', value: 100 - result.confidence }
  ];

  const metricsData = [
    { name: 'Accuracy', value: result.modelMetrics.accuracy },
    { name: 'Precision', value: result.modelMetrics.precision },
    { name: 'Recall', value: result.modelMetrics.recall },
    { name: 'F1-Score', value: result.modelMetrics.f1Score }
  ];

  const COLORS = ['#3B82F6', '#E5E7EB'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/dashboard" className="flex items-center space-x-3">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Dashboard
              </Button>
            </Link>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Analysis Results</h1>
                <p className="text-xs text-gray-500">Prediction ID: {result.id.substring(0, 8)}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">
                {user ? `Dr. ${user.name}` : ''}
              </p>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto p-6">
        {/* Header with Actions */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              AI Analysis Results
            </h1>
            <p className="text-gray-600">
              Analysis completed on {new Date(result.timestamp).toLocaleString()}
            </p>
          </div>
          <div className="flex space-x-3 mt-4 sm:mt-0">
            <Button variant="outline" onClick={handleDownloadReport}>
              <Download className="h-4 w-4 mr-2" />
              Download Report
            </Button>
            <Button variant="outline">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>
        </div>

        {/* Main Result */}
        <Card className={`border-0 shadow-xl mb-8 ${
          result.prediction === 'benign' ? 'bg-gradient-to-r from-green-50 to-emerald-50' : 'bg-gradient-to-r from-red-50 to-pink-50'
        }`}>
          <CardContent className="p-8">
            <div className="flex items-center justify-center mb-6">
              <div className={`w-20 h-20 rounded-full flex items-center justify-center ${
                result.prediction === 'benign' ? 'bg-green-100' : 'bg-red-100'
              }`}>
                {result.prediction === 'benign' ? (
                  <CheckCircle className="h-10 w-10 text-green-600" />
                ) : (
                  <AlertTriangle className="h-10 w-10 text-red-600" />
                )}
              </div>
            </div>
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-2">
                <span className={result.prediction === 'benign' ? 'text-green-700' : 'text-red-700'}>
                  {result.prediction.toUpperCase()}
                </span>
              </h2>
              <p className="text-xl text-gray-700 mb-4">
                Confidence: {result.confidence.toFixed(1)}%
              </p>
              <Badge 
                className={`text-sm px-4 py-2 ${
                  result.prediction === 'benign' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}
              >
                {result.type === 'tabular' ? 'Data Analysis' : 'Image Analysis'}
              </Badge>
            </div>
            <div className="mt-8">
              <div className="flex justify-between text-sm mb-2">
                <span>Prediction Confidence</span>
                <span>{result.confidence.toFixed(1)}%</span>
              </div>
              <Progress 
                value={result.confidence} 
                className={`h-3 ${
                  result.prediction === 'benign' ? '[&>div]:bg-green-600' : '[&>div]:bg-red-600'
                }`} 
              />
            </div>
          </CardContent>
        </Card>

        {/* Analysis Details */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Confidence Breakdown */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5" />
                <span>Confidence Analysis</span>
              </CardTitle>
              <CardDescription>
                AI model confidence distribution for this prediction
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={confidenceData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {confidenceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `${value}%`} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="text-center mt-4">
                <p className="text-sm text-gray-600">
                  High confidence indicates strong model certainty in the prediction
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Model Performance */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Brain className="h-5 w-5" />
                <span>Model Performance</span>
              </CardTitle>
              <CardDescription>
                Key metrics from model validation on test dataset
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={metricsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis domain={[90, 100]} />
                    <Tooltip formatter={(value) => `${value}%`} />
                    <Bar dataKey="value" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Medical Interpretation */}
        <Card className="border-0 shadow-lg mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="h-5 w-5" />
              <span>Clinical Interpretation</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {result.prediction === 'benign' ? (
              <Alert className="border-green-200 bg-green-50">
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>
                  <strong>Benign Classification:</strong> The AI analysis indicates characteristics 
                  consistent with non-cancerous tissue. However, this should not replace professional 
                  medical evaluation. Continue with regular screening as recommended by your healthcare provider.
                </AlertDescription>
              </Alert>
            ) : (
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  <strong>Malignant Classification:</strong> The AI analysis has detected patterns 
                  that may indicate cancerous tissue. Immediate follow-up with a qualified oncologist 
                  is strongly recommended for comprehensive evaluation and treatment planning.
                </AlertDescription>
              </Alert>
            )}
            
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">Important Medical Disclaimer</h4>
              <p className="text-sm text-blue-800 leading-relaxed">
                This AI analysis is intended as a screening tool to assist healthcare professionals. 
                It should not be used as the sole basis for diagnosis or treatment decisions. 
                Always consult with qualified medical professionals for proper diagnosis and care.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Recommended Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {result.prediction === 'benign' ? (
                <>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="font-medium">Continue Regular Screening</p>
                      <p className="text-sm text-gray-600">Maintain your regular mammography schedule</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="font-medium">Monitor for Changes</p>
                      <p className="text-sm text-gray-600">Report any new symptoms to your doctor</p>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
                    <div>
                      <p className="font-medium">Immediate Medical Consultation</p>
                      <p className="text-sm text-gray-600">Schedule appointment with oncologist</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
                    <div>
                      <p className="font-medium">Additional Testing</p>
                      <p className="text-sm text-gray-600">May require biopsy for confirmation</p>
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Analysis Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Analysis Type:</span>
                <Badge variant="secondary">{result.type === 'tabular' ? 'Data Analysis' : 'Image Analysis'}</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Model Used:</span>
                <span className="font-medium">{result.type === 'tabular' ? 'Random Forest' : 'CNN ResNet-50'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Processing Time:</span>
                <span className="font-medium">2.3 seconds</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Result ID:</span>
                <span className="font-mono text-sm">{result.id.substring(0, 12)}...</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Link href="/predict/tabular">
            <Button variant="outline" size="lg">
              <FileText className="h-4 w-4 mr-2" />
              New Data Analysis
            </Button>
          </Link>
          <Link href="/predict/image">
            <Button variant="outline" size="lg">
              <FileText className="h-4 w-4 mr-2" />
              New Image Analysis
            </Button>
          </Link>
          <Link href="/history">
            <Button variant="outline" size="lg">
              <Clock className="h-4 w-4 mr-2" />
              View History
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}