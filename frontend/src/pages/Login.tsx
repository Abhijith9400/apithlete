import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { LogIn } from 'lucide-react';
import Header from '@/components/Header';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/useAuth'; // Import your auth hook

const Login = () => {
  const [secretCode, setSecretCode] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth(); // Get login function from context

  // API call to backend
  const loginAdminWithSecretKey = async (secretKey: string) => {
    const response = await fetch('http://localhost:5000/api/secret/admin/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ secretKey }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Login failed');
    }

    return await response.json();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!secretCode.trim()) {
      setError('Secret key is required');
      return;
    }

    try {
      const data = await loginAdminWithSecretKey(secretCode);
      localStorage.setItem('token', data.token); // Store token
      login(); // Update auth context state
      toast.success('Login successful!');
      navigate('/', { replace: true }); // Redirect to home page
    } catch (err: any) {
      const message = err.message || 'Login failed. Please try again.';
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
            <CardTitle className="text-2xl font-bold">Admin Login</CardTitle>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="pt-6 pb-2 space-y-4">
              {error && (
                <Alert variant="destructive" className="mb-4">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              <div className="space-y-2">
                <label htmlFor="secretCode" className="text-sm font-medium">
                  Secret Key
                </label>
                <Input
                  id="secretCode"
                  type="password"
                  placeholder="Enter your secret key"
                  value={secretCode}
                  onChange={(e) => setSecretCode(e.target.value)}
                  className="w-full"
                  required
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-center pb-6 pt-2">
              <Button
                type="submit"
                className="w-full bg-athgreen hover:bg-athgreen/90 text-white"
                disabled={!secretCode.trim()}
              >
                <LogIn className="w-4 h-4 mr-2" />
                Login
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

export default Login;
