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
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
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
        // Clear form fields
        setEmail('');
        setPassword('');
        setError('');
        router.push('/admin/questions');
      } else {
        setError('You do not have admin access.');
      }
    } catch (error) {
      if (error.message.includes('Rate limit')) {
        setError('Too many login attempts. Please wait a few minutes and try again.');
      } else {
        setError('Login failed. Please check your credentials.');
      }
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex w-1/3 m-auto items-center justify-cente py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6">
        <h1 className="text-2xl font-bold text-center">Admin Login</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          {error && (
            <div className="bg-destructive/10 text-destructive rounded-md p-4 mb-4">
              <div className="text-sm">{error}</div>
            </div>
          )}
          <div className="space-y-2">
            <Label>Email address</Label>
            <Input
              type="email"
              required
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              suppressHydrationWarning
            />
          </div>
          <div className="space-y-2">
            <Label>Password</Label>
            <Input
              type="password"
              required
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              suppressHydrationWarning
            />
          </div>
          <Button className="w-full" disabled={isLoading}>
            {isLoading ? 'Signing in...' : 'Sign in'}
          </Button>
        </form>
      </div>
    </div>
  );
}
