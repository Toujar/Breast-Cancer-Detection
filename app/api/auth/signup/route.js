import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(req) {
  try {
    await connectDB();
    const { username, email, password, age, phoneNumber, role } = await req.json();

    if (!username || !email || !password) {
      return NextResponse.json({ error: "Username, email and password required" }, { status: 400 });
    }

    const normalizedEmail = email.toLowerCase();

    const existingUser = await User.findOne({
      $or: [{ email: normalizedEmail }, { username }],
    });
    if (existingUser) {
      return NextResponse.json({ error: "User with email or username already exists" }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const isAdmin = normalizedEmail === 'admin@gmail.com';

    // Enforce single admin credentials as specified
    const enforcedAge = isAdmin ? 24 : (typeof age === "number" ? age : undefined);
    const enforcedPhone = isAdmin ? '1234567890' : phoneNumber;
    const enforcedRole = isAdmin ? 'admin' : 'user';

    const newUser = await User.create({
      username: isAdmin ? 'Admin' : username,
      email: normalizedEmail,
      password: hashedPassword,
      age: enforcedAge,
      phoneNumber: enforcedPhone,
      role: enforcedRole,
    });

    const token = jwt.sign(
      { id: newUser._id, email: newUser.email, username: newUser.username, role: newUser.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    const response = NextResponse.json(
      {
        message: "Signup successful",
        user: {
          id: newUser._id,
          email: newUser.email,
          username: newUser.username,
          age: newUser.age,
          phoneNumber: newUser.phoneNumber,
          role: newUser.role,
        },
      },
      { status: 201 }
    );

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (err) {
    console.error("Signup error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
