'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Heart, 
  ArrowLeft, 
  Loader2, 
  Info,
  Brain,
  Calculator
} from 'lucide-react';
// import { useAuth } from '@/lib/auth-context';
import { toast } from 'sonner';

interface PredictionData {
  radius_mean: number;
  texture_mean: number;
  perimeter_mean: number;
  area_mean: number;
  smoothness_mean: number;
  compactness_mean: number;
  concavity_mean: number;
  concave_points_mean: number;
  symmetry_mean: number;
  fractal_dimension_mean: number;
}

export default function TabularPredictionPage() {
  // const { user } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState<PredictionData>({
    radius_mean: 0,
    texture_mean: 0,
    perimeter_mean: 0,
    area_mean: 0,
    smoothness_mean: 0,
    compactness_mean: 0,
    concavity_mean: 0,
    concave_points_mean: 0,
    symmetry_mean: 0,
    fractal_dimension_mean: 0,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [user, setUser] = useState<{ name: string } | null>(null);

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

  const handleInputChange = (field: keyof PredictionData, value: string) => {
    const numValue = parseFloat(value) || 0;
    setFormData(prev => ({ ...prev, [field]: numValue }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      router.push('/auth');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/predict/tabular', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        toast.success('Prediction completed successfully!');
        router.push(`/results/${result.predictionId}`);
      } else {
        setError('Prediction failed. Please try again.');
      }
    } catch (error) {
      setError('Network error. Please check your connection.');
    } finally {
      setIsLoading(false);
    }
  };

  const inputFields = [
    { key: 'radius_mean' as keyof PredictionData, label: 'Radius Mean', placeholder: '14.127', description: 'Mean of distances from center to points on the perimeter' },
    { key: 'texture_mean' as keyof PredictionData, label: 'Texture Mean', placeholder: '19.289', description: 'Standard deviation of gray-scale values' },
    { key: 'perimeter_mean' as keyof PredictionData, label: 'Perimeter Mean', placeholder: '91.969', description: 'Mean perimeter of the cell nucleus' },
    { key: 'area_mean' as keyof PredictionData, label: 'Area Mean', placeholder: '654.889', description: 'Mean area of the cell nucleus' },
    { key: 'smoothness_mean' as keyof PredictionData, label: 'Smoothness Mean', placeholder: '0.096', description: 'Local variation in radius lengths' },
    { key: 'compactness_mean' as keyof PredictionData, label: 'Compactness Mean', placeholder: '0.104', description: 'Perimeter² / area - 1.0' },
    { key: 'concavity_mean' as keyof PredictionData, label: 'Concavity Mean', placeholder: '0.089', description: 'Severity of concave portions of the contour' },
    { key: 'concave_points_mean' as keyof PredictionData, label: 'Concave Points Mean', placeholder: '0.048', description: 'Number of concave portions of the contour' },
    { key: 'symmetry_mean' as keyof PredictionData, label: 'Symmetry Mean', placeholder: '0.181', description: 'Symmetry of the cell nucleus' },
    { key: 'fractal_dimension_mean' as keyof PredictionData, label: 'Fractal Dimension Mean', placeholder: '0.063', description: 'Coastline approximation - 1' },
  ];

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="p-8 text-center">
            <Heart className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Authentication Required</h2>
            <p className="text-gray-600 mb-6">Please log in to access the prediction system.</p>
            <Link href="/auth">
              <Button>Login</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

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
                <h1 className="text-xl font-bold text-gray-900">Tabular Data Analysis</h1>
                <p className="text-xs text-gray-500">AI Prediction System</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Dr. {user.name}</p>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4 flex items-center space-x-3">
            <Calculator className="h-8 w-8 text-blue-600" />
            <span>Patient Data Analysis</span>
          </h1>
          <p className="text-gray-600 leading-relaxed">
            Enter the cellular characteristics obtained from fine needle aspirate (FNA) 
            of the breast mass. Our AI model will analyze these parameters to provide 
            a prediction with confidence scores.
          </p>
        </div>

        {/* Info Alert */}
        <Alert className="mb-8 border-blue-200 bg-blue-50">
          <Info className="h-4 w-4" />
          <AlertDescription>
            <strong>Dataset Information:</strong> This model was trained on the Wisconsin Breast Cancer Dataset 
            with 569 samples and 30 features, achieving 97.8% accuracy in distinguishing between 
            benign and malignant cases.
          </AlertDescription>
        </Alert>

        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Form */}
            <div className="lg:col-span-3">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Brain className="h-5 w-5" />
                    <span>Cellular Characteristics</span>
                  </CardTitle>
                  <CardDescription>
                    Input the mean values for each cellular feature measurement
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {error && (
                    <Alert variant="destructive" className="mb-6">
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    {inputFields.map((field) => (
                      <div key={field.key} className="space-y-2">
                        <Label htmlFor={field.key} className="text-sm font-medium">
                          {field.label}
                        </Label>
                        <Input
                          id={field.key}
                          type="number"
                          step="any"
                          placeholder={field.placeholder}
                          value={formData[field.key] || ''}
                          onChange={(e) => handleInputChange(field.key, e.target.value)}
                          required
                          className="h-11"
                        />
                        <p className="text-xs text-gray-500">{field.description}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg">Analysis Info</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <Brain className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                    <p className="text-sm font-medium text-blue-900">AI Model Active</p>
                    <p className="text-xs text-blue-700">Random Forest Classifier</p>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Model Version:</span>
                      <span className="font-medium">v2.1.0</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Training Date:</span>
                      <span className="font-medium">Dec 2024</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Validation:</span>
                      <span className="font-medium text-green-600">Verified</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Button 
                type="submit" 
                size="lg" 
                className="w-full h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-lg"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Brain className="mr-2 h-5 w-5" />
                    Run Analysis
                  </>
                )}
              </Button>

              <div className="text-xs text-gray-500 text-center leading-relaxed">
                Analysis typically takes 2-3 seconds. Results include prediction 
                confidence scores and detailed statistical analysis.
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}