
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

const LogoutPrompt: React.FC = () => {
  const [secretCode, setSecretCode] = useState('');
  const { showSecretPrompt, setShowSecretPrompt, verifySecretCode, logout } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (verifySecretCode(secretCode)) {
      logout();
      toast.success('Logout successful');
    } else {
      toast.error('Invalid secret code. Logout failed.');
    }
    
    setSecretCode('');
  };

  return (
    <Dialog open={showSecretPrompt} onOpenChange={setShowSecretPrompt}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Enter Admin Secret Code</DialogTitle>
          <DialogDescription>
            Please enter the secret code to confirm logout
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="py-4">
          <Input
            type="password"
            placeholder="Secret Code"
            value={secretCode}
            onChange={(e) => setSecretCode(e.target.value)}
            className="mb-4"
            autoFocus
          />
          
          <DialogFooter className="sm:justify-between">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setShowSecretPrompt(false)}
            >
              Cancel
            </Button>
            <Button type="submit" className="bg-athgreen hover:bg-athgreen/90">
              Confirm Logout
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default LogoutPrompt;
