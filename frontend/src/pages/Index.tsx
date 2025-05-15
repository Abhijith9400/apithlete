
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import QrScanner from '@/components/QrScanner';
import MemberDisplay from '@/components/MemberDisplay';
import ManualIdInput from '@/components/ManualIdInput';
import CheckInHistory from '@/components/CheckInHistory';
import { Toaster } from "@/components/ui/sonner";
import { useAuth } from '@/hooks/useAuth';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { QrCode, IdCard } from 'lucide-react';

const Index = () => {
  const [scannedMember, setScannedMember] = useState<any>(null);
  const [isCheckin, setIsCheckin] = useState<boolean>(true);
  const [history, setHistory] = useState<any[]>([]);
  const [checkedInMembers, setCheckedInMembers] = useState<Record<string, boolean>>({});
  const { isAuthenticated } = useAuth();
  
  // Load history and checked-in members from local storage on mount
  useEffect(() => {
    const savedHistory = localStorage.getItem('checkInHistory');
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
    
    const savedCheckedIn = localStorage.getItem('checkedInMembers');
    if (savedCheckedIn) {
      setCheckedInMembers(JSON.parse(savedCheckedIn));
    }
  }, []);
  
  // Save history and checked-in members to local storage when they change
  useEffect(() => {
    localStorage.setItem('checkInHistory', JSON.stringify(history));
  }, [history]);
  
  useEffect(() => {
    localStorage.setItem('checkedInMembers', JSON.stringify(checkedInMembers));
  }, [checkedInMembers]);
  
  const handleScanSuccess = (memberData: any, isCheckinScan: boolean) => {
    setScannedMember(memberData);
    setIsCheckin(isCheckinScan);
    
    // Update checked-in status
    setCheckedInMembers(prev => ({
      ...prev,
      [memberData.id]: isCheckinScan
    }));
    
    // Add a new entry to the history
    const newEntry = {
      id: history.length + 1,
      memberId: memberData.id,
      memberName: memberData.name,
      type: isCheckinScan ? "check-in" : "check-out",
      timestamp: new Date().toISOString()
    };
    
    setHistory([newEntry, ...history]);
  };

  const handleReset = () => {
    setScannedMember(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Toaster position="top-center" />
      <Header />
      
      <main className="flex-1 container max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-athgreen mb-2">Gym Access Scanner</h1>
          <p className="text-athgray max-w-md mx-auto">
            Scan your membership QR code or enter your Member ID to check in or check out
          </p>
        </div>

        <div className="flex flex-col items-center justify-center">
          {!scannedMember ? (
            <Tabs defaultValue="qr" className="w-full max-w-md">
              <TabsList className="grid grid-cols-2 mb-6">
                <TabsTrigger value="qr" className="flex items-center gap-1">
                  <QrCode className="w-4 h-4" /> Scan QR
                </TabsTrigger>
                <TabsTrigger value="manual" className="flex items-center gap-1">
                  <IdCard className="w-4 h-4" /> Enter ID
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="qr">
                <QrScanner 
                  onScanSuccess={handleScanSuccess}
                  checkedInMembers={checkedInMembers}
                />
              </TabsContent>
              
              <TabsContent value="manual">
                <ManualIdInput
                  onMemberFound={handleScanSuccess}
                  checkedInMembers={checkedInMembers}
                />
              </TabsContent>
            </Tabs>
          ) : (
            <MemberDisplay 
              member={scannedMember}
              isCheckin={isCheckin} 
              onReset={handleReset} 
            />
          )}
        </div>
        
        <CheckInHistory history={history} />
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

export default Index;
