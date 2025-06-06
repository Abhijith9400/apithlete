import React from 'react';
import { LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
      toast.error('No active session found.');
      navigate('/login');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/secret/admin/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ secretKey: token })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Logout failed');
      }

      toast.success('Logged out successfully!');
    } catch (error: any) {
      toast.error(error.message || 'Logout failed');
    } finally {
      localStorage.removeItem('token');
      navigate('/login');
    }
  };

  return (
    <header className="w-full bg-[#04bc64] py-4 px-6">
      <div className="container mx-auto flex flex-col items-center justify-between sm:flex-row">
        <div className="flex items-center">
          <img
            src="/Access Control.png"
            alt="APIthlete logo"
            className="h-20 w-50 object-contain"
          />
        </div>

        <div className="flex items-center gap-4">
          <Button
          variant="ghost"
          className="text-white hover:bg-white/20 hover:text-white"
          onClick={() => navigate('/logout')}
           >
          <LogOut className="h-5 w-5 mr-1" />
          Logout
</Button>


          <div className="text-sm font-medium text-white/80">
            Powered by{' '}
            <a
              href="https://www.webgeon.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold underline hover:text-white"
            >
              Webgeon Results
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
