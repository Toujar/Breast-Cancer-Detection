'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Activity,
  Brain,
  Shield,
  Users,
  BarChart3,
  FileText,
  ArrowRight,
  CheckCircle,
  Heart,
  Stethoscope
} from 'lucide-react';
// import { useAuth } from '@/lib/auth-context';





export default function Home() {

  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  // const { user } = useAuth();
  const [stats, setStats] = useState({
    totalPredictions: 1247,
    accuracy: 97.8,
    usersServed: 342,
    modelsActive: 3
  });

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

  const features = [
    {
      icon: <Brain className="h-6 w-6" />,
      title: "Advanced AI Models",
      description: "State-of-the-art machine learning algorithms trained on comprehensive medical datasets"
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "HIPAA Compliant",
      description: "Enterprise-grade security ensuring patient data protection and privacy"
    },
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: "Detailed Analytics",
      description: "Comprehensive reporting with confidence scores and statistical analysis"
    },
    {
      icon: <Activity className="h-6 w-6" />,
      title: "Real-time Processing",
      description: "Instant predictions with detailed probability assessments"
    }
  ];

  const teamMembers = [
    { name: "Swati", role: "Lead Data Scientist", expertise: "Machine Learning" },
    { name: "Toujar", role: "Full-Stack Developer", expertise: "Next.js & Python" },
    { name: "SudhRani", role: "Medical Advisor", expertise: "Oncology" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Navigation */}
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">

            {/* Left: Logo + Title */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center shadow-lg">
                <Heart className="h-6 w-6 text-white animate-pulse" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">AI Cancer Detection</h1>
                <p className="text-xs text-gray-500">Medical AI Platform</p>
              </div>
            </div>

            {/* Right: Auth buttons */}
            <div className="flex items-center space-x-4">
              {user ? (
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-gray-700">Welcome, {user.email}</span>
                  <Link href="/dashboard">
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white hover:from-blue-500 hover:to-indigo-500 transition-all shadow-md"
                    >
                      Dashboard
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Link href="/auth">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-indigo-500 text-indigo-500 hover:bg-indigo-50 transition-all"
                    >
                      Login
                    </Button>
                  </Link>
                  <Link href="/auth/signup">
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-green-400 to-teal-500 text-white hover:from-teal-500 hover:to-green-400 transition-all shadow-md"
                    >
                      Get Started
                    </Button>
                  </Link>
                </div>
              )}
            </div>

          </div>
        </div>
      </nav>



      {/* Hero Section */}
      {/* Hero Section */}
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-purple-50 via-pink-50 to-yellow-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto text-center relative z-10">

          {/* Badge */}
          <Badge className="mb-6 inline-flex items-center gap-2 px-4 py-1 rounded-full bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300 text-white font-semibold shadow-md hover:scale-105 transition-all">
            <Stethoscope className="h-4 w-4 animate-pulse" />
            Powered by Advanced Machine Learning
          </Badge>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight text-gray-900 relative">
            AI-Powered Breast Cancer
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 animate-gradient-x">
              Early Detection System
            </span>
            <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-48 h-2 bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 rounded-full opacity-40 blur-2xl animate-pulse"></span>
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed">
            A revolutionary machine learning platform providing accurate, fast, and reliable breast cancer detection
            with multi-dimensional analysis and advanced algorithms trained on extensive medical datasets.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={user ? "/predict" : "/auth"}>
              <Button
                size="lg"
                className="text-lg px-8 py-3 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:from-pink-600 hover:via-purple-600 hover:to-indigo-600 shadow-lg transition-all transform hover:scale-105 flex items-center justify-center text-white"
              >
                Start Analysis
                <ArrowRight className="ml-2 h-5 w-5 animate-bounce" />
              </Button>
            </Link>

            <Link href="/about">
              <Button
                variant="outline"
                size="lg"
                className="relative text-lg px-8 py-3 rounded-lg font-semibold
             text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-blue-800 to-purple-400
             border-2 border-transparent hover:text-white hover:bg-gradient-to-r hover:from-yellow-400 hover:via-pink-400 hover:to-purple-400
             shadow-md transition-all
             after:absolute after:inset-0 after:bg-gradient-to-r after:from-yellow-400 after:via-blue-800 after:to-purple-400 after:rounded-lg after:-z-10 after:opacity-30"
              >
                Learn More
              </Button>

            </Link>
          </div>
        </div>

        {/* Background Shapes */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300 rounded-full opacity-20 blur-3xl animate-pulse -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 rounded-full opacity-20 blur-3xl animate-pulse translate-x-1/2 translate-y-1/2"></div>
      </section>



      {/* Stats Section */}
      {/* Stats Section */}
      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-b from-purple-50 via-pink-50 to-yellow-50 relative overflow-hidden">
        {/* Abstract color shapes */}
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-gradient-to-tr from-pink-300 via-purple-300 to-indigo-400 rounded-full opacity-20 animate-pulse-slow blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-gradient-to-br from-yellow-300 via-orange-300 to-red-400 rounded-full opacity-20 animate-pulse-slow blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">

            {/* Total Predictions */}
            <div className="text-center relative group p-6 rounded-xl bg-white/30 backdrop-blur-md shadow-lg hover:shadow-2xl transition-all">
              <div className="text-3xl md:text-4xl font-extrabold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600 animate-gradient-x">
                {stats.totalPredictions.toLocaleString()}+
              </div>
              <div className="text-gray-700 font-medium">Predictions Made</div>
            </div>

            {/* Model Accuracy */}
            <div className="text-center relative group p-6 rounded-xl bg-white/30 backdrop-blur-md shadow-lg hover:shadow-2xl transition-all">
              <div className="text-3xl md:text-4xl font-extrabold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-teal-400 to-blue-500 animate-gradient-x">
                {stats.accuracy}%
              </div>
              <div className="text-gray-700 font-medium">Model Accuracy</div>
            </div>

            {/* Healthcare Providers */}
            <div className="text-center relative group p-6 rounded-xl bg-white/30 backdrop-blur-md shadow-lg hover:shadow-2xl transition-all">
              <div className="text-3xl md:text-4xl font-extrabold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-red-500 animate-gradient-x">
                {stats.usersServed}+
              </div>
              <div className="text-gray-700 font-medium">Healthcare Providers</div>
            </div>

            {/* Active Models */}
            <div className="text-center relative group p-6 rounded-xl bg-white/30 backdrop-blur-md shadow-lg hover:shadow-2xl transition-all">
              <div className="text-3xl md:text-4xl font-extrabold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-500 animate-gradient-x">
                {stats.modelsActive}
              </div>
              <div className="text-gray-700 font-medium">Active Models</div>
            </div>

          </div>
        </div>
      </section>



      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-purple-50 via-pink-50 to-yellow-50 relative overflow-hidden">
        {/* Background shapes */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-80 h-80 bg-gradient-to-tr from-pink-300 via-purple-300 to-indigo-400 rounded-full opacity-20 animate-pulse-slow blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-gradient-to-br from-yellow-300 via-orange-300 to-red-400 rounded-full opacity-20 animate-pulse-slow blur-3xl"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
              Advanced Detection Capabilities
            </h2>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto">
              Our platform combines cutting-edge AI technology with medical expertise to provide
              accurate and reliable breast cancer detection.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 relative overflow-hidden group"
              >
                <CardHeader className="text-center pb-4 relative z-10">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4 text-white bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-600 shadow-lg transform group-hover:scale-110 transition-transform duration-500">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-lg font-semibold">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="relative z-10">
                  <CardDescription className="text-center leading-relaxed text-gray-700">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Dataset Information */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-yellow-50 via-pink-50 to-purple-50 relative overflow-hidden">
        {/* Background shapes */}
        <div className="absolute top-10 left-0 w-60 h-60 bg-gradient-to-tr from-pink-300 via-purple-300 to-indigo-400 rounded-full opacity-20 animate-pulse-slow blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-br from-yellow-300 via-orange-300 to-red-400 rounded-full opacity-20 animate-pulse-slow blur-3xl"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-gradient-to-r from-green-400 via-teal-400 to-blue-400 text-white shadow-lg animate-pulse">
                <CheckCircle className="h-3 w-3 mr-1" />
                Wisconsin Breast Cancer Dataset
              </Badge>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Trained on Comprehensive Medical Data
              </h2>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Our AI models are trained on the renowned Wisconsin Breast Cancer Dataset,
                containing detailed cellular characteristics from 569 breast mass samples
                with 30 distinct features.
              </p>
              <div className="space-y-3">
                {[
                  "569 breast mass samples analyzed",
                  "30 cellular characteristics measured",
                  "97.8% classification accuracy achieved",
                  "Validated by medical professionals"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <Card className="shadow-2xl border-0 overflow-hidden">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="h-5 w-5" />
                  <span>Dataset Features</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 rounded-lg bg-gradient-to-br from-blue-400 to-indigo-500 text-white shadow-lg">
                    <div className="text-2xl font-bold">357</div>
                    <div className="text-sm">Benign Cases</div>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-gradient-to-br from-red-400 to-pink-500 text-white shadow-lg">
                    <div className="text-2xl font-bold">212</div>
                    <div className="text-sm">Malignant Cases</div>
                  </div>
                </div>
                <div className="text-sm text-gray-700 leading-relaxed mt-3">
                  Features include radius, texture, perimeter, area, smoothness, compactness,
                  concavity, concave points, symmetry, and fractal dimension with mean,
                  standard error, and worst values.
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>


      {/* Team Section */}
      {/* Team Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-purple-50 via-pink-50 to-yellow-50 relative overflow-hidden">
        {/* Background abstract shapes */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-72 h-72 bg-gradient-to-tr from-pink-300 via-purple-300 to-indigo-400 rounded-full opacity-20 animate-pulse-slow blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-to-br from-yellow-300 via-orange-300 to-red-400 rounded-full opacity-20 animate-pulse-slow blur-3xl"></div>

        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
              Expert Development Team
            </h2>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto">
              Our multidisciplinary team combines medical expertise with advanced AI development capabilities.
            </p>
          </div>

          {/* Centered Team Members */}
          <div className="flex flex-wrap justify-center gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="text-center border-0 shadow-xl hover:shadow-2xl transition-all duration-300 relative w-72">
                <CardHeader>
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-white bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-600 shadow-lg transform hover:scale-110 transition-transform duration-500">
                    <Users className="h-8 w-8" />
                  </div>
                  <CardTitle className="text-lg font-semibold">{member.name}</CardTitle>
                  <Badge className="mx-auto bg-gradient-to-r from-green-400 via-teal-400 to-blue-400 text-white shadow-lg">
                    {member.role}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-700">{member.expertise}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>


      {/* CTA Section */}
      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-pink-100 via-purple-100 to-indigo-100 text-gray-900 relative overflow-hidden">
        {/* Subtle floating shapes */}
        <div className="absolute top-0 left-0 w-60 h-60 bg-gradient-to-tr from-yellow-200 via-orange-200 to-pink-200 rounded-full opacity-30 animate-pulse-slow blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-gradient-to-br from-blue-200 via-teal-200 to-green-200 rounded-full opacity-30 animate-pulse-slow blur-3xl"></div>

        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-6">
            Ready to Experience Advanced AI Detection?
          </h2>
          <p className="text-xl opacity-90 mb-8 leading-relaxed">
            Join hundreds of healthcare professionals using our platform for accurate breast cancer detection and analysis.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={user ? "/predict" : "/auth"}>
              <Button
                size="lg"
                className="text-lg px-8 py-3 bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 hover:from-purple-300 hover:via-indigo-300 hover:to-blue-400 shadow-2xl transition-all transform hover:scale-105 flex items-center justify-center text-white"
              >
                Start Free Analysis
                <ArrowRight className="ml-2 h-5 w-5 animate-bounce text-white" />
              </Button>
            </Link>
            <Link href="/about">
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-3 border-gray-300 border-2 text-gray-700 hover:bg-white hover:text-purple-600 shadow-lg transition-all"
              >
                View Documentation
              </Button>
            </Link>
          </div>
        </div>
      </section>



      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                  <Heart className="h-5 w-5 text-white" />
                </div>
                <span className="text-lg font-semibold text-white">AI Cancer Detection</span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Advanced AI platform for early breast cancer detection and medical analysis.
              </p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Platform</h3>
              <ul className="space-y-2">
                <li><Link href="/predict" className="hover:text-white transition-colors">Predictions</Link></li>
                <li><Link href="/history" className="hover:text-white transition-colors">History</Link></li>
                <li><Link href="/dashboard" className="hover:text-white transition-colors">Dashboard</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
                <li><Link href="/documentation" className="hover:text-white transition-colors">Documentation</Link></li>
                <li><Link href="/research" className="hover:text-white transition-colors">Research</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Support</h3>
              <ul className="space-y-2">
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                <li><Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms-and-conditions" className="hover:text-white transition-colors">Terms of Service</Link></li>
                {/* <li><Link href="/analytics" className="hover:text-white transition-colors">Analytics</Link></li>
                <li><Link href="/settings" className="hover:text-white transition-colors">Settings</Link></li> */}
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 AI Cancer Detection System. All rights reserved. For educational purposes.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}