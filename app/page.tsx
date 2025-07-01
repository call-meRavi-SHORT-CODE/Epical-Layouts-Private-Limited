'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Building2, Sparkles, Zap, Shield, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function SignIn() {
  const [isLoading, setIsLoading] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [currentTime, setCurrentTime] = useState(new Date());
  const router = useRouter();

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    
    // Simulate Google OAuth flow
    setTimeout(() => {
      setIsLoading(false);
      // For demo purposes, randomly assign admin or employee
      const isAdmin = Math.random() > 0.5;
      if (isAdmin) {
        router.push('/admin/dashboard');
      } else {
        router.push('/employee/dashboard');
      }
    }, 2500);
  };

  const GoogleIcon = () => (
    <svg className="w-6 h-6" viewBox="0 0 24 24">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Dynamic Background */}
      <div className="absolute inset-0">
        {/* Animated Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
        
        {/* Floating Orbs */}
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-cyan-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
        
        {/* Mouse Follower */}
        <div 
          className="absolute w-96 h-96 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl transition-all duration-1000 ease-out pointer-events-none"
          style={{
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
          }}
        ></div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          ></div>
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-lg">
          {/* Header Section */}
          <div className="text-center mb-12 space-y-6">
            {/* Logo with Glow Effect */}
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl blur-xl opacity-50 animate-pulse"></div>
              <div className="relative p-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl shadow-2xl">
                <Building2 className="h-16 w-16 text-white mx-auto" />
              </div>
            </div>

            {/* Company Name with Animated Text */}
            <div className="space-y-2">
              <h1 className="text-5xl font-bold bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
                EPICAL LAYOUTS
              </h1>
              <div className="flex items-center justify-center gap-2 text-gray-300">
                <Sparkles className="h-4 w-4 animate-pulse" />
                <span className="text-lg font-light">Next-Gen HR Platform</span>
                <Sparkles className="h-4 w-4 animate-pulse" />
              </div>
            </div>

            {/* Live Time Display */}
            <div className="text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-white/80 text-sm font-mono">
                  {currentTime.toLocaleTimeString()}
                </span>
              </div>
            </div>
          </div>

          {/* Login Card */}
          <Card className="relative bg-white/10 backdrop-blur-2xl border border-white/20 shadow-2xl overflow-hidden">
            {/* Card Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 opacity-50"></div>
            
            <div className="relative p-8 space-y-8">
              {/* Welcome Message */}
              <div className="text-center space-y-3">
                <h2 className="text-3xl font-bold text-white">Welcome Back</h2>
                <p className="text-gray-300 text-lg">
                  Access your digital workspace with one click
                </p>
              </div>

              {/* Feature Highlights */}
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mx-auto">
                    <Zap className="h-6 w-6 text-white" />
                  </div>
                  <p className="text-xs text-gray-300">Lightning Fast</p>
                </div>
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mx-auto">
                    <Shield className="h-6 w-6 text-white" />
                  </div>
                  <p className="text-xs text-gray-300">Ultra Secure</p>
                </div>
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-xl flex items-center justify-center mx-auto">
                    <Sparkles className="h-6 w-6 text-white" />
                  </div>
                  <p className="text-xs text-gray-300">AI Powered</p>
                </div>
              </div>

              {/* Google Sign In Button */}
              <div className="space-y-4">
                <Button 
                  onClick={handleGoogleSignIn}
                  className="w-full h-16 bg-white hover:bg-gray-50 text-gray-800 border-0 font-semibold text-lg shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-105 group relative overflow-hidden"
                  disabled={isLoading}
                >
                  {/* Button Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="relative flex items-center justify-center gap-4">
                    {isLoading ? (
                      <>
                        <div className="w-6 h-6 border-3 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
                        <span>Connecting to Google...</span>
                      </>
                    ) : (
                      <>
                        <GoogleIcon />
                        <span>Continue with Google</span>
                        <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                      </>
                    )}
                  </div>
                </Button>

                {/* Loading Progress */}
                {isLoading && (
                  <div className="space-y-2">
                    <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
                    </div>
                    <p className="text-center text-sm text-gray-300">
                      Authenticating your identity...
                    </p>
                  </div>
                )}
              </div>

              {/* Security Badge */}
              <div className="flex items-center justify-center gap-3 p-4 bg-white/5 rounded-2xl border border-white/10">
                <Shield className="h-5 w-5 text-green-400" />
                <div className="text-center">
                  <p className="text-sm font-medium text-white">Enterprise Security</p>
                  <p className="text-xs text-gray-400">OAuth 2.0 • End-to-End Encryption</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Footer */}
          <div className="mt-8 text-center space-y-4">
            <div className="flex items-center justify-center gap-6 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition-colors duration-300 flex items-center gap-1">
                <span>Privacy Policy</span>
              </a>
              <span>•</span>
              <a href="#" className="hover:text-white transition-colors duration-300 flex items-center gap-1">
                <span>Terms of Service</span>
              </a>
              <span>•</span>
              <a href="#" className="hover:text-white transition-colors duration-300 flex items-center gap-1">
                <span>Support</span>
              </a>
            </div>
            <p className="text-gray-500 text-sm">
              © 2025 EPICAL LAYOUTS PVT LTD. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}