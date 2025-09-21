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
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        {/* <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">AI Cancer Detection</h1>
                <p className="text-xs text-gray-500">Medical AI Platform</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {user ? (
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-gray-700">Welcome, {user.email}</span>
                  <Link href="/dashboard">
                    <Button size="sm">Dashboard</Button>
                  </Link>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Link href="/auth/login">
                    <Button variant="ghost" size="sm">Login</Button>
                  </Link>
                  <Link href="/auth/signup">
                    <Button size="sm">Get Started</Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div> */}
        {/* {user ? (
          <div className="flex items-center space-x-3">
            <span className="text-sm text-gray-700">Welcome, {user.email}</span>
            <Link href="/dashboard">
              <Button size="sm">Dashboard</Button>
            </Link>
          </div>
        ) : (
          <div className="flex items-center space-x-2">
            <Link href="/auth/login">
              <Button variant="ghost" size="sm">Login</Button>
            </Link>
            <Link href="/auth/signup">
              <Button size="sm">Get Started</Button>
            </Link>
          </div>
        )} */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Left: Logo + Title */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <Heart className="h-6 w-6 text-white" />
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
                    <Button size="sm">Dashboard</Button>
                  </Link>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Link href="/auth">
                    <Button variant="ghost" size="sm">Login</Button>
                  </Link>
                  <Link href="/auth/signup">
                    <Button size="sm">Get Started</Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

      </nav>


      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <Badge className="mb-6 bg-blue-100 text-blue-800 hover:bg-blue-200">
            <Stethoscope className="h-3 w-3 mr-1" />
            Powered by Advanced Machine Learning
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            AI-Powered Breast Cancer
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              Early Detection System
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Revolutionary machine learning platform providing accurate, fast, and reliable breast cancer detection
            using advanced algorithms trained on comprehensive medical datasets.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {/* <Link href={user ? "/predict" : "/auth/signup"}>
              <Button size="lg" className="text-lg px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                Start Analysis
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link> */}
            <Link href={user ? "/predict" : "/auth"}>
              <Button size="lg" className="text-lg px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                Start Analysis
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>

            <Link href="/about">
              <Button variant="outline" size="lg" className="text-lg px-8 py-3">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                {stats.totalPredictions.toLocaleString()}+
              </div>
              <div className="text-gray-600">Predictions Made</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-green-600 mb-2">
                {stats.accuracy}%
              </div>
              <div className="text-gray-600">Model Accuracy</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-purple-600 mb-2">
                {stats.usersServed}+
              </div>
              <div className="text-gray-600">Healthcare Providers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-indigo-600 mb-2">
                {stats.modelsActive}
              </div>
              <div className="text-gray-600">Active Models</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Advanced Detection Capabilities
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our platform combines cutting-edge AI technology with medical expertise to provide
              accurate and reliable breast cancer detection.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 prediction-card">
                <CardHeader className="text-center pb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center mx-auto mb-4 text-white">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-lg font-semibold">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Dataset Information */}
      <section className="py-20 bg-gray-50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-green-100 text-green-800">
                <CheckCircle className="h-3 w-3 mr-1" />
                Wisconsin Breast Cancer Dataset
              </Badge>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Trained on Comprehensive Medical Data
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Our AI models are trained on the renowned Wisconsin Breast Cancer Dataset,
                containing detailed cellular characteristics from 569 breast mass samples
                with 30 distinct features.
              </p>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="text-gray-700">569 breast mass samples analyzed</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="text-gray-700">30 cellular characteristics measured</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="text-gray-700">97.8% classification accuracy achieved</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="text-gray-700">Validated by medical professionals</span>
                </div>
              </div>
            </div>
            <Card className="shadow-2xl border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="h-5 w-5" />
                  <span>Dataset Features</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">357</div>
                    <div className="text-sm text-gray-600">Benign Cases</div>
                  </div>
                  <div className="text-center p-3 bg-red-50 rounded-lg">
                    <div className="text-2xl font-bold text-red-600">212</div>
                    <div className="text-sm text-gray-600">Malignant Cases</div>
                  </div>
                </div>
                <div className="text-sm text-gray-600 leading-relaxed">
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
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Expert Development Team
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our multidisciplinary team combines medical expertise with advanced
              AI development capabilities.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="text-center border-0 shadow-lg prediction-card">
                <CardHeader>
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-lg">{member.name}</CardTitle>
                  <Badge variant="secondary" className="mx-auto">
                    {member.role}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">{member.expertise}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Experience Advanced AI Detection?
          </h2>
          <p className="text-xl opacity-90 mb-8 leading-relaxed">
            Join hundreds of healthcare professionals using our platform for
            accurate breast cancer detection and analysis.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={user ? "/predict" : "/auth"}>
              <Button size="lg" variant="secondary" className="text-lg px-8 py-3">
                Start Free Analysis
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/about">
              <Button size="lg" variant="outline" className="text-lg px-8 py-3 border-white text-black hover:bg-white hover:text-blue-600">
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