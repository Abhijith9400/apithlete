
import React from 'react';
import { LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';

const Header = () => {
  const { isAuthenticated, setShowSecretPrompt } = useAuth();
  
  return (
    <header className="w-full bg-[#04bc64]  py-4 px-6 ">
      <div className="container mx-auto flex flex-col items-center justify-between sm:flex-row">
        <div className="flex items-center">
         <div className="flex items-center ">
  <img
    src="/Access Control.png"
    alt="APIthlete logo"
    className="h-20 w-50 object-contain"
  />  
</div>


        </div>
        
        <div className="flex items-center gap-4">
          {isAuthenticated && (
            <Button 
              variant="ghost" 
              className="text-white hover:bg-white/20 hover:text-white"
              onClick={() => setShowSecretPrompt(true)}
            >
              <LogOut className="h-5 w-5 mr-1" />
              Logout
            </Button>
          )}
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
