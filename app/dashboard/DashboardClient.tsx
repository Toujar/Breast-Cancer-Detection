'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Brain,
  FileText,
  Activity,
  Users,
  BarChart3,
  Upload,
  History,
  Settings,
  LogOut,
  Heart,
  TrendingUp,
  Clock,
  CheckCircle
} from 'lucide-react';
// import { useAuth } from '@/lib/auth-context';

interface DashboardStats {
  totalPredictions: number;
  recentPredictions: number;
  accuracy: number;
  lastActive: string;
}

interface RecentPrediction {
  id: string;
  type: 'tabular' | 'image';
  result: 'benign' | 'malignant';
  confidence: number;
  date: string;
}

export default function DashboardClient() {
  // const { user, logout } = useAuth();
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [stats, setStats] = useState<DashboardStats>({
    totalPredictions: 0,
    recentPredictions: 0,
    accuracy: 97.8,
    lastActive: 'Today'
  });
  const [recentPredictions, setRecentPredictions] = useState<RecentPrediction[]>([]);
  const [isLoading, setIsLoading] = useState(true);

   // Fetch user from /api/auth/me
  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch('/api/auth/me');
      const data = await res.json();
      setUser(data.user);
      setIsLoading(false);
    };
    fetchUser();
  }, []);

  useEffect(() => {
    if (user) {
    fetchDashboardData();
    }
  }, [user]);

  const fetchDashboardData = async () => {
    try {
      const [statsResponse, predictionsResponse] = await Promise.all([
        fetch('/api/dashboard/stats'),
        fetch('/api/predictions/recent')
      ]);

      if (statsResponse.ok) {
        const statsData = await statsResponse.json();
        setStats(statsData);
      }

      if (predictionsResponse.ok) {
        const predictionsData = await predictionsResponse.json();
        setRecentPredictions(predictionsData);
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // const handleLogout = () => {
  //   logout();
  //   router.push('/auth/login');
  // };
   const handleLogout = async () => {
    // clear cookie
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/auth');
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-600">Loading session...</p>
      </div>
    );
  }

  // if (!user) return null;
  //  if (!user) {
  //   console.log('No user found, redirecting to /auth');
  //   router.push('/auth');
  //   return null;
  // }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">AI Cancer Detection</h1>
                <p className="text-xs text-gray-500">Medical Dashboard</p>
              </div>
            </Link>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-700">Dr. {user.email}</span>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, Dr. {user.email}
          </h1>
          <p className="text-gray-600">
            Monitor your AI-assisted breast cancer detection activities and insights.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6 flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-600">Total Predictions</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalPredictions}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Brain className="h-6 w-6 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6 flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-600">This Week</p>
                <p className="text-2xl font-bold text-gray-900">{stats.recentPredictions}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6 flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-600">Model Accuracy</p>
                <p className="text-2xl font-bold text-gray-900">{stats.accuracy}%</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <BarChart3 className="h-6 w-6 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6 flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-600">Last Active</p>
                <p className="text-2xl font-bold text-gray-900">{stats.lastActive}</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Clock className="h-6 w-6 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Quick Actions + Recent Predictions */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Actions */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Activity className="h-5 w-5" />
                  <span>Quick Actions</span>
                </CardTitle>
                <CardDescription>
                  Start a new analysis or view your previous results
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <Link href="/predict/tabular">
                    <Card className="cursor-pointer hover:shadow-lg transition-all duration-300 border-2 border-transparent hover:border-blue-200">
                      <CardContent className="p-6 text-center">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                          <FileText className="h-6 w-6 text-blue-600" />
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-2">Data Analysis</h3>
                        <p className="text-sm text-gray-600">
                          Input patient parameters for AI prediction
                        </p>
                      </CardContent>
                    </Card>
                  </Link>

                  <Link href="/predict/image">
                    <Card className="cursor-pointer hover:shadow-lg transition-all duration-300 border-2 border-transparent hover:border-green-200">
                      <CardContent className="p-6 text-center">
                        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                          <Upload className="h-6 w-6 text-green-600" />
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-2">Image Analysis</h3>
                        <p className="text-sm text-gray-600">
                          Upload mammogram for AI detection
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Recent Predictions */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <History className="h-5 w-5" />
                  <span>Recent Predictions</span>
                </CardTitle>
                <CardDescription>Your latest AI analysis results</CardDescription>
              </CardHeader>
              <CardContent>
                {recentPredictions.length > 0 ? (
                  <div className="space-y-4">
                    {recentPredictions.map((prediction) => (
                      <div key={prediction.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${prediction.result === 'benign' ? 'bg-green-100' : 'bg-red-100'}`}>
                            {prediction.type === 'tabular' ? (
                              <FileText className={`h-5 w-5 ${prediction.result === 'benign' ? 'text-green-600' : 'text-red-600'}`} />
                            ) : (
                              <Upload className={`h-5 w-5 ${prediction.result === 'benign' ? 'text-green-600' : 'text-red-600'}`} />
                            )}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900 capitalize">
                              {prediction.result} ({prediction.confidence}% confidence)
                            </p>
                            <p className="text-sm text-gray-500">{prediction.date}</p>
                          </div>
                        </div>
                        <Badge variant={prediction.result === 'benign' ? 'default' : 'destructive'}>
                          {prediction.type}
                        </Badge>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">No predictions yet</p>
                    <p className="text-sm text-gray-400">Start your first analysis to see results here</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Model Performance */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">Model Performance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Accuracy</span>
                    <span>97.8%</span>
                  </div>
                  <Progress value={97.8} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Precision</span>
                    <span>96.4%</span>
                  </div>
                  <Progress value={96.4} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Recall</span>
                    <span>98.1%</span>
                  </div>
                  <Progress value={98.1} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>F1-Score</span>
                    <span>97.2%</span>
                  </div>
                  <Progress value={97.2} className="h-2" />
                </div>
              </CardContent>
            </Card>

            {/* Quick Links */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">Quick Access</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/history">
                  <Button variant="ghost" className="w-full justify-start">
                    <History className="h-4 w-4 mr-3" />
                    View History
                  </Button>
                </Link>
                <Link href="/analytics">
                  <Button variant="ghost" className="w-full justify-start">
                    <BarChart3 className="h-4 w-4 mr-3" />
                    Analytics
                  </Button>
                </Link>
                {user && (
                  <Link href="/admin">
                    <Button variant="ghost" className="w-full justify-start">
                      <Users className="h-4 w-4 mr-3" />
                      Admin Panel
                    </Button>
                  </Link>
                )}
                <Link href="/settings">
                  <Button variant="ghost" className="w-full justify-start">
                    <Settings className="h-4 w-4 mr-3" />
                    Settings
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* System Status */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">System Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">AI Model</span>
                  <Badge className="bg-green-100 text-green-800">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Active
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">API Status</span>
                  <Badge className="bg-green-100 text-green-800">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Online
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Database</span>
                  <Badge className="bg-green-100 text-green-800">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Connected
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
