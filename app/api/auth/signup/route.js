// // import { NextResponse } from 'next/server';
// // import bcrypt from 'bcryptjs';
// // import jwt from 'jsonwebtoken';
// // import connectDB from '@/lib/mongodb';
// // import User from '@/models/User';

// // const JWT_SECRET = process.env.JWT_SECRET; // no "!"

// // export async function POST(req) {
// //   try {
// //     await connectDB();
// //     const { name, email, password } = await req.json();

// //     if (!name || !email || !password) {
// //       return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
// //     }

// //     // Check if user already exists
// //     const existing = await User.findOne({ email });
// //     if (existing) {
// //       return NextResponse.json({ error: 'User already exists' }, { status: 409 });
// //     }

// //     // Hash password
// //     const hashedPassword = await bcrypt.hash(password, 10);

// //     // Create user
// //     const user = await User.create({
// //       name,
// //       email,
// //       password: hashedPassword,
// //       role: 'user',
// //     });

// //     // Generate JWT
// //     const token = jwt.sign(
// //       { userId: user._id.toString(), email: user.email, role: user.role },
// //       JWT_SECRET,
// //       { expiresIn: '7d' }
// //     );

// //     // Set cookie
// //     const response = NextResponse.json({
// //       user: { id: user._id.toString(), name: user.name, email: user.email, role: user.role },
// //     });

// //     response.cookies.set('auth-token', token, {
// //       httpOnly: true,
// //       secure: process.env.NODE_ENV === 'production',
// //       path: '/',
// //       maxAge: 60 * 60 * 24 * 7, // 7 days
// //     });

// //     return response;
// //   } catch (err) {
// //     console.error('Signup error:', err);
// //     return NextResponse.json({ error: 'Server error' }, { status: 500 });
// //   }
// // }
// import { NextResponse } from "next/server";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import connectDB from "@/lib/mongodb";
// import User from "@/models/User";

// export async function POST(req) {
//   try {
//     await connectDB();

//     const { name, email, password } = await req.json();

//     // Check if user already exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return NextResponse.json(
//         { error: "User already exists" },
//         { status: 409 } // Conflict
//       );
//     }

//     // Hash password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create new user
//     const newUser = await User.create({
//       name,
//       email,
//       password: hashedPassword,
//     });

//     // Create JWT token
//     const token = jwt.sign(
//       { id: newUser._id, email: newUser.email },
//       process.env.JWT_SECRET,
//       { expiresIn: "7d" }
//     );

//     const response = NextResponse.json({
//       user: { id: newUser._id, name: newUser.name, email: newUser.email },
//     });

//     // Set token cookie
//     response.cookies.set("token", token, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       sameSite: "lax",
//       path: "/",
//     });

//     return response;
//   } catch (err) {
//     console.error("Signup error:", err);
//     return NextResponse.json({ error: "Server error" }, { status: 500 });
//   }
// }
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(req) {
  try {
    await connectDB();
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password required" }, { status: 400 });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({ email, password: hashedPassword });

    return NextResponse.json({ message: "Signup successful" }, { status: 201 });
  } catch (err) {
    console.error("Signup error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
