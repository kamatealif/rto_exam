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

const Signup = () => {
  const form = useForm();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async (data) => {
    setIsLoading(true);
    setError("");

    console.log("Form submitted", data); // Debug log

    // Basic validation
    if (!data.email || !data.password || !data.name) {
      setError("Name, email, and password are required");
      setIsLoading(false);
      return;
    }

    try {
      const auth = new authService();
      const response = await auth.createAccount({
        email: data.email,
        password: data.password,
        name: data.name,
      });
      // Handle successful signup response
      console.log("Signup successful:", response);
    } catch (error) {
      setError(error.message || "An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-6">
      <Form {...form} onSubmit={form.handleSubmit(handleSignup)}>
        {/* General Error Message */}
        {error && <div className="text-red-500 mb-4">{error}</div>}

        <FormField name="name" control={form.control}>
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input type="text" placeholder="Enter your name" />
            </FormControl>
          </FormItem>
        </FormField>

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
          {isLoading ? "Loading..." : "Sign Up"}
        </Button>
      </Form>

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
