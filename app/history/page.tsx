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
  const [user, setUser] = useState<{ email: string; username: string; role: string } | null>(null);

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
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">

            {/* Left: Back to Dashboard */}
            <Link href="/dashboard" className="flex items-center">
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center gap-1 text-gray-700 hover:text-blue-600 transition"
              >
                <ArrowLeft className="h-4 w-4" />
                Dashboard
              </Button>
            </Link>

            {/* Center: Logo + Title */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-500 rounded-lg flex items-center justify-center shadow-md">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <div className="text-center">
                <h1 className="text-xl font-bold text-gray-900">Prediction History</h1>
                <p className="text-xs text-gray-500">View Past Analyses</p>
              </div>
            </div>

            {/* Right: User Info */}
            <div className="text-right">
              {user && (
                <p className="text-sm font-medium text-gray-700">
                  Dr. {user.username}
                </p>
              )}
            </div>

          </div>
        </div>
      </nav>



      <div className="max-w-7xl mx-auto p-6">
        {/* Filters & Search */}
        <Card className="border-0 shadow-2xl mb-8 bg-gradient-to-r from-pink-50 via-purple-50 to-indigo-50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-gray-900">
              <Filter className="h-5 w-5 text-purple-600" />
              <span>Filters & Search</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-4">

              {/* Search */}
              <div className="space-y-2">
                <Label>Search</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-purple-400" />
                  <Input
                    placeholder="Search predictions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 border-purple-300 focus:border-purple-500 focus:ring-purple-200"
                  />
                </div>
              </div>

              {/* Analysis Type */}
              <div className="space-y-2">
                <Label>Analysis Type</Label>
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="border-purple-300 focus:border-purple-500 focus:ring-purple-200">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="tabular">Data Analysis</SelectItem>
                    <SelectItem value="image">Image Analysis</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Result */}
              <div className="space-y-2">
                <Label>Result</Label>
                <Select value={filterResult} onValueChange={setFilterResult}>
                  <SelectTrigger className="border-purple-300 focus:border-purple-500 focus:ring-purple-200">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Results</SelectItem>
                    <SelectItem value="benign">Benign</SelectItem>
                    <SelectItem value="malignant">Malignant</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Clear Filters */}
              <div className="space-y-2">
                <Label>&nbsp;</Label>
                <Button
                  variant="outline"
                  className="w-full border-purple-400 text-purple-700 hover:bg-purple-100 hover:border-purple-500 transition-all"
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
        {/* History List */}
        <div className="space-y-4">
          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin w-8 h-8 border-4 border-gradient-to-r from-pink-400 via-purple-400 to-indigo-500 border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-gray-600">Loading prediction history...</p>
            </div>
          ) : filteredHistory.length > 0 ? (
            filteredHistory.map((item) => (
              <Card key={item.id} className="border-0 shadow-2xl hover:shadow-3xl transition-all duration-300 prediction-card bg-gradient-to-r from-pink-50 via-purple-50 to-indigo-50">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${item.prediction === 'benign'
                        ? 'bg-gradient-to-br from-green-200 via-green-300 to-green-400'
                        : 'bg-gradient-to-br from-red-200 via-red-300 to-red-400'
                        }`}>
                        {item.type === 'tabular' ? (
                          <FileText className={`h-6 w-6 ${item.prediction === 'benign' ? 'text-green-700' : 'text-red-700'}`} />
                        ) : (
                          <Upload className={`h-6 w-6 ${item.prediction === 'benign' ? 'text-green-700' : 'text-red-700'}`} />
                        )}
                      </div>
                      <div>
                        <div className="flex items-center space-x-3 mb-1">
                          <h3 className="font-semibold text-gray-900">
                            {item.prediction.charAt(0).toUpperCase() + item.prediction.slice(1)} Prediction
                          </h3>
                          <Badge
                            className={`px-2 py-1 text-xs rounded-full font-medium ${item.prediction === 'benign'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-red-100 text-red-700'
                              }`}
                          >
                            {item.confidence.toFixed(1)}% confidence
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span className="flex items-center">
                            <Calendar className="h-3 w-3 mr-1 text-purple-400" />
                            {new Date(item.timestamp).toLocaleDateString()}
                          </span>
                          <span className="flex items-center">
                            <Clock className="h-3 w-3 mr-1 text-purple-400" />
                            {new Date(item.timestamp).toLocaleTimeString()}
                          </span>
                          <Badge className="text-xs bg-gradient-to-r from-pink-200 via-purple-200 to-indigo-200 text-purple-800 font-medium">
                            {item.type === 'tabular' ? 'Data' : 'Image'}
                          </Badge>

                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Link href={`/results/${item.id}`}>
                        <Button size="sm" variant="outline" className="border-purple-400 text-purple-700 hover:bg-purple-100 hover:border-purple-500 transition-all">
                          <Eye className="h-4 w-4 mr-2" />
                          View
                        </Button>
                      </Link>
                      <Link href={`/results/${item.id}`}>
                        <Button size="sm" variant="outline" className="border-purple-400 text-purple-700 hover:bg-purple-100 hover:border-purple-500 transition-all">
                          <Download className="h-4 w-4 mr-2" />
                          PDF
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card className="border-0 shadow-2xl bg-gradient-to-r from-pink-50 via-purple-50 to-indigo-50">
              <CardContent className="p-12 text-center">
                <FileText className="h-16 w-16 text-purple-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {searchTerm || filterType !== 'all' || filterResult !== 'all'
                    ? 'No Results Match Your Filters'
                    : 'Be the First to Predict'}
                </h3>
                <p className="text-gray-600 mb-6">
                  {searchTerm || filterType !== 'all' || filterResult !== 'all'
                    ? 'Try clearing or adjusting your filters to see more results.'
                    : 'Run your first analysis to build your prediction history.'}
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Link href="/predict/tabular">
                    <Button className="bg-gradient-to-r from-green-400 via-teal-400 to-blue-400 text-white hover:from-green-500 hover:via-teal-500 hover:to-blue-500 shadow-md transition-all">
                      <FileText className="h-4 w-4 mr-2" />
                      Start Data Analysis
                    </Button>
                  </Link>
                  <Link href="/predict/image">
                    <Button variant="outline" className="border-purple-400 text-purple-700 hover:bg-purple-100 hover:border-purple-500 transition-all">
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