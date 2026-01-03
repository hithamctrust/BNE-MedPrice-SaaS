'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';

export default function Home() {
  const router = useRouter();
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (user) {
    router.push('/dashboard');
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-indigo-600">MedPrice AI</div>
          <div className="space-x-4">
            <Link href="/auth/login" className="px-4 py-2 text-gray-600 hover:text-gray-900">
              Login
            </Link>
            <Link href="/auth/signup" className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
              Sign Up
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Advanced AI-Powered Medical Price Extraction
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Extract medical claims, prices, and provider information instantly with our state-of-the-art AI engine.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/auth/signup" className="px-8 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 text-lg font-semibold">
              Get Started Free
            </Link>
            <Link href="/pricing" className="px-8 py-3 bg-white text-indigo-600 border border-indigo-600 rounded-lg hover:bg-indigo-50 text-lg font-semibold">
              View Pricing
            </Link>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h3 className="text-lg font-bold mb-4 text-gray-900">⚡ Lightning Fast</h3>
            <p className="text-gray-600">Process documents in seconds with our advanced AI engine.</p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h3 className="text-lg font-bold mb-4 text-gray-900">🎯 99% Accuracy</h3>
            <p className="text-gray-600">Industry-leading accuracy in data extraction and classification.</p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h3 className="text-lg font-bold mb-4 text-gray-900">🔒 Secure & Compliant</h3>
            <p className="text-gray-600">HIPAA compliant with enterprise-grade security.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
