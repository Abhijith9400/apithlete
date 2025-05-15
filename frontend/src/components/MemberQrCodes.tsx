
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockMembers } from "@/services/memberService";
import QRCode from "qrcode.react";
import { BadgeCheck, AlertCircle } from "lucide-react";

const MemberQrCodes = () => {
  return (
    <div className="w-full max-w-4xl mx-auto mt-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-athdark">Demo QR Codes</h2>
        <p className="text-sm text-muted-foreground">Scan these codes to test the system</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockMembers.map((member) => (
          <Card key={member.id} className="overflow-hidden">
            <CardHeader className={`py-3 ${member.status === 'active' ? 'bg-athgreen/10' : 'bg-athgray/20'}`}>
              <div className="flex justify-between items-center">
                <CardTitle className="text-base font-medium">{member.name}</CardTitle>
                {member.status === 'active' ? (
                  <BadgeCheck className="h-5 w-5 text-athgreen" />
                ) : (
                  <AlertCircle className="h-5 w-5 text-athgray" />
                )}
              </div>
              <div className="text-xs text-muted-foreground">ID: {member.id}</div>
            </CardHeader>
            <CardContent className="flex items-center justify-center p-4">
              <div className="border-4 border-white shadow-md rounded-lg p-1 bg-white">
                <QRCode 
                  value={member.qrData} 
                  size={150}
                  level="H"
                  fgColor={member.status === 'active' ? "#04bc64" : "#c5ceca"}
                  bgColor="#ffffff"
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MemberQrCodes;
