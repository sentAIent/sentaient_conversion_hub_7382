import { useEffect, useState, useRef } from 'react';

export function useVoiceCommands(onCommand) {
  const [modelStatus, setModelStatus] = useState('ready');

  const processAudio = async (audioBuffer) => {
    console.log("Audio processing bypassed");
  };

  return { modelStatus, processAudio };
}
