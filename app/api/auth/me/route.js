// import { NextResponse } from "next/server";
// import jwt from "jsonwebtoken";

// export async function GET(req) {
//   try {
//     const token = req.cookies.get("token")?.value;
//     if (!token) {
//       return NextResponse.json({ user: null }, { status: 200 });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     return NextResponse.json({ user: decoded });
//   } catch (err) {
//     return NextResponse.json({ user: null }, { status: 200 });
//   }
// }
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(req) {
  try {
    const token = req.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json({ user: null }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    return NextResponse.json({
      user: {
        id: decoded.id,
        email: decoded.email,
        name: decoded.name || decoded.email?.split("@")[0] || "User",
      },
    });
  } catch (err) {
    return NextResponse.json({ user: null }, { status: 401 });
  }
}
