"use client";
import { useState } from "react";
import authService from "@/lib/server/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Signup = () => {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    if (!form.name || !form.email || !form.password) {
      setError("Name, email, and password are required");
      setIsLoading(false);
      return;
    }
    try {
      try {
        // Try to create the account
        await authService.createAccount({
          name: form.name,
          email: form.email,
          password: form.password,
        });
        // If successful, user is logged in and redirected
        router.push("/admin/questions");
      } catch (error) {
        // If user already exists, try to login
        if (
          error?.message?.toLowerCase().includes("already") ||
          error?.code === 409
        ) {
          try {
            await authService.login({
              email: form.email,
              password: form.password,
            });
            router.push("/admin/questions");
            return;
          } catch (loginError) {
            setError(
              "Account already exists. Please check your password or try logging in."
            );
            setIsLoading(false);
            return;
          }
        } else {
          throw error;
        }
      }
    } catch (error) {
      setError(error.message || "An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-6">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-full max-w-sm"
      >
        {error && <div className="text-red-500 mb-2">{error}</div>}
        <div className="flex flex-col gap-1">
          <label htmlFor="name" className="font-medium">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter your name"
            className="border rounded px-3 py-2 focus:outline-none focus:ring w-full"
            autoComplete="name"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="font-medium">
            Email
          </label>
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
          <label htmlFor="password" className="font-medium">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Enter your password"
            className="border rounded px-3 py-2 focus:outline-none focus:ring w-full"
            autoComplete="new-password"
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className={`self-center bg-blue-600 text-white px-6 py-2 rounded mt-2 ${
            isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
          }`}
        >
          {isLoading ? "Loading..." : "Sign Up"}
        </button>
      </form>
      <p className="text-sm">
        Already have an account?{" "}
        <Link href="/login" className="text-blue-500">
          Log in
        </Link>
      </p>
    </div>
  );
};

export default Signup;
