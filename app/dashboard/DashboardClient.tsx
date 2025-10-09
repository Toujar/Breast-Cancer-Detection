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
  const [user, setUser] = useState<{ email: string; username: string; role: string } | null>(null);
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
        
      console.log('Stats after fetch:', statsData);
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
    router.push('/');
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
              <div className="text-right">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-900">{user?.username ?? 'User'}</span>
                  <Badge variant={user?.role === 'admin' ? 'default' : 'secondary'}>
                    {user?.role === 'admin' ? '👑 Admin' : '👤 User'}
                  </Badge>
                </div>
                <span className="text-xs text-gray-500">{user?.email ?? 'user@example.com'}</span>
              </div>
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
            Welcome back, {user?.username ?? 'User'}
          </h1>
          <p className="text-gray-600">
            Monitor your AI-assisted breast cancer detection activities and insights.
          </p>
        </div>

        {/* Quick Stats */}
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100">
            <CardContent className="p-6 flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-600">Total Predictions</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalPredictions}</p>
              </div>
              <div className="w-14 h-14 bg-blue-200 rounded-lg flex items-center justify-center shadow-md">
                <Brain className="h-7 w-7 text-blue-700" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 rounded-2xl bg-gradient-to-br from-green-50 to-green-100">
            <CardContent className="p-6 flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-600">This Week</p>
                <p className="text-2xl font-bold text-gray-900">{stats.recentPredictions}</p>
              </div>
              <div className="w-14 h-14 bg-green-200 rounded-lg flex items-center justify-center shadow-md">
                <TrendingUp className="h-7 w-7 text-green-700" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 rounded-2xl bg-gradient-to-br from-purple-50 to-purple-100">
            <CardContent className="p-6 flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-600">Model Accuracy</p>
                <p className="text-2xl font-bold text-gray-900">{stats.accuracy}%</p>
              </div>
              <div className="w-14 h-14 bg-purple-200 rounded-lg flex items-center justify-center shadow-md">
                <BarChart3 className="h-7 w-7 text-purple-700" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 rounded-2xl bg-gradient-to-br from-orange-50 to-orange-100">
            <CardContent className="p-6 flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-600">Last Active</p>
                <p className="text-2xl font-bold text-gray-900">{stats.lastActive}</p>
              </div>
              <div className="w-14 h-14 bg-orange-200 rounded-lg flex items-center justify-center shadow-md">
                <Clock className="h-7 w-7 text-orange-700" />
              </div>
            </CardContent>
          </Card>
        </div>


        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Quick Actions + Recent Predictions */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Actions */}
            <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 rounded-2xl bg-gradient-to-br from-indigo-50 to-indigo-100">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Activity className="h-5 w-5 text-indigo-600" />
                  <span className="text-lg font-semibold text-gray-800">Quick Actions</span>
                </CardTitle>
                <CardDescription className="text-gray-500">
                  Start a new analysis or view your previous results
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <Link href="/predict/tabular">
                    <Card className="cursor-pointer transform hover:scale-105 transition-transform duration-300 border-2 border-transparent hover:border-indigo-300 bg-gradient-to-br from-indigo-100 to-indigo-50 rounded-xl shadow-sm">
                      <CardContent className="p-6 text-center">
                        <div className="w-14 h-14 bg-indigo-200 rounded-lg flex items-center justify-center mx-auto mb-4 shadow-md">
                          <FileText className="h-6 w-6 text-indigo-700" />
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-2">Data Analysis</h3>
                        <p className="text-sm text-gray-600">
                          Input patient parameters for AI prediction
                        </p>
                      </CardContent>
                    </Card>
                  </Link>

                  <Link href="/predict/image">
                    <Card className="cursor-pointer transform hover:scale-105 transition-transform duration-300 border-2 border-transparent hover:border-green-300 bg-gradient-to-br from-green-100 to-green-50 rounded-xl shadow-sm">
                      <CardContent className="p-6 text-center">
                        <div className="w-14 h-14 bg-green-200 rounded-lg flex items-center justify-center mx-auto mb-4 shadow-md">
                          <Upload className="h-6 w-6 text-green-700" />
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
            <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 rounded-2xl bg-gradient-to-br from-pink-50 to-purple-50">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <History className="h-5 w-5 text-pink-500" />
                  <span className="text-lg font-semibold text-gray-800">Recent Predictions</span>
                </CardTitle>
                <CardDescription className="text-sm text-gray-500">
                  Your latest AI analysis results
                </CardDescription>
              </CardHeader>
              <CardContent>
                {recentPredictions.length > 0 ? (
                  <div className="space-y-4">
                    {recentPredictions.map((prediction) => (
                      <div
                        key={prediction.id}
                        className={`flex items-center justify-between p-4 rounded-xl shadow-sm transition-all duration-300
                bg-gradient-to-r ${prediction.result === 'benign' ? 'from-green-50 to-green-100 hover:from-green-100 hover:to-green-200' : 'from-red-50 to-red-100 hover:from-red-100 hover:to-red-200'}`}
                      >
                        <div className="flex items-center space-x-4">
                          <div
                            className={`w-12 h-12 rounded-full flex items-center justify-center 
                  ${prediction.result === 'benign' ? 'bg-green-200 ring-green-300' : 'bg-red-200 ring-red-300'} ring-2 transition-all duration-300`}
                          >
                            {prediction.type === 'tabular' ? (
                              <FileText
                                className={`h-6 w-6 ${prediction.result === 'benign' ? 'text-green-700' : 'text-red-700'}`}
                              />
                            ) : (
                              <Upload
                                className={`h-6 w-6 ${prediction.result === 'benign' ? 'text-green-700' : 'text-red-700'}`}
                              />
                            )}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900 capitalize">
                              {prediction.result} ({prediction.confidence}% confidence)
                            </p>
                            <p className="text-sm text-gray-500">{prediction.date}</p>
                          </div>
                        </div>
                        <Badge
                          className={`px-3 py-1 rounded-full text-sm font-medium ${prediction.result === 'benign' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
                        >
                          {prediction.type}
                        </Badge>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-10">
                    <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Be the first to predict!</h3>
                    <p className="text-gray-600 mb-6">Kickstart your journey with a quick analysis below.</p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <Link href="/predict/tabular">
                        <Button className="bg-indigo-500 text-white hover:bg-indigo-600 transition rounded-lg px-5 py-2">
                          <FileText className="h-4 w-4 mr-2" />
                          Start Data Analysis
                        </Button>
                      </Link>
                      <Link href="/predict/image">
                        <Button className="bg-green-500 text-white hover:bg-green-600 transition rounded-lg px-5 py-2">
                          <Upload className="h-4 w-4 mr-2" />
                          Start Image Analysis
                        </Button>
                      </Link>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>


          {/* Sidebar */}
          <div className="space-y-6">
            {/* Model Performance */}
            <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-800">Model Performance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                {[
                  { label: 'Accuracy', value: 97.8, gradient: 'from-blue-400 to-blue-600' },
                  { label: 'Precision', value: 96.4, gradient: 'from-purple-400 to-purple-600' },
                  { label: 'Recall', value: 98.1, gradient: 'from-teal-400 to-teal-600' },
                  { label: 'F1-Score', value: 97.2, gradient: 'from-pink-400 to-pink-600' },
                ].map((metric) => (
                  <div key={metric.label} className="space-y-1">
                    <div className="flex justify-between text-sm font-medium text-gray-700">
                      <span>{metric.label}</span>
                      <span>{metric.value}%</span>
                    </div>
                    <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-3 rounded-full bg-gradient-to-r ${metric.gradient} transition-all duration-500`}
                        style={{ width: `${metric.value}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Access */}
            <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 rounded-2xl bg-gradient-to-br from-indigo-50 to-indigo-100">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-800">Quick Access</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/history">
                  <Button
                    variant="ghost"
                    className="w-full justify-start rounded-lg px-4 py-2 hover:bg-gradient-to-r hover:from-indigo-100 hover:to-indigo-200 transition-all duration-300"
                  >
                    <History className="h-5 w-5 mr-3 text-indigo-600" />
                    View History
                  </Button>
                </Link>
                <Link href="/analytics">
                  <Button
                    variant="ghost"
                    className="w-full justify-start rounded-lg px-4 py-2 hover:bg-gradient-to-r hover:from-green-100 hover:to-green-200 transition-all duration-300"
                  >
                    <BarChart3 className="h-5 w-5 mr-3 text-green-600" />
                    Analytics
                  </Button>
                </Link>
                {user && (
                  <Link href="/admin">
                    <Button
                      variant="ghost"
                      className="w-full justify-start rounded-lg px-4 py-2 hover:bg-gradient-to-r hover:from-pink-100 hover:to-pink-200 transition-all duration-300"
                    >
                      <Users className="h-5 w-5 mr-3 text-pink-600" />
                      Admin Panel
                    </Button>
                  </Link>
                )}
                <Link href="/settings">
                  <Button
                    variant="ghost"
                    className="w-full justify-start rounded-lg px-4 py-2 hover:bg-gradient-to-r hover:from-gray-100 hover:to-gray-200 transition-all duration-300"
                  >
                    <Settings className="h-5 w-5 mr-3 text-gray-600" />
                    Settings
                  </Button>
                </Link>
              </CardContent>
            </Card>



            {/* System Status */}
            <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-800">System Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { label: 'AI Model', status: 'Active', iconColor: 'text-green-600', bgColor: 'bg-green-100', gradient: 'bg-gradient-to-r from-green-100 to-green-200' },
                  { label: 'API Status', status: 'Online', iconColor: 'text-blue-600', bgColor: 'bg-blue-100', gradient: 'bg-gradient-to-r from-blue-100 to-blue-200' },
                  { label: 'Database', status: 'Connected', iconColor: 'text-purple-600', bgColor: 'bg-purple-100', gradient: 'bg-gradient-to-r from-purple-100 to-purple-200' },
                ].map((item) => (
                  <div
                    key={item.label}
                    className={`flex items-center justify-between p-3 rounded-xl ${item.gradient} shadow-sm hover:scale-105 transition-transform duration-300`}
                  >
                    <span className="text-sm font-medium text-gray-700">{item.label}</span>
                    <Badge
                      className={`flex items-center px-3 py-1 rounded-full font-medium text-sm ${item.bgColor} ${item.iconColor} shadow-md`}
                    >
                      <CheckCircle className={`h-4 w-4 mr-1 ${item.iconColor}`} />
                      {item.status}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>


          </div>
        </div>

      </div>
    </div>
  );
}
