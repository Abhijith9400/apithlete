
import { useRef, useState, useEffect } from "react";
import { toast } from "sonner";

interface UseCameraProps {
  onScanSuccess: (qrData: string) => void;
}

interface UseCameraReturn {
  videoRef: React.RefObject<HTMLVideoElement>;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  scanning: boolean;
  cameraMode: 'environment' | 'user';
  startCamera: () => void;
  stopCamera: () => void;
  toggleCamera: () => void;
  switchCamera: () => void;
}

export const useCamera = ({ onScanSuccess }: UseCameraProps): UseCameraReturn => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [scanning, setScanning] = useState(false);
  const [cameraMode, setCameraMode] = useState<'environment' | 'user'>('environment');
  const scanIntervalRef = useRef<number | null>(null);
  const scannerRef = useRef<any>(null);

  // Initialize scanner with jsQR library
  useEffect(() => {
    const loadScanner = async () => {
      try {
        const jsQR = (await import('jsqr')).default;
        scannerRef.current = jsQR;
      } catch (error) {
        console.error("Failed to load jsQR:", error);
        toast.error("Failed to load QR scanner module");
      }
    };
    
    loadScanner();
    
    return () => {
      if (scanIntervalRef.current) {
        clearInterval(scanIntervalRef.current);
      }
      stopCamera();
    };
  }, []);

  const startScanning = () => {
    if (!canvasRef.current || !videoRef.current || !scannerRef.current) return;
    
    if (scanIntervalRef.current) {
      clearInterval(scanIntervalRef.current);
    }
    
    scanIntervalRef.current = window.setInterval(() => {
      if (!videoRef.current || !canvasRef.current || !scannerRef.current) return;
      
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      
      if (!context || video.paused || video.ended) return;
      
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      const code = scannerRef.current(imageData.data, imageData.width, imageData.height);
      
      if (code) {
        // Pass QR code data up to the parent component
        onScanSuccess(code.data);
      }
    }, 500); // Scan every 500ms
  };

  const startCamera = async () => {
    try {
      if (!videoRef.current) return;
      
      // Get user media based on selected camera mode
      const constraints = {
        video: { 
          facingMode: cameraMode,
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }
      };
      
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      videoRef.current.srcObject = stream;
      
      videoRef.current.onloadedmetadata = () => {
        if (videoRef.current) {
          videoRef.current.play();
          setScanning(true);
          startScanning();
        }
      };
    } catch (error) {
      console.error("Error accessing camera:", error);
      toast.error("Could not access camera. Please check permissions.");
    }
  };

  const stopCamera = () => {
    if (!videoRef.current) return;
    
    const stream = videoRef.current.srcObject as MediaStream;
    if (stream) {
      const tracks = stream.getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    
    setScanning(false);
    if (scanIntervalRef.current) {
      clearInterval(scanIntervalRef.current);
      scanIntervalRef.current = null;
    }
  };

  const toggleCamera = () => {
    if (scanning) {
      stopCamera();
    } else {
      startCamera();
    }
  };

  const switchCamera = () => {
    stopCamera();
    setCameraMode(prevMode => prevMode === 'environment' ? 'user' : 'environment');
    setTimeout(() => startCamera(), 300);
  };

  return {
    videoRef,
    canvasRef,
    scanning,
    cameraMode,
    startCamera,
    stopCamera,
    toggleCamera,
    switchCamera
  };
};
