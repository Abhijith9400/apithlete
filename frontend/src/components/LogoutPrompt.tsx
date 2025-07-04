import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { LogOut } from 'lucide-react';
import Header from '@/components/Header';
import { toast } from 'sonner';

const LogoutPrompt = () => {
  const [secretKey, setSecretKey] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogout = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!secretKey.trim()) {
      setError('Secret key is required');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/secret/admin/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ secretKey }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Logout failed');
      }

      // Success
      localStorage.removeItem('token');
      toast.success('Logout successful!');
      navigate('/login');
    } catch (err: any) {
      const message = err.message || 'Logout failed. Please try again.';
      setError(message);
      toast.error(message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1 container mx-auto flex items-center justify-center px-4 py-8">
        <Card className="w-full max-w-md shadow-lg border-athgreen/20">
          <CardHeader className="bg-gradient-to-r from-athgreen to-athgreen/70 text-white text-center py-6">
            <CardTitle className="text-2xl font-bold">Admin Logout</CardTitle>
          </CardHeader>
          <form onSubmit={handleLogout}>
            <CardContent className="pt-6 pb-2 space-y-4">
              {error && (
                <Alert variant="destructive" className="mb-4">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              <div className="space-y-2">
                <label htmlFor="secretKey" className="text-sm font-medium">
                  Confirm Secret Key
                </label>
                <Input
                  id="secretKey"
                  type="password"
                  placeholder="Enter your secret key"
                  value={secretKey}
                  onChange={(e) => setSecretKey(e.target.value)}
                  required
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-center pb-6 pt-2">
              <Button
                type="submit"
                className="w-full bg-athgreen hover:bg-athgreen/90 text-white"
                disabled={!secretKey.trim()}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Confirm Logout
              </Button>
            </CardFooter>
          </form>
        </Card>
      </main>
      <footer className="bg-athgreen text-white py-4 text-center text-sm">
        <div className="container mx-auto space-y-1">
          <p>© {new Date().getFullYear()} APIthlete Access Control System</p>
          <div className="text-sm font-medium text-white/80">
            Powered by{' '}
            <a
              href="https://webgeon.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold underline hover:text-white"
            >
              Webgeon Results
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LogoutPrompt;
