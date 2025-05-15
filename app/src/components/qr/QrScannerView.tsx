
import React from "react";
import { QrCode, ScanBarcode, Barcode } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface QrScannerViewProps {
  videoRef: React.RefObject<HTMLVideoElement>;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  scanning: boolean;
  toggleCamera: () => void;
}

const QrScannerView: React.FC<QrScannerViewProps> = ({ 
  videoRef, 
  canvasRef, 
  scanning, 
  toggleCamera
}) => {
  return (
    <div className="w-full flex flex-col items-center">
      <Card className="relative w-full max-w-md overflow-hidden bg-gradient-to-br from-white to-athgray/10 shadow-lg mb-3 border-2 border-athgreen/20">
        <div className="p-3 bg-athgray/10">
          <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-black">
            {/* Video feed */}
            <video 
              ref={videoRef} 
              className="w-full h-full object-cover"
              playsInline
              muted
            />
            
            {/* Scanner overlay with animation */}
            {scanning && (
              <div className="absolute inset-0 pointer-events-none">
                <div className="h-full w-full flex flex-col items-center justify-center">
                  {/* Corner markers for QR box */}
                  <div className="absolute top-4 left-4 w-12 h-12 border-t-4 border-l-4 border-athgreen/80"></div>
                  <div className="absolute top-4 right-4 w-12 h-12 border-t-4 border-r-4 border-athgreen/80"></div>
                  <div className="absolute bottom-4 left-4 w-12 h-12 border-b-4 border-l-4 border-athgreen/80"></div>
                  <div className="absolute bottom-4 right-4 w-12 h-12 border-b-4 border-r-4 border-athgreen/80"></div>
                  
                  {/* Animated scanner line */}
                  <div className="scanner-line animate-scan-motion"></div>
                  
                  {/* Center icon */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <ScanBarcode className="text-white/70 h-32 w-32" />
                  </div>
                </div>
              </div>
            )}
            
            {/* Canvas for image processing (hidden) */}
            <canvas ref={canvasRef} className="hidden" />
            
            {/* Inactive state overlay */}
            {!scanning && (
              <div className="absolute inset-0 bg-gradient-to-br from-athgray/80 to-athgray/90 flex flex-col items-center justify-center">
                <QrCode className="h-20 w-20 text-white mb-4" />
                <p className="text-white text-center px-6 text-lg font-medium text-title">
                  Ready to scan
                </p>
              </div>
            )}
          </div>
        </div>
        
        {/* Status indicator */}
        <div className="absolute top-4 right-4">
          <div className={`h-3 w-3 rounded-full ${scanning ? 'bg-athgreen animate-pulse' : 'bg-athred'}`}></div>
        </div>
      </Card>
      
      {/* Message about scanning barcode from phone */}
      <div className="bg-athgreen/10 border border-athgreen/20 rounded-lg p-3 mb-4 w-full max-w-md flex items-center gap-3">
        <Barcode className="h-6 w-6 text-athgreen/80 flex-shrink-0" />
        <p className="text-sm text-athgray-800 font-medium">
          Please scan the barcode that appears on your phone screen to check in/out
        </p>
      </div>
      
      {/* Simplified Control - Single Scan Button */}
      <div className="flex flex-col gap-4 my-2 w-full max-w-md">
        <Button 
          onClick={toggleCamera}
          className={`w-full ${scanning ? "bg-athred hover:bg-athred/90" : "bg-athgreen hover:bg-athgreen/90"} shadow-md transition-all duration-300 text-base font-medium text-white`}
          size="lg"
        >
          {scanning ? "Stop Scanner" : "Scan QR Code"}
        </Button>
      </div>
    </div>
  );
};

export default QrScannerView;
