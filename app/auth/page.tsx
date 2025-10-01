"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // ✅ add this

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [age, setAge] = useState<number | "">("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter(); // ✅ init router

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    const endpoint = isLogin ? "/api/auth/login" : "/api/auth/signup";

    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(
        isLogin
          ? { email, password }
          : { username, email, password, age: age === "" ? undefined : Number(age), phoneNumber }
      ),
    });

    const data = await res.json();

    if (res.ok) {
      try {
        const meRes = await fetch("/api/auth/me", { credentials: "include" });
        const meData = await meRes.json();
        const role = meData?.user?.role;
        if (role === "admin") {
          router.push("/admin");
        } else {
          router.push("/dashboard");
        }
      } catch {
        // Fallback if /me fails
        router.push("/dashboard");
      }
    } else {
      setMessage(data.message || data.error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-yellow-50">
  <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md relative overflow-hidden">
    {/* Decorative gradient circle */}
    <div className="absolute -top-16 -right-16 w-56 h-56 bg-gradient-to-tr from-pink-400 via-purple-400 to-indigo-500 rounded-full opacity-30 animate-pulse-slow blur-3xl"></div>

    <div className="text-center mb-6 relative z-10">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
        {isLogin ? "Login" : "Sign Up"}
      </h1>
      <p className="text-sm text-gray-600">
        {isLogin 
          ? "Sign in to your account" 
          : "Create a new account to get started"
        }
      </p>
    </div>

    <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
      {!isLogin && (
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-400 focus:border-transparent transition"
          required
        />
      )}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent transition"
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
        required
      />
      {!isLogin && (
        <>
          <input
            type="number"
            placeholder="Age (optional)"
            value={age}
            onChange={(e) => setAge(e.target.value === "" ? "" : Number(e.target.value))}
            className="w-full p-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-400 focus:border-transparent transition"
            min={0}
            max={120}
          />
          <input
            type="tel"
            placeholder="Phone Number (optional)"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="w-full p-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition"
          />
        </>
      )}
      <button
        type="submit"
        className="w-full py-3 rounded-xl bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600 text-white font-semibold shadow-lg hover:scale-105 transform transition-all"
      >
        {isLogin ? "Login" : "Sign Up"}
      </button>
    </form>

    <div className="mt-6 space-y-4 relative z-10">
      <p className="text-center text-sm text-gray-600">
        {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
        <button
          onClick={() => setIsLogin(!isLogin)}
          className="text-pink-500 font-semibold hover:text-pink-600 transition"
        >
          {isLogin ? "Sign Up" : "Login"}
        </button>
      </p>
    </div>

    {message && <p className="mt-4 text-center text-red-500 relative z-10">{message}</p>}
  </div>
</div>

  );
}
