
import React, { useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, LogIn, LogOut } from "lucide-react";
import { motion } from 'framer-motion';

interface MemberDisplayProps {
  member: {
    id: string;
    name: string;
    membership: string;
    status: string;
  };
  isCheckin: boolean;
  onReset: () => void;
}

const MemberDisplay: React.FC<MemberDisplayProps> = ({ member, isCheckin, onReset }) => {
  const currentTime = new Date().toLocaleTimeString();
  const currentDate = new Date().toLocaleDateString();
  
  // Automatically navigate back to scanning screen after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      onReset();
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [onReset]);

  return (
    <motion.div 
      className="fixed inset-0 z-30 flex items-center justify-center bg-black/50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div 
        className="flex flex-col items-center max-w-md w-full mx-4 animate-in fade-in duration-500"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      >
        <div className="mb-8 flex flex-col items-center">
          <div className={`h-24 w-24 rounded-full ${isCheckin ? 'bg-athgreen/20' : 'bg-red-500/20'} flex items-center justify-center mb-4`}>
            {isCheckin ? (
              <LogIn className="h-12 w-12 text-athgreen animate-pulse-success" />
            ) : (
              <LogOut className="h-12 w-12 text-red-500 animate-pulse-success" />
            )}
          </div>
          <h2 className={`text-2xl font-bold ${isCheckin ? 'text-athgreen' : 'text-red-500'}`}>
            {isCheckin ? 'Check-in Successful' : 'Check-out Successful'}
          </h2>
        </div>

        <Card className={`w-full border-2 ${isCheckin ? 'border-athgreen/20' : 'border-red-500/20'}`}>
          <CardHeader className={`bg-gradient-to-r ${isCheckin ? 'from-athgreen to-athgreen/70' : 'from-red-500 to-red-400'} text-white`}>
            <CardTitle className="text-xl">Member Information</CardTitle>
            <CardDescription className="text-white/80">
              {isCheckin ? 'Check-in successful' : 'Check-out successful'}
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid gap-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Name:</span>
                <span className="font-medium">{member.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">ID:</span>
                <span className="font-medium">{member.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Membership:</span>
                <span className="font-medium">{member.membership}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Status:</span>
                <span className="font-medium text-athgreen">Active</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col border-t bg-muted/50 px-6 py-4">
            <div className="flex flex-col w-full text-sm text-muted-foreground">
              <div className="flex justify-between w-full">
                <span>{isCheckin ? 'Check-in Time:' : 'Check-out Time:'}</span>
                <span>{currentTime}</span>
              </div>
              <div className="flex justify-between w-full">
                <span>Date:</span>
                <span>{currentDate}</span>
              </div>
            </div>
          </CardFooter>
        </Card>

        <Button onClick={onReset} className={`mt-6 ${isCheckin ? 'bg-athgreen hover:bg-athgreen/90' : 'bg-red-500 hover:bg-red-600'}`}>
          <Check className="mr-2 h-4 w-4" /> Continue
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default MemberDisplay;
