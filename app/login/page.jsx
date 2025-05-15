"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

import authService from "@/lib/server/auth";

const Login = () => {
  const form = useForm();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (data) => {
    setIsLoading(true);
    setError("");
    // Debug log
    console.log("Form submitted", data);
    // Basic validation
    if (!data.email || !data.password) {
      setError("Email and password are required");
      setIsLoading(false);
      return;
    }
    try {
      const response = await authService.login({
        email: data.email,
        password: data.password,
      });
      // Handle successful login response
      console.log("Login successful:", response);
      // Optionally redirect or show success message here
    } catch (error) {
      setError(error.message || "An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-6">
      <Form {...form} onSubmit={form.handleSubmit(handleLogin)}>
        {/* General Error Message */}
        {error && <div className="text-red-500 mb-4">{error}</div>}

        <FormField name="email" control={form.control}>
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input type="email" placeholder="Enter your email" />
            </FormControl>
          </FormItem>
        </FormField>

        <FormField name="password" control={form.control}>
          <FormItem>
            <FormLabel>Password</FormLabel>
            <FormControl>
              <Input type="password" placeholder="Enter your password" />
            </FormControl>
          </FormItem>
        </FormField>

        <Button
          type="submit"
          disabled={isLoading}
          className={`self-center ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isLoading ? "Loading..." : "Login"}
        </Button>
      </Form>

      <p className="text-sm">
        Don&apos;t have an account?{" "}
        <Link href="/signup" className="text-blue-500">
          Sign up
        </Link>
      </p>
    </div>
  );
};

export default Login;
