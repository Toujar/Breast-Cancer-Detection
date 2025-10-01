'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  Settings,
  User,
  ArrowLeft,
  Save,
  Eye,
  EyeOff,
  CheckCircle,
  AlertCircle,
  Heart,
  Shield,
  Bell,
  Key,
  LogOut
} from 'lucide-react';

export default function SettingsPage() {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    age: '',
    phoneNumber: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch('/api/auth/me');
        const data = await res.json();
        if (data.user) {
          setUser(data.user);
          setFormData({
            username: data.user.username || '',
            email: data.user.email || '',
            age: data.user.age?.toString() || '',
            phoneNumber: data.user.phoneNumber || '',
            currentPassword: '',
            newPassword: '',
            confirmPassword: ''
          });
        }
      } catch (err) {
        console.error("Error fetching user:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUser();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage('');

    try {
      const res = await fetch('/api/auth/update-profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          username: formData.username,
          age: formData.age ? Number(formData.age) : undefined,
          phoneNumber: formData.phoneNumber
        })
      });

      const data = await res.json();

      if (res.ok) {
        setMessage('Profile updated successfully!');
        setUser(prev => prev ? { ...prev, ...data.user } : null);
      } else {
        setMessage(data.error || 'Failed to update profile');
      }
    } catch (error) {
      setMessage('An error occurred while updating your profile');
    } finally {
      setIsSaving(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage('');

    if (formData.newPassword !== formData.confirmPassword) {
      setMessage('New passwords do not match');
      setIsSaving(false);
      return;
    }

    try {
      const res = await fetch('/api/auth/change-password', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword
        })
      });

      const data = await res.json();

      if (res.ok) {
        setMessage('Password changed successfully!');
        setFormData(prev => ({
          ...prev,
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        }));
      } else {
        setMessage(data.error || 'Failed to change password');
      }
    } catch (error) {
      setMessage('An error occurred while changing your password');
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogout = async () => {
    // clear cookie
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading settings...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Authentication Required</h1>
          <p className="text-gray-600 mb-6">Please sign in to access your settings.</p>
          <Link href="/auth">
            <Button>Sign In</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Link href="/dashboard">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Dashboard
                </Button>
              </Link>
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <Settings className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Settings</h1>
                <p className="text-xs text-gray-500">Manage your account</p>
              </div>
            </div>
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

      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        {/* Header */}
        <div className="mb-8 flex flex-col space-y-2">
          <div className="flex items-center space-x-3">
            <User className="h-8 w-8 text-blue-600" />
            <h1 className="text-3xl font-extrabold text-gray-900">
              Account Settings
            </h1>
          </div>
          <p className="text-gray-600 max-w-xl">
            Manage your profile information and account preferences.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-full"></div>
        </div>


        {/* Message */}
        {message && (
          <div className={`mb-6 p-4 rounded-lg flex items-center space-x-2 ${message.includes('successfully')
            ? 'bg-green-50 text-green-800 border border-green-200'
            : 'bg-red-50 text-red-800 border border-red-200'
            }`}>
            {message.includes('successfully') ? (
              <CheckCircle className="h-5 w-5" />
            ) : (
              <AlertCircle className="h-5 w-5" />
            )}
            <span>{message}</span>
          </div>
        )}

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Profile Information */}
          <Card className="border-0 shadow-xl rounded-xl hover:shadow-2xl transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-blue-600">
                <User className="h-5 w-5" />
                <span>Profile Information</span>
              </CardTitle>
              <CardDescription className="text-gray-500">
                Update your personal details and contact information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSaveProfile} className="space-y-4">
                <div className="space-y-1">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    placeholder="Enter your username"
                    className="border-blue-300 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div className="space-y-1">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    disabled
                    className="bg-gray-50 border-gray-300 text-gray-500"
                  />
                  <p className="text-xs text-gray-400">Email cannot be changed</p>
                </div>

                <div className="space-y-1">
                  <Label htmlFor="age">Age</Label>
                  <Input
                    id="age"
                    name="age"
                    type="number"
                    value={formData.age}
                    onChange={handleInputChange}
                    placeholder="Enter your age"
                    min="0"
                    max="120"
                    className="border-blue-300 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div className="space-y-1">
                  <Label htmlFor="phoneNumber">Phone Number</Label>
                  <Input
                    id="phoneNumber"
                    name="phoneNumber"
                    type="tel"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    placeholder="Enter your phone number"
                    className="border-blue-300 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSaving}
                  className="w-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500 text-white shadow-lg transition-all flex items-center justify-center"
                >
                  <Save className="h-4 w-4 mr-2" />
                  {isSaving ? 'Saving...' : 'Save Profile'}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Security Settings */}
          <Card className="border-0 shadow-xl rounded-xl hover:shadow-2xl transition-all duration-300 mt-6">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-red-600">
                <Shield className="h-5 w-5" />
                <span>Security Settings</span>
              </CardTitle>
              <CardDescription className="text-gray-500">
                Change your password and manage account security
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleChangePassword} className="space-y-4">
                <div className="space-y-1 relative">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input
                    id="currentPassword"
                    name="currentPassword"
                    type={showPassword ? "text" : "password"}
                    value={formData.currentPassword}
                    onChange={handleInputChange}
                    placeholder="Enter current password"
                    className="border-red-300 focus:ring-red-500 focus:border-red-500"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>

                <div className="space-y-1">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input
                    id="newPassword"
                    name="newPassword"
                    type="password"
                    value={formData.newPassword}
                    onChange={handleInputChange}
                    placeholder="Enter new password"
                    className="border-red-300 focus:ring-red-500 focus:border-red-500"
                  />
                </div>

                <div className="space-y-1">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="Confirm new password"
                    className="border-red-300 focus:ring-red-500 focus:border-red-500"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSaving}
                  className="w-full bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 hover:from-pink-500 hover:via-purple-500 hover:to-red-500 text-white shadow-lg transition-all flex items-center justify-center"
                >
                  <Key className="h-4 w-4 mr-2" />
                  {isSaving ? 'Changing...' : 'Change Password'}
                </Button>
              </form>
            </CardContent>
          </Card>

        </div>

        {/* Account Information */}
        {/* Account Information */}
        <Card className="border-0 shadow-xl rounded-xl hover:shadow-2xl transition-all duration-300 mt-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-pink-600">
              <Heart className="h-5 w-5 animate-pulse-slow" />
              <span>Account Information</span>
            </CardTitle>
            <CardDescription className="text-gray-500">
              Your account details and role information
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label className="text-sm font-medium text-gray-500">Account Type</Label>
                  <div className="mt-1">
                    <Badge
                      className={`px-3 py-1 text-sm font-semibold rounded-full shadow-md transition-all ${user.role === 'admin'
                          ? 'bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 text-white'
                          : 'bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-white'
                        }`}
                    >
                      {user.role === 'admin' ? '👑 Admin' : '👤 User'}
                    </Badge>
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">Member Since</Label>
                  <p className="text-sm text-gray-900 font-medium">
                    {new Date(user.createdAt || Date.now()).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label className="text-sm font-medium text-gray-500">Last Updated</Label>
                  <p className="text-sm text-gray-900 font-medium">
                    {new Date(user.updatedAt || Date.now()).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">Account Status</Label>
                  <div className="mt-1">
                    <Badge className="flex items-center px-3 py-1 text-sm font-semibold rounded-full bg-green-100 text-green-800 shadow-md animate-pulse-slow">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Active
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
