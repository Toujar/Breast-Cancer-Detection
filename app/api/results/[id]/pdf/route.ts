// // import { NextRequest, NextResponse } from 'next/server';
// // import connectDB from '@/lib/mongodb';
// // import Result from '@/models/Result';
// // // @ts-ignore - jsonwebtoken has no bundled types in this project
// // import jwt from 'jsonwebtoken';
// // import { requireUser } from '../../../_utils/auth-utils';

// // export async function GET(
// //   request: NextRequest,
// //   { params }: { params: { id: string } }
// // ) {
// //   try {
// //     const id = params.id;

// //     // Auth: allow either owner/admin or a valid share token
// //     const token = request.nextUrl.searchParams.get('token');
// //     let authedUser: any | null = null;
// //     if (!token) {
// //       authedUser = requireUser();
// //     }

// //     await connectDB();
// //     const doc: any = await Result.findOne({ predictionId: id }).lean();
// //     if (!doc) {
// //       return NextResponse.json({ error: 'Result not found' }, { status: 404 });
// //     }

// //     if (token) {
// //       try {
// //         const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
// //         if (decoded.predictionId !== id) {
// //           return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
// //         }
// //       } catch {
// //         return NextResponse.json({ error: 'Invalid or expired token' }, { status: 403 });
// //       }
// //     } else if (authedUser) {
// //       if (authedUser.role !== 'admin' && String(doc.userId) !== String(authedUser.id || authedUser._id)) {
// //         return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
// //       }
// //     }

// //     // Simple text-based PDF content (placeholder). For production, render an actual PDF.
// //     const lines = [
// //       'BREAST CANCER AI DETECTION REPORT',
// //       '=================================',
// //       '',
// //       `Prediction ID: ${doc.predictionId}`,
// //       `Generated: ${new Date(doc.timestamp || doc.createdAt).toLocaleString()}`,
// //       '',
// //       'ANALYSIS RESULTS:',
// //       `- Classification: ${doc.prediction}`,
// //       `- Confidence Score: ${doc.confidence}%`,
// //       `- Analysis Type: ${doc.type === 'tabular' ? 'Data Analysis' : 'Image Analysis'}`,
// //       '',
// //       'MODEL METRICS:',
// //       `- Accuracy: ${doc?.modelMetrics?.accuracy ?? 'N/A'}%`,
// //       `- Precision: ${doc?.modelMetrics?.precision ?? 'N/A'}%`,
// //       `- Recall: ${doc?.modelMetrics?.recall ?? 'N/A'}%`,
// //       `- F1-Score: ${doc?.modelMetrics?.f1Score ?? 'N/A'}%`,
// //       '',
// //       'CLINICAL INTERPRETATION:',
// //       'This AI analysis is intended as a screening tool to assist healthcare professionals.',
// //       'It should not be used as the sole basis for diagnosis or treatment.',
// //     ];

// //     const reportContent = lines.join('\n');
// //     return new NextResponse(reportContent, {
// //       headers: {
// //         'Content-Type': 'application/pdf',
// //         'Content-Disposition': `attachment; filename="breast-cancer-analysis-${id}.pdf"`
// //       }
// //     });
// //   } catch (error) {
// //     return NextResponse.json(
// //       { error: 'Failed to generate PDF' },
// //       { status: 500 }
// //     );
// //   }
// // }
// import { NextRequest, NextResponse } from 'next/server';
// import connectDB from '@/lib/mongodb';
// import Result from '@/models/Result';
// // @ts-ignore - jsonwebtoken has no bundled types in this project
// import jwt from 'jsonwebtoken';
// import { requireUser } from '../../../_utils/auth-utils';
// import PDFDocument from 'pdfkit';
// import { Readable } from 'stream';

// export async function GET(
//   request: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     const id = params.id;

//     // Auth: allow either owner/admin or a valid share token
//     const token = request.nextUrl.searchParams.get('token');
//     let authedUser: any | null = null;
//     if (!token) {
//       authedUser = requireUser();
//     }

//     await connectDB();
//     const doc: any = await Result.findOne({ predictionId: id }).lean();
//     if (!doc) {
//       return NextResponse.json({ error: 'Result not found' }, { status: 404 });
//     }

//     if (token) {
//       try {
//         const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
//         if (decoded.predictionId !== id) {
//           return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
//         }
//       } catch {
//         return NextResponse.json({ error: 'Invalid or expired token' }, { status: 403 });
//       }
//     } else if (authedUser) {
//       if (
//         authedUser.role !== 'admin' &&
//         String(doc.userId) !== String(authedUser.id || authedUser._id)
//       ) {
//         return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
//       }
//     }

//     // Generate a real PDF using pdfkit
//     const pdfStream = new PDFDocument({ margin: 50 });
//     const chunks: Buffer[] = [];

//     pdfStream.on('data', (chunk) => chunks.push(chunk));
//     pdfStream.on('end', () => {});

//     // Title
//     pdfStream.fontSize(20).text('BREAST CANCER AI DETECTION REPORT', { align: 'center' });
//     pdfStream.moveDown();

//     // Info
//     pdfStream.fontSize(12).text(`Prediction ID: ${doc.predictionId}`);
//     pdfStream.text(`Generated: ${new Date(doc.timestamp || doc.createdAt).toLocaleString()}`);
//     pdfStream.moveDown();

