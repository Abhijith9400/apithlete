
import React, { useEffect } from "react";
import { toast } from "sonner";
import { useCamera } from "@/hooks/useCamera";
import QrScannerView from "@/components/qr/QrScannerView";
import { findMemberByQrData } from "@/services/memberService";

interface QrScannerProps {
  onScanSuccess: (memberData: any, isCheckin: boolean) => void;
  checkedInMembers: Record<string, boolean>;
}

const QrScanner: React.FC<QrScannerProps> = ({ onScanSuccess, checkedInMembers }) => {
  const {
    videoRef,
    canvasRef,
    scanning,
    toggleCamera,
    stopCamera,
    startCamera
  } = useCamera({ onScanSuccess: handleQrCodeDetected });

  // Auto-restart scanning after 3 seconds
  useEffect(() => {
    if (!scanning) {
      const restartTimer = setTimeout(() => {
        startCamera();
      }, 3000);
      
      return () => clearTimeout(restartTimer);
    }
  }, [scanning, startCamera]);

  function handleQrCodeDetected(qrData: string) {
    console.log("QR code detected:", qrData);
    
    // Find member with matching QR code
    const member = findMemberByQrData(qrData);
    
    if (member) {
      if (member.status === "active") {
        stopCamera(); // Stop scanning after successful scan
        
        // Check if member is already checked in
        const isCheckedIn = checkedInMembers[member.id] === true;
        
        if (isCheckedIn) {
          toast.success(`${member.name} checked out successfully`);
          onScanSuccess(member, false); // false means check-out
        } else {
          toast.success(`${member.name} checked in successfully`);
          onScanSuccess(member, true); // true means check-in
        }
      } else {
        toast.error(`Membership inactive: ${member.name}`);
      }
    } else {
      toast.error("Invalid QR code. Access denied.");
    }
  }

  return (
    <QrScannerView
      videoRef={videoRef}
      canvasRef={canvasRef}
      scanning={scanning}
      toggleCamera={toggleCamera}
    />
  );
};

export default QrScanner;
