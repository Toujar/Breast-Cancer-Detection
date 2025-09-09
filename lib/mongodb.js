// // // import mongoose from "mongoose";

// // // const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/phase2";

// // // if (!MONGODB_URI) {
// // //   throw new Error("⚠️ Please define MONGODB_URI in .env.local");
// // // }

// // // let isConnected = false;

// // // export const connectDB = async () => {
// // //   if (isConnected) return;

// // //   try {
// // //     await mongoose.connect(MONGODB_URI, {
// // //       useNewUrlParser: true,
// // //       useUnifiedTopology: true,
// // //     });
// // //     isConnected = true;
// // //     console.log("✅ MongoDB connected");
// // //   } catch (err) {
// // //     console.error("❌ MongoDB connection error:", err);
// // //   }
// // // };
// // import mongoose from "mongoose";

// // const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/phase2";

// // if (!MONGODB_URI) {
// //   throw new Error("⚠️ Please define the MONGODB_URI in .env.local");
// // }

// // let isConnected = false;

// // export const connectDB = async () => {
// //   if (isConnected) return;

// //   try {
// //     await mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
// //     isConnected = true;
// //     console.log("✅ MongoDB Connected");
// //   } catch (err) {
// //     console.error("❌ MongoDB Error:", err);
// //   }
// // };
// // lib/mongodb.js
// import mongoose from "mongoose";

// const MONGODB_URI = process.env.MONGODB_URI;

// if (!MONGODB_URI) {
//   throw new Error("Please add MONGODB_URI to your .env file");
// }

// let cached = global.mongoose;
// if (!cached) {
//   cached = global.mongoose = { conn: null, promise: null };
// }

// export async function connectDB() {
//   if (cached.conn) return cached.conn;

//   if (!cached.promise) {
//     cached.promise = mongoose.connect(MONGODB_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     }).then((mongoose) => mongoose);
//   }
//   cached.conn = await cached.promise;
//   return cached.conn;
// }
// lib/mongodb.js
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
}

/**
 * Global is used here to maintain a cached connection across hot reloads in development.
 */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }).then((mongoose) => mongoose);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectDB;
