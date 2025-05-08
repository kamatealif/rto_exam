"use client";

import { account } from "@/lib/server/appwrite";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {Google} from "lucide-react"

export default function Login() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Start Google OAuth session
      const session = await account.createOAuth2Session(
        "google",
        "http://localhost:3000/admin/questions",
        "http://localhost:3000/fail"
      );

      // Get user info after successful login
      const user = await account.get();
      
      // Check if the email is allowed
      const allowedEmails = ["alipkamate83@gmail.com"]; // Add your allowed emails here
      if (!allowedEmails.includes(user.email)) {
        throw new Error("Access denied. Your email is not authorized.");
      }

    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="text-2xl font-bold mb-4">Sign in with Google</h2>
        </div>
        {error && (
          <div className="text-red-500 text-center">{error}</div>
        )}
        <Button
          onClick={handleLogin}
          className="w-full flex items-center justify-center gap-2"
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
          ) : (
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>
            </svg>
          )}
          <span>{isLoading ? "Signing in..." : "Continue with Google"}</span>
        </Button>
      </div>
    </div>
  );
}
