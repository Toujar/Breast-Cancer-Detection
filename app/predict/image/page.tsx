'use client';

import { useState, useRef , useEffect} from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Heart, 
  ArrowLeft, 
  Upload, 
  Image as ImageIcon,
  Loader2,
  FileImage,
  Info,
  Brain
} from 'lucide-react';
// import { useAuth } from '@/lib/auth-context';
import { toast } from 'sonner';

export default function ImagePredictionPage() {
  // const { user } = useAuth();
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [dragOver, setDragOver] = useState(false);
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

  const handleFileSelect = (file: File) => {
    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image file (JPEG, PNG, etc.)');
      return;
    }

    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      setError('File size must be less than 10MB');
      return;
    }

    setSelectedFile(file);
    setError('');
    
    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreviewUrl(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) return;

    setIsLoading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('image', selectedFile);

      const response = await fetch('/api/predict/image', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        toast.success('Image analysis completed!');
        router.push(`/results/${result.predictionId}`);
      } else {
        setError('Image analysis failed. Please try again.');
      }
    } catch (error) {
      setError('Network error. Please check your connection.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="p-8 text-center">
            <Heart className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Authentication Required</h2>
            <p className="text-gray-600 mb-6">Please log in to access the image analysis system.</p>
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
                <h1 className="text-xl font-bold text-gray-900">Image Analysis</h1>
                <p className="text-xs text-gray-500">AI Mammogram Detection</p>
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
            <ImageIcon className="h-8 w-8 text-blue-600" />
            <span>Mammogram Image Analysis</span>
          </h1>
          <p className="text-gray-600 leading-relaxed">
            Upload a mammogram image for AI-powered analysis. Our convolutional neural network 
            will examine the image and provide predictions with confidence scores.
          </p>
        </div>

        {/* Info Alert */}
        <Alert className="mb-8 border-blue-200 bg-blue-50">
          <Info className="h-4 w-4" />
          <AlertDescription>
            <strong>Supported Formats:</strong> JPEG, PNG, TIFF, DICOM. Maximum file size: 10MB. 
            For best results, use high-resolution mammogram images with clear tissue definition.
          </AlertDescription>
        </Alert>

        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Upload Area */}
            <div className="lg:col-span-2">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Upload className="h-5 w-5" />
                    <span>Upload Mammogram</span>
                  </CardTitle>
                  <CardDescription>
                    Select or drag and drop a mammogram image for analysis
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {error && (
                    <Alert variant="destructive" className="mb-6">
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  {!selectedFile ? (
                    <div
                      className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
                        dragOver 
                          ? 'border-blue-400 bg-blue-50' 
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                      onDrop={handleDrop}
                      onDragOver={(e) => {
                        e.preventDefault();
                        setDragOver(true);
                      }}
                      onDragLeave={() => setDragOver(false)}
                    >
                      <FileImage className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        Upload Mammogram Image
                      </h3>
                      <p className="text-gray-600 mb-6">
                        Drag and drop your image here, or click to browse
                      </p>
                      <Button 
                        type="button" 
                        variant="outline"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        Choose File
                      </Button>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFileInput}
                        className="hidden"
                      />
                      <p className="text-xs text-gray-500 mt-4">
                        Supported: JPEG, PNG, TIFF, DICOM (Max: 10MB)
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {/* Image Preview */}
                      <div className="relative">
                        <img
                          src={previewUrl || ''}
                          alt="Mammogram preview"
                          className="w-full max-h-96 object-contain rounded-lg border border-gray-200"
                        />
                        <div className="absolute top-4 right-4">
                          <Button
                            type="button"
                            variant="secondary"
                            size="sm"
                            onClick={() => {
                              setSelectedFile(null);
                              setPreviewUrl(null);
                              setError('');
                            }}
                          >
                            Remove
                          </Button>
                        </div>
                      </div>

                      {/* File Info */}
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-medium text-gray-900 mb-2">File Information</h4>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-gray-600">Filename:</span>
                            <p className="font-medium truncate">{selectedFile.name}</p>
                          </div>
                          <div>
                            <span className="text-gray-600">Size:</span>
                            <p className="font-medium">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                          </div>
                          <div>
                            <span className="text-gray-600">Type:</span>
                            <p className="font-medium">{selectedFile.type}</p>
                          </div>
                          <div>
                            <span className="text-gray-600">Status:</span>
                            <p className="font-medium text-green-600">Ready for Analysis</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg">CNN Model Info</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <Brain className="h-8 w-8 text-green-600 mx-auto mb-2" />
                    <p className="text-sm font-medium text-green-900">Deep Learning Model</p>
                    <p className="text-xs text-green-700">Convolutional Neural Network</p>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Architecture:</span>
                      <span className="font-medium">ResNet-50</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Input Size:</span>
                      <span className="font-medium">224x224</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Accuracy:</span>
                      <span className="font-medium text-green-600">94.2%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Training Set:</span>
                      <span className="font-medium">15K+ Images</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Button 
                type="submit" 
                size="lg" 
                className="w-full h-12 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-lg"
                disabled={isLoading || !selectedFile}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Brain className="mr-2 h-5 w-5" />
                    Analyze Image
                  </>
                )}
              </Button>

              <div className="text-xs text-gray-500 text-center leading-relaxed">
                Image processing may take 5-10 seconds depending on file size. 
                The AI will analyze tissue patterns and density variations.
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}