'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Client } from 'appwrite';
import { appwriteConfig } from '../../appwrite.config';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Account } from 'appwrite';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const client = new Client();
      client
        .setEndpoint(appwriteConfig.endpoint)
        .setProject(appwriteConfig.projectId);

      const account = new Account(client);
      const session = await account.createSession(email, password);

      // Get user data
      const user = await account.get();
      
      // Check if user has admin role
      if (user.$id && user.prefs?.roles?.includes('admin')) {
        router.push('/admin/questions');
      } else {
        setError('You do not have admin access.');
      }
    } catch (error) {
      setError('Login failed. Please check your credentials.');
      console.error('Login error:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6">
        <h1 className="text-2xl font-bold text-center">Admin Login</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          {error && (
            <div className="bg-destructive/10 text-destructive rounded-md p-4 mb-4">
              <div className="text-sm">{error}</div>
            </div>
          )}
          <div>
            <Label>Email address</Label>
            <Input
              type="email"
              required
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <Label>Password</Label>
            <Input
              type="password"
              required
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button className="w-full">
            Sign in
          </Button>
        </form>
      </div>
    </div>
  );
}
