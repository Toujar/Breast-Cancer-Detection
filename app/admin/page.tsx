'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Heart, 
  ArrowLeft, 
  Users, 
  Brain,
  BarChart3,
  Activity,
  Search,
  Download,
  Eye,
  UserCheck,
  AlertTriangle,
  TrendingUp,
  Clock,
  FileText,
  CheckCircle
} from 'lucide-react';
// import { useAuth } from '@/lib/auth-context';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend } from 'recharts';

interface AdminStats {
  totalUsers: number;
  totalPredictions: number;
  accuracyRate: number;
  activeUsers: number;
}

interface UserActivity {
  id: string;
  name: string;
  email: string;
  lastActive: string;
  predictionsCount: number;
  role: string;
}

interface PredictionActivity {
  id: string;
  userName: string;
  type: 'tabular' | 'image';
  result: 'benign' | 'malignant';
  confidence: number;
  timestamp: string;
}

export default function AdminPage() {
  // const { user } = useAuth();
  const router = useRouter();
  const [stats, setStats] = useState<AdminStats>({
    totalUsers: 0,
    totalPredictions: 0,
    accuracyRate: 97.8,
    activeUsers: 0
  });
  const [users, setUsers] = useState<UserActivity[]>([]);
  const [predictions, setPredictions] = useState<PredictionActivity[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<{ email: string; role: string } | null>(null);

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
    // if (!user) {
    //   router.push('/auth');
    //   return;
    // }

    // if (user.role !== 'admin') {
    //   router.push('/dashboard');
    //   return;
    // }

    fetchAdminData();
  }, [user, router]);

  const fetchAdminData = async () => {
    try {
      const [statsResponse, usersResponse, predictionsResponse] = await Promise.all([
        fetch('/api/admin/stats'),
        fetch('/api/admin/users'),
        fetch('/api/admin/predictions')
      ]);

      if (statsResponse.ok) {
        const statsData = await statsResponse.json();
        setStats(statsData);
      }

      if (usersResponse.ok) {
        const usersData = await usersResponse.json();
        setUsers(usersData);
      }

      if (predictionsResponse.ok) {
        const predictionsData = await predictionsResponse.json();
        setPredictions(predictionsData);
      }
    } catch (error) {
      console.error('Error fetching admin data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const chartData = [
    { name: 'Jan', predictions: 65, users: 12 },
    { name: 'Feb', predictions: 89, users: 18 },
    { name: 'Mar', predictions: 156, users: 24 },
    { name: 'Apr', predictions: 234, users: 31 },
    { name: 'May', predictions: 298, users: 42 },
    { name: 'Jun', predictions: 367, users: 56 },
  ];

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // if (!user || user.role !== 'admin') return null;

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
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Admin Dashboard</h1>
                <p className="text-xs text-gray-500">System Management</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Admin: {user?.email ?? 'N/A'}</p>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            System Administration
          </h1>
          <p className="text-gray-600">
            Monitor platform usage, user activity, and system performance.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Users</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalUsers}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Predictions</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalPredictions}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Brain className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">System Accuracy</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.accuracyRate}%</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <BarChart3 className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active Users</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.activeUsers}</p>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Activity className="h-6 w-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Platform Growth</CardTitle>
              <CardDescription>Monthly predictions and user registration trends</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="predictions" fill="#3B82F6" name="Predictions" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="users" fill="#10B981" name="New Users" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Usage Trends</CardTitle>
              <CardDescription>Daily active users and prediction volume</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="predictions" stroke="#3B82F6" strokeWidth={3} name="Predictions" />
                    <Line type="monotone" dataKey="users" stroke="#10B981" strokeWidth={3} name="Active Users" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* User Management */}
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="h-5 w-5" />
                  <span>User Management</span>
                </CardTitle>
                <CardDescription>
                  Monitor user activity and manage platform access
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search users..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                
                <div className="space-y-3">
                  {filteredUsers.map((userData) => (
                    <div key={userData.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center">
                          <UserCheck className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{userData.name}</p>
                          <p className="text-sm text-gray-600">{userData.email}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant={userData.role === 'admin' ? 'default' : 'secondary'}>
                          {userData.role}
                        </Badge>
                        <p className="text-xs text-gray-500 mt-1">
                          {userData.predictionsCount} predictions
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <div>
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Activity className="h-5 w-5" />
                  <span>Recent Activity</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {predictions.slice(0, 5).map((prediction) => (
                    <div key={prediction.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        prediction.result === 'benign' ? 'bg-green-100' : 'bg-red-100'
                      }`}>
                        {prediction.type === 'tabular' ? (
                          <FileText className={`h-4 w-4 ${
                            prediction.result === 'benign' ? 'text-green-600' : 'text-red-600'
                          }`} />
                        ) : (
                          <FileText className={`h-4 w-4 ${
                            prediction.result === 'benign' ? 'text-green-600' : 'text-red-600'
                          }`} />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {prediction.userName}
                        </p>
                        <p className="text-xs text-gray-600">
                          {prediction.result} ({prediction.confidence.toFixed(1)}%)
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg mt-6">
              <CardHeader>
                <CardTitle className="text-lg">System Health</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">API Response Time</span>
                  <Badge className="bg-green-100 text-green-800">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    98ms avg
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Model Accuracy</span>
                  <Badge className="bg-green-100 text-green-800">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    97.8%
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">System Load</span>
                  <Badge className="bg-yellow-100 text-yellow-800">
                    <Clock className="h-3 w-3 mr-1" />
                    Medium
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Error Rate</span>
                  <Badge className="bg-green-100 text-green-800">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    0.2%
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