//     // Results
//     pdfStream.fontSize(14).text('ANALYSIS RESULTS:', { underline: true });
//     pdfStream.fontSize(12).text(`- Classification: ${doc.prediction}`);
//     pdfStream.text(`- Confidence Score: ${doc.confidence}%`);
//     pdfStream.text(`- Analysis Type: ${doc.type === 'tabular' ? 'Data Analysis' : 'Image Analysis'}`);
//     pdfStream.moveDown();

//     // Metrics
//     pdfStream.fontSize(14).text('MODEL METRICS:', { underline: true });
//     pdfStream.fontSize(12).text(`- Accuracy: ${doc?.modelMetrics?.accuracy ?? 'N/A'}%`);
//     pdfStream.text(`- Precision: ${doc?.modelMetrics?.precision ?? 'N/A'}%`);
//     pdfStream.text(`- Recall: ${doc?.modelMetrics?.recall ?? 'N/A'}%`);
//     pdfStream.text(`- F1-Score: ${doc?.modelMetrics?.f1Score ?? 'N/A'}%`);
//     pdfStream.moveDown();

//     // Disclaimer
//     pdfStream.fontSize(14).text('CLINICAL INTERPRETATION:', { underline: true });
//     pdfStream.fontSize(12).text(
//       'This AI analysis is intended as a screening tool to assist healthcare professionals. ' +
//       'It should not be used as the sole basis for diagnosis or treatment.'
//     );

//     pdfStream.end();

//     const buffer = await new Promise<Buffer>((resolve, reject) => {
//       const bufs: Buffer[] = [];
//       pdfStream.on('data', (d) => bufs.push(d));
//       pdfStream.on('end', () => resolve(Buffer.concat(bufs)));
//       pdfStream.on('error', reject);
//     });

//     return new NextResponse(buffer, {
//       headers: {
//         'Content-Type': 'application/pdf',
//         'Content-Disposition': `attachment; filename="breast-cancer-analysis-${id}.pdf"`,
//       },
//     });
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json({ error: 'Failed to generate PDF' }, { status: 500 });
//   }
// }
import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Result from "@/models/Result";
// @ts-ignore - jsonwebtoken has no bundled types in this project
import jwt from "jsonwebtoken";
import { requireUser } from "../../../_utils/auth-utils";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;

    // Auth: allow either owner/admin or a valid share token
    const token = request.nextUrl.searchParams.get("token");
    let authedUser: any | null = null;
    if (!token) {
      authedUser = requireUser();
    }

    await connectDB();
    const doc: any = await Result.findOne({ predictionId: id }).lean();
    if (!doc) {
      return NextResponse.json({ error: "Result not found" }, { status: 404 });
    }

    if (token) {
      try {
        const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
        if (decoded.predictionId !== id) {
          return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }
      } catch {
        return NextResponse.json(
          { error: "Invalid or expired token" },
          { status: 403 }
        );
      }
    } else if (authedUser) {
      if (
        authedUser.role !== "admin" &&
        String(doc.userId) !== String(authedUser.id || authedUser._id)
      ) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
      }
    }

    // Create PDF with pdf-lib
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 800]);
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

    const { height } = page.getSize();
    let y = height - 50;

    const drawLine = (text: string, size = 12, color = rgb(0, 0, 0)) => {
      page.drawText(text, { x: 50, y, size, font, color });
      y -= size + 8;
    };

    // Title
    drawLine("BREAST CANCER AI DETECTION REPORT", 18);
    y -= 10;
    page.drawLine({
      start: { x: 50, y },
      end: { x: 550, y },
      thickness: 1,
      color: rgb(0, 0, 0),
    });
    y -= 30;

    // Info
    drawLine(`Prediction ID: ${doc.predictionId}`);
    drawLine(
      `Generated: ${new Date(
        doc.timestamp || doc.createdAt
      ).toLocaleString()}`
    );
    y -= 20;

    // Results
    drawLine("ANALYSIS RESULTS:", 14);
    drawLine(`- Classification: ${doc.prediction}`);
    drawLine(`- Confidence Score: ${doc.confidence}%`);
    drawLine(
      `- Analysis Type: ${
        doc.type === "tabular" ? "Data Analysis" : "Image Analysis"
      }`
    );
    y -= 20;

    // Metrics
    drawLine("MODEL METRICS:", 14);
    drawLine(`- Accuracy: ${doc?.modelMetrics?.accuracy ?? "N/A"}%`);
    drawLine(`- Precision: ${doc?.modelMetrics?.precision ?? "N/A"}%`);
    drawLine(`- Recall: ${doc?.modelMetrics?.recall ?? "N/A"}%`);
    drawLine(`- F1-Score: ${doc?.modelMetrics?.f1Score ?? "N/A"}%`);
    y -= 20;

    // Disclaimer
    drawLine("CLINICAL INTERPRETATION:", 14, rgb(0.8, 0, 0));
    drawLine(
      "This AI analysis is intended as a screening tool to assist healthcare professionals."
    );
    drawLine(
      "It should not be used as the sole basis for diagnosis or treatment."
    );

    // Finalize PDF
    const pdfBytes = await pdfDoc.save();

    return new NextResponse(Buffer.from(pdfBytes), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="breast-cancer-analysis-${id}.pdf"`,
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to generate PDF" },
      { status: 500 }
    );
  }
}
