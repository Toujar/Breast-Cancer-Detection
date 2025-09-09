'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export default function PredictPage() {
  const [activeTab, setActiveTab] = useState<'image' | 'tabular'>('image');

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <Card className="w-full max-w-3xl shadow-lg">
        <CardHeader>
          <CardTitle className="text-center text-xl font-semibold">
            Prediction Dashboard
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Toggle Buttons */}
          <div className="flex justify-center gap-4 mb-6">
            <Button
              variant={activeTab === 'image' ? 'default' : 'outline'}
              onClick={() => setActiveTab('image')}
            >
              Image Prediction
            </Button>
            <Button
              variant={activeTab === 'tabular' ? 'default' : 'outline'}
              onClick={() => setActiveTab('tabular')}
            >
              Tabular Prediction
            </Button>
          </div>

          {/* Render Content */}
          <div className="border rounded-xl p-6">
            {activeTab === 'image' ? (
              <div className="text-center">
                <h2 className="text-lg font-semibold mb-4">Image Prediction</h2>
                <p className="text-gray-600 mb-4">
                  Upload an image and run AI-based prediction.
                </p>
                <Link href="/predict/image">
                  <Button>Go to Image Prediction</Button>
                </Link>
              </div>
            ) : (
              <div className="text-center">
                <h2 className="text-lg font-semibold mb-4">Tabular Prediction</h2>
                <p className="text-gray-600 mb-4">
                  Enter tabular data (like CSV or manual inputs) for prediction.
                </p>
                <Link href="/predict/tabular">
                  <Button>Go to Tabular Prediction</Button>
                </Link>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
