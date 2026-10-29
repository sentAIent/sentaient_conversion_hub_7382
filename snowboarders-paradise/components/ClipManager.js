import { useEffect, useRef, useState } from 'react';

// This hook attaches to the Three.js canvas and maintains a rolling buffer of gameplay
export function useClipManager(canvasRef) {
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const [exportedClips, setExportedClips] = useState([]);
  const [isRecording, setIsRecording] = useState(false);

  useEffect(() => {
    if (!canvasRef.current) return;
    
    try {
      // Capture at 30fps
      const stream = canvasRef.current.captureStream(30);
      const options = { mimeType: 'video/webm; codecs=vp9' };
      
      const mediaRecorder = new MediaRecorder(stream, options);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
          // Keep a rolling buffer of roughly 15 seconds 
          // (assuming 1 chunk per second if timeslice is 1000)
          if (chunksRef.current.length > 15) {
            chunksRef.current.shift();
          }
        }
      };

      // Request data every 1 second
      mediaRecorder.start(1000);
      setIsRecording(true);

      return () => {
        if (mediaRecorder.state !== 'inactive') {
          mediaRecorder.stop();
        }
      };
    } catch (err) {
      console.warn("MediaRecorder captureStream not supported in this environment:", err);
    }
  }, [canvasRef]);

  // Call this when a massive trick lands
  const saveHighlight = () => {
    if (chunksRef.current.length === 0) return;
    
    console.log("Saving highlight clip!");
    const blob = new Blob(chunksRef.current, { type: 'video/webm' });
    const url = URL.createObjectURL(blob);
    
    setExportedClips(prev => [...prev, {
      id: Date.now(),
      url,
      timestamp: new Date().toISOString(),
      size: blob.size
    }]);
    
    // Clear buffer after saving to start fresh for next trick
    chunksRef.current = []; 
  };

  return {
    exportedClips,
    saveHighlight,
    isRecording
  };
}
