"use client";
import { useState } from "react";
import authService from "@/lib/server/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Login = () => {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    if (!form.email || !form.password) {
      setError("Email and password are required");
      setIsLoading(false);
      return;
    }
    try {
      await authService.login({
        email: form.email,
        password: form.password,
      });
      router.push("/admin/questions");
    } catch (error) {
      setError(error.message || JSON.stringify(error) || "An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-6">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-sm">
        {error && <div className="text-red-500 mb-2">{error}</div>}
        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="font-medium">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="border rounded px-3 py-2 focus:outline-none focus:ring w-full"
            autoComplete="email"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="password" className="font-medium">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Enter your password"
            className="border rounded px-3 py-2 focus:outline-none focus:ring w-full"
            autoComplete="current-password"
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className={`self-center bg-blue-600 text-white px-6 py-2 rounded mt-2 ${isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"}`}
        >
          {isLoading ? "Loading..." : "Login"}
        </button>
      </form>
      <p className="text-sm">
        Don&apos;t have an account? <Link href="/signup" className="text-blue-500">Sign up</Link>
      </p>
    </div>
  );
};

export default Login;
