'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
// import { Input } from '@/components/ui/input';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
// import { Search } from "lucide-react";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Heart,
  ArrowLeft,
  Search,
  Filter,
  Download,
  Eye,
  Calendar,
  FileText,
  Upload,
  CheckCircle,
  AlertTriangle,
  Clock,
} from 'lucide-react';
// import { useAuth } from '@/lib/auth-context';

interface HistoryItem {
  id: string;
  type: 'tabular' | 'image';
  prediction: 'benign' | 'malignant';
  confidence: number;
  timestamp: string;
  status: 'completed' | 'pending' | 'error';
}

export default function HistoryPage() {
  // const { user } = useAuth();
  const router = useRouter();
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [filteredHistory, setFilteredHistory] = useState<HistoryItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterResult, setFilterResult] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(true);
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

  useEffect(() => {
    // if (!user) {
    //   router.push('/auth');
    //   return;
    // }

    fetchHistory();
  }, [user, router]);

  useEffect(() => {
    filterHistory();
  }, [history, searchTerm, filterType, filterResult]);

  const fetchHistory = async () => {
    try {
      const response = await fetch('/api/predictions/history');
      if (response.ok) {
        const data = await response.json();
        setHistory(data);
      }
    } catch (error) {
      console.error('Error fetching history:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filterHistory = () => {
    let filtered = history;

    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.prediction.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterType !== 'all') {
      filtered = filtered.filter(item => item.type === filterType);
    }

    if (filterResult !== 'all') {
      filtered = filtered.filter(item => item.prediction === filterResult);
    }

    setFilteredHistory(filtered);
  };

  // if (!user) return null;

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
                <h1 className="text-xl font-bold text-gray-900">Prediction History</h1>
                <p className="text-xs text-gray-500">View Past Analyses</p>
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
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4 flex items-center space-x-3">
            <Calendar className="h-8 w-8 text-blue-600" />
            <span>Analysis History</span>
          </h1>
          <p className="text-gray-600">
            Review all your previous AI-assisted breast cancer detection analyses.
          </p>
        </div>

        {/* Filters */}
        <Card className="border-0 shadow-lg mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Filter className="h-5 w-5" />
              <span>Filters & Search</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label>Search</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search predictions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Analysis Type</Label>
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="tabular">Data Analysis</SelectItem>
                    <SelectItem value="image">Image Analysis</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Result</Label>
                <Select value={filterResult} onValueChange={setFilterResult}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Results</SelectItem>
                    <SelectItem value="benign">Benign</SelectItem>
                    <SelectItem value="malignant">Malignant</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>&nbsp;</Label>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    setSearchTerm('');
                    setFilterType('all');
                    setFilterResult('all');
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* History List */}
        <div className="space-y-4">
          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-gray-600">Loading prediction history...</p>
            </div>
          ) : filteredHistory.length > 0 ? (
            filteredHistory.map((item) => (
              <Card key={item.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 prediction-card">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${item.prediction === 'benign' ? 'bg-green-100' : 'bg-red-100'
                        }`}>
                        {item.type === 'tabular' ? (
                          <FileText className={`h-6 w-6 ${item.prediction === 'benign' ? 'text-green-600' : 'text-red-600'
                            }`} />
                        ) : (
                          <Upload className={`h-6 w-6 ${item.prediction === 'benign' ? 'text-green-600' : 'text-red-600'
                            }`} />
                        )}
                      </div>
                      <div>
                        <div className="flex items-center space-x-3 mb-1">
                          <h3 className="font-semibold text-gray-900">
                            {item.prediction.charAt(0).toUpperCase() + item.prediction.slice(1)} Prediction
                          </h3>
                          <Badge variant={item.prediction === 'benign' ? 'default' : 'destructive'}>
                            {item.confidence.toFixed(1)}% confidence
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span className="flex items-center">
                            <Calendar className="h-3 w-3 mr-1" />
                            {new Date(item.timestamp).toLocaleDateString()}
                          </span>
                          <span className="flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {new Date(item.timestamp).toLocaleTimeString()}
                          </span>
                          <Badge variant="outline" className="text-xs">
                            {item.type === 'tabular' ? 'Data' : 'Image'}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Link href={`/results/${item.id}`}>
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4 mr-2" />
                          View
                        </Button>
                      </Link>
                      <Button size="sm" variant="outline">
                        <Download className="h-4 w-4 mr-2" />
                        PDF
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card className="border-0 shadow-lg">
              <CardContent className="p-12 text-center">
                <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No Predictions Found</h3>
                <p className="text-gray-600 mb-6">
                  {searchTerm || filterType !== 'all' || filterResult !== 'all'
                    ? 'No results match your current filters.'
                    : 'You haven\'t made any predictions yet.'
                  }
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Link href="/predict/tabular">
                    <Button>
                      <FileText className="h-4 w-4 mr-2" />
                      Start Data Analysis
                    </Button>
                  </Link>
                  <Link href="/predict/image">
                    <Button variant="outline">
                      <Upload className="h-4 w-4 mr-2" />
                      Start Image Analysis
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}