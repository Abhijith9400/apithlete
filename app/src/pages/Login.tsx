
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { LogIn } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import Header from '@/components/Header';
import { toast } from 'sonner';

const Login = () => {
  const [secretCode, setSecretCode] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (login(secretCode)) {
      toast.success('Login successful!');
      navigate('/');
    } else {
      setError('Invalid secret code. Please try again.');
      toast.error('Login failed. Invalid secret code.');
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
                  Secret Code
                </label>
                <Input
                  id="secretCode"
                  type="password"
                  placeholder="Enter your secret code"
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
