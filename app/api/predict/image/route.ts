// import { NextRequest, NextResponse } from 'next/server';

// // Mock CNN model prediction function
// function predictMammogram(imageBuffer: Buffer) {
//   // Simulate CNN processing time
//   const processingDelay = Math.random() * 2000 + 1000; // 1-3 seconds

//   // Mock image analysis based on buffer size and some random factors
//   const imageSize = imageBuffer.length;
//   const hashSum = imageBuffer.reduce((sum, byte, index) => sum + byte * (index % 10), 0);
  
//   // Create pseudo-random but deterministic prediction
//   const normalizedHash = (hashSum % 10000) / 10000;
//   const sizeInfluence = Math.min(1, imageSize / (1024 * 1024)); // MB influence
  
//   const riskScore = (normalizedHash * 0.7) + (sizeInfluence * 0.3);
//   const isMalignant = riskScore > 0.55; // Slightly higher threshold for images
  
//   const confidence = isMalignant 
//     ? 60 + (riskScore - 0.55) * 80
//     : 60 + (0.55 - riskScore) * 80;

//   return {
//     prediction: isMalignant ? 'malignant' : 'benign',
//     confidence: Math.min(96, Math.max(65, confidence)), // Realistic confidence range for images
//     processingTime: processingDelay
//   };
// }

// export async function POST(request: NextRequest) {
//   try {
//     const formData = await request.formData();
//     const file = formData.get('image') as File;

//     if (!file) {
//       return NextResponse.json(
//         { error: 'No image file provided' },
//         { status: 400 }
//       );
//     }

//     // Validate file type
//     if (!file.type.startsWith('image/')) {
//       return NextResponse.json(
//         { error: 'Invalid file type. Please upload an image.' },
//         { status: 400 }
//       );
//     }

//     // Validate file size (10MB limit)
//     if (file.size > 10 * 1024 * 1024) {
//       return NextResponse.json(
//         { error: 'File too large. Maximum size is 10MB.' },
//         { status: 400 }
//       );
//     }

//     // Convert file to buffer for processing
//     const arrayBuffer = await file.arrayBuffer();
//     const buffer = Buffer.from(arrayBuffer);

//     // Run CNN prediction
//     const prediction = predictMammogram(buffer);

//     // Create prediction result
//     const result = {
//       id: `img-pred-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
//       type: 'image',
//       prediction: prediction.prediction,
//       confidence: prediction.confidence,
//       inputData: {
//         fileName: file.name,
//         fileSize: file.size,
//         fileType: file.type
//       },
//       modelMetrics: {
//         accuracy: 94.2,
//         precision: 93.1,
//         recall: 95.3,
//         f1Score: 94.2
//       },
//       timestamp: new Date().toISOString(),
//       userId: 'current-user'
//     };

//     // Simulate processing time
//     await new Promise(resolve => setTimeout(resolve, Math.min(3000, prediction.processingTime)));

//     return NextResponse.json({
//       success: true,
//       predictionId: result.id,
//       result
//     });
//   } catch (error) {
//     console.error('Image prediction error:', error);
//     return NextResponse.json(
//       { error: 'Image analysis failed' },
//       { status: 500 }
//     );
//   }
// }
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const res = await fetch("http://127.0.0.1:8000/predict/image", {
      method: "POST",
      body: formData, // Forward directly
    });

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error("Error in image proxy:", err);
    return NextResponse.json({ error: "Image prediction failed" }, { status: 500 });
  }
}
