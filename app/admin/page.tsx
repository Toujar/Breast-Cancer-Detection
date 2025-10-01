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
  CheckCircle,
  LogOut
} from 'lucide-react';
// import { useAuth } from '@/lib/auth-context';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend, PieChart, Pie, Cell } from 'recharts';

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
  userId?: string;
  userName: string;
  userEmail?: string;
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
  const [user, setUser] = useState<{ email: string; username: string; role: string } | null>(null);

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
    if (!user && !isLoading) {
      router.push('/auth');
      return;
    }
    if (user && user.role !== 'admin') {
      router.push('/dashboard');
      return;
    }

    if (user?.role === 'admin') {
      fetchAdminData();
    }
  }, [user, isLoading, router]);

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

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } finally {
      router.push('/');
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

  // Derived data for pie chart: benign vs malignant counts
  const pieData = (() => {
    const counts = predictions.reduce(
      (acc, p) => {
        if (p.result === 'benign') acc.benign += 1;
        else if (p.result === 'malignant') acc.malignant += 1;
        return acc;
      },
      { benign: 0, malignant: 0 }
    );
    return [
      { name: 'Benign', value: counts.benign, fill: '#10B981' },
      { name: 'Malignant', value: counts.malignant, fill: '#EF4444' },
    ];
  })();

  const COLORS = ['#10B981', '#EF4444'];

  // if (!user || user.role !== 'admin') return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Navigation */}
      {/* Navigation */}
      <nav className="bg-white/90 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">

            {/* Back to Dashboard */}
            <Link href="/dashboard" className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                className="flex items-center space-x-1 hover:bg-blue-50 transition"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Dashboard</span>
              </Button>
            </Link>

            {/* Logo / Title */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center shadow-lg">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Admin Dashboard</h1>
                <p className="text-xs text-gray-500">System Management</p>
              </div>
            </div>

            {/* User Info */}
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-900">{user?.username ?? 'N/A'}</span>
                  <Badge variant="default" className="px-2 py-1">
                    👑 Admin
                  </Badge>
                </div>
                <p className="text-xs text-gray-500">{user?.email ?? 'N/A'}</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="flex items-center space-x-1 hover:text-red-600 transition"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </nav>


      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
            System Administration
          </h1>
          <p className="text-gray-600 text-lg max-w-xl">
            Monitor platform usage, user activity, and system performance in real time.
          </p>
          <div className="mt-4 flex space-x-2">
            <span className="px-3 py-1 bg-indigo-100 text-indigo-800 text-sm font-medium rounded-full">
              Admin Panel
            </span>
            <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
              Live Stats
            </span>
            <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-sm font-medium rounded-full">
              User Management
            </span>
          </div>
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
        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          <Card className="border-0 shadow-lg lg:col-span-2">
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
              <CardTitle>Prediction Outcomes</CardTitle>
              <CardDescription>Distribution of benign vs malignant</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* User Management */}
        {/* User Management */}
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-lg rounded-xl hover:shadow-2xl transition-all duration-300">
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
                  {filteredUsers.length > 0 ? (
                    filteredUsers.map((userData) => (
                      <div
                        key={userData.id}
                        className="flex items-center justify-between p-4 bg-gradient-to-r from-white via-gray-50 to-white rounded-xl shadow hover:shadow-lg transition-all"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-md animate-pulse">
                            <UserCheck className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{userData.name}</p>
                            <p className="text-sm text-gray-500 truncate">{userData.email}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge
                            className={`px-3 py-1 text-sm font-semibold rounded-full shadow-md ${userData.role === 'admin'
                              ? 'bg-gradient-to-r from-yellow-400 to-red-400 text-white'
                              : 'bg-gradient-to-r from-purple-400 to-pink-500 text-white'
                              }`}
                          >
                            {userData.role}
                          </Badge>
                          <p className="text-xs text-gray-500 mt-1">{userData.predictionsCount} predictions</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-10">
                      <Users className="h-10 w-10 text-gray-400 mx-auto mb-3 animate-bounce" />
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">No users yet</h3>
                      <p className="text-gray-600">Invite your team and start making predictions.</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          {/* Recent Activity */}
          <div className="space-y-6">
            <Card className="border-0 shadow-lg rounded-xl hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-indigo-50 via-white to-purple-50">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-purple-700">
                  <Activity className="h-5 w-5" />
                  <span>Recent Activity</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {predictions.length > 0 ? (
                    predictions.slice(0, 5).map((prediction) => (
                      <div
                        key={prediction.id}
                        className={`flex items-center space-x-3 p-3 rounded-xl shadow-md transition-all hover:shadow-lg ${prediction.result === 'benign'
                          ? 'bg-green-50 hover:bg-green-100'
                          : 'bg-red-50 hover:bg-red-100'
                          }`}
                      >
                        <div
                          className={`w-10 h-10 rounded-lg flex items-center justify-center ${prediction.result === 'benign' ? 'bg-green-100' : 'bg-red-100'
                            }`}
                        >
                          <FileText
                            className={`h-5 w-5 ${prediction.result === 'benign' ? 'text-green-600 animate-pulse' : 'text-red-600 animate-pulse'
                              }`}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {prediction.userName} {prediction.userEmail ? `• ${prediction.userEmail}` : ''}
                          </p>
                          <p className="text-xs text-gray-600">
                            {prediction.result} ({prediction.confidence.toFixed(1)}%)
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <Activity className="h-10 w-10 text-gray-400 mx-auto mb-2 animate-bounce" />
                      <p className="text-gray-600">No recent activity yet. Encourage users to run their first analysis.</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* System Health */}
            <Card className="border-0 shadow-lg rounded-xl hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-yellow-50 via-white to-orange-50">
              <CardHeader>
                <CardTitle className="text-lg text-orange-700">System Health</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-all">
                  <span className="text-sm font-medium">API Response Time</span>
                  <Badge className="bg-green-100 text-green-800">
                    <CheckCircle className="h-3 w-3 mr-1" /> 98ms avg
                  </Badge>
                </div>
                <div className="flex items-center justify-between bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-all">
                  <span className="text-sm font-medium">Model Accuracy</span>
                  <Badge className="bg-green-100 text-green-800">
                    <TrendingUp className="h-3 w-3 mr-1" /> 97.8%
                  </Badge>
                </div>
                <div className="flex items-center justify-between bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-all">
                  <span className="text-sm font-medium">System Load</span>
                  <Badge className="bg-yellow-100 text-yellow-800">
                    <Clock className="h-3 w-3 mr-1" /> Medium
                  </Badge>
                </div>
                <div className="flex items-center justify-between bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-all">
                  <span className="text-sm font-medium">Error Rate</span>
                  <Badge className="bg-green-100 text-green-800">
                    <CheckCircle className="h-3 w-3 mr-1" /> 0.2%
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