import { useEffect, useState, useRef } from 'react';

export function useAIAnnouncer() {
  const [modelStatus, setModelStatus] = useState('ready');

  const announceTrick = async (trickName, score, isWipeout = false) => {
    
    let text = isWipeout ? "Ouch! Watch your posture!" : "Unbelievable trick! What a landing!";
    
    console.log(`[AI Announcer]: "${text}"`);
    
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.pitch = 1.2;
      utterance.rate = 1.1;
      window.speechSynthesis.speak(utterance);
    }
    
    return text;
  };

  return { modelStatus, announceTrick };
}
