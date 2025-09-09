// // import { NextRequest, NextResponse } from 'next/server';

// // // Mock ML model prediction function
// // function predictBreastCancer(data: any) {
// //   // Simulate ML model processing
// //   const features = [
// //     data.radius_mean,
// //     data.texture_mean,
// //     data.perimeter_mean,
// //     data.area_mean,
// //     data.smoothness_mean,
// //     data.compactness_mean,
// //     data.concavity_mean,
// //     data.concave_points_mean,
// //     data.symmetry_mean,
// //     data.fractal_dimension_mean
// //   ];

// //   // Simple scoring based on feature values (mock algorithm)
// //   const normalizedScore = features.reduce((sum, feature, index) => {
// //     const weights = [0.15, 0.08, 0.12, 0.18, 0.06, 0.11, 0.13, 0.09, 0.04, 0.04];
// //     return sum + (feature * weights[index]);
// //   }, 0);

// //   // Normalize to 0-100 range and apply sigmoid-like function
// //   const rawScore = Math.min(100, Math.max(0, normalizedScore / 10));
// //   const sigmoidScore = 1 / (1 + Math.exp(-(rawScore - 50) / 10));
  
// //   const isMalignant = sigmoidScore > 0.5;
// //   const confidence = isMalignant 
// //     ? 50 + (sigmoidScore - 0.5) * 100
// //     : 50 + (0.5 - sigmoidScore) * 100;

// //   return {
// //     prediction: isMalignant ? 'malignant' : 'benign',
// //     confidence: Math.min(99, Math.max(60, confidence)), // Ensure realistic confidence range
// //     rawScore: sigmoidScore
// //   };
// // }

// // export async function POST(request: NextRequest) {
// //   try {
// //     const data = await request.json();

// //     // Validate required fields
// //     const requiredFields = [
// //       'radius_mean', 'texture_mean', 'perimeter_mean', 'area_mean',
// //       'smoothness_mean', 'compactness_mean', 'concavity_mean',
// //       'concave_points_mean', 'symmetry_mean', 'fractal_dimension_mean'
// //     ];

// //     for (const field of requiredFields) {
// //       if (typeof data[field] !== 'number') {
// //         return NextResponse.json(
// //           { error: `Invalid or missing field: ${field}` },
// //           { status: 400 }
// //         );
// //       }
// //     }

// //     // Run prediction
// //     const prediction = predictBreastCancer(data);

// //     // Create prediction result
// //     const result = {
// //       id: `pred-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
// //       type: 'tabular',
// //       prediction: prediction.prediction,
// //       confidence: prediction.confidence,
// //       inputData: data,
// //       modelMetrics: {
// //         accuracy: 97.8,
// //         precision: 96.4,
// //         recall: 98.1,
// //         f1Score: 97.2
// //       },
// //       timestamp: new Date().toISOString(),
// //       userId: 'current-user'
// //     };

// //     // In a real app, save to database here

// //     return NextResponse.json({
// //       success: true,
// //       predictionId: result.id,
// //       result
// //     });
// //   } catch (error) {
// //     console.error('Prediction error:', error);
// //     return NextResponse.json(
// //       { error: 'Prediction failed' },
// //       { status: 500 }
// //     );
// //   }
// // }
// import { NextResponse } from "next/server";

// export async function POST(req: Request) {
//   try {
//     const body = await req.json();

//     const res = await fetch("http://127.0.0.1:8000/predict/tabular", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(body),
//     });

//     const data = await res.json();
//     return NextResponse.json(data);
//   } catch (err) {
//     console.error("Error in proxy:", err);
//     return NextResponse.json({ error: "Prediction failed" }, { status: 500 });
//   }
// }
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const res = await fetch("http://127.0.0.1:8000/predict/tabular", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error("Error in tabular proxy:", err);
    return NextResponse.json({ error: "Prediction failed" }, { status: 500 });
  }
}
