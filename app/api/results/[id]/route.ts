import { NextRequest, NextResponse } from 'next/server';

// Mock results database
const mockResults: any = {};

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;

    // For demo purposes, generate a mock result if not found
    let result = mockResults[id];
    
    if (!result) {
      // Generate a realistic mock result
      const isTabular = id.includes('pred-');
      const isBenign = Math.random() > 0.3; // 70% benign rate (realistic)
      
      result = {
        id,
        type: isTabular ? 'tabular' : 'image',
        prediction: isBenign ? 'benign' : 'malignant',
        confidence: Math.random() * 25 + 70, // 70-95% confidence
        inputData: isTabular ? {
          radius_mean: 14.127,
          texture_mean: 19.289,
          perimeter_mean: 91.969,
          area_mean: 654.889,
          // ... other fields
        } : {
          fileName: 'mammogram.jpg',
          fileSize: 2048576,
          fileType: 'image/jpeg'
        },
        modelMetrics: {
          accuracy: isTabular ? 97.8 : 94.2,
          precision: isTabular ? 96.4 : 93.1,
          recall: isTabular ? 98.1 : 95.3,
          f1Score: isTabular ? 97.2 : 94.2
        },
        timestamp: new Date().toISOString(),
        userId: 'current-user'
      };
      
      mockResults[id] = result;
    }

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch result' },
      { status: 500 }
    );
  }
}