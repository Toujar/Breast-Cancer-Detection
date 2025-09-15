
// // // import { NextResponse } from "next/server";
// // // import bcrypt from "bcryptjs";
// // // import jwt from "jsonwebtoken";
// // // // import { connectDB } from "@/lib/mongodb";
// // // import connectDB from "@/lib/mongodb";   // ✅ correct

// // // import User from "@/models/User";

// // // export async function POST(req) {
// // //   try {
// // //     await connectDB();
// // //     const { email, password } = await req.json();

// // //     const user = await User.findOne({ email });
// // //     if (!user) {
// // //       return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
// // //     }

// // //     const isPasswordValid = await bcrypt.compare(password, user.password);
// // //     if (!isPasswordValid) {
// // //       return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
// // //     }

// // //     const token = jwt.sign(
// // //       { id: user._id, email: user.email },
// // //       process.env.JWT_SECRET,
// // //       { expiresIn: "1d" }
// // //     );

// // //     const res = NextResponse.json({ message: "Login successful" });

// // //     res.cookies.set("token", token, {
// // //       httpOnly: true,
// // //       secure: process.env.NODE_ENV === "production",
// // //       maxAge: 24 * 60 * 60,
// // //       path: "/",
// // //     });

// // //     return res;
// // //   } catch (err) {
// // //     return NextResponse.json({ error: err.message }, { status: 500 });
// // //   }
// // // }
// // import { NextResponse } from "next/server";
// // import jwt from "jsonwebtoken";
// // import connectDB from "@/lib/mongodb";
// // import User from "@/models/User";

// // export async function POST(req) {
// //   await connectDB();
// //   const { email, password } = await req.json();

// //   const user = await User.findOne({ email });
// //   if (!user) {
// //     return NextResponse.json({ error: "User not found" }, { status: 400 });
// //   }

// //   // check password here...

// //   const token = jwt.sign(
// //     { id: user._id, email: user.email },
// //     process.env.JWT_SECRET,
// //     { expiresIn: "7d" }
// //   );

// //   const res = NextResponse.json({ success: true });
// //   res.cookies.set("token", token, { httpOnly: true, path: "/" }); // ✅ consistent cookie
// //   return res;
// // }
// // app/api/auth/login/route.js
// import { NextResponse } from "next/server";
// import jwt from "jsonwebtoken";
// import connectDB from "@/lib/mongodb";
// import User from "@/models/User";
// import bcrypt from "bcryptjs";

// export async function POST(req) {
//   await connectDB();
//   const { email, password } = await req.json();

//   const user = await User.findOne({ email });
//   if (!user) {
//     return NextResponse.json({ error: "User not found" }, { status: 400 });
//   }

//   const isMatch = await bcrypt.compare(password, user.password);
//   if (!isMatch) {
//     return NextResponse.json({ error: "Invalid credentials" }, { status: 400 });
//   }

//   const token = jwt.sign(
//     { id: user._id, email: user.email },
//     process.env.JWT_SECRET,
//     { expiresIn: "7d" }
//   );

//   const res = NextResponse.json({ success: true, user: { id: user._id, email: user.email } });

//   // ✅ make sure it's "token"
//   res.cookies.set("token", token, {
//     httpOnly: true,
//      sameSite: "lax",
//     path: "/",
//     maxAge: 60 * 60 * 24 * 7,
//   });

//   return res;
// }
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(req) {
  try {
    await connectDB();
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password required" }, { status: 400 });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const isAdmin = user.email?.toLowerCase() === 'admin@gmail.com';
    const effectiveRole = isAdmin ? 'admin' : 'user';

    const token = jwt.sign(
      { id: user._id, email: user.email, username: user.username, role: effectiveRole },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    const res = NextResponse.json({ message: "Login successful" });
    res.cookies.set("token", token, { httpOnly: true, path: "/" });

    return res;
  } catch (err) {
    console.error("Login error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
