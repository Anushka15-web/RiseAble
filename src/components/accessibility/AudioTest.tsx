import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Play, Pause } from "lucide-react";

const AudioTest: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio("/notification-sound.mp3");
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    } else {
      audioRef.current.play().catch(err => {
        console.error("Error playing audio:", err);
      });

      audioRef.current.onended = () => {
        setIsPlaying(false);
      };
    }

    setIsPlaying(!isPlaying);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col space-y-2">
        <label className="text-sm font-medium">Test Audio</label>
        <Button 
          onClick={togglePlay} 
          className="w-full flex items-center justify-center gap-2"
        >
          {isPlaying ? (
            <>
              <Pause className="h-4 w-4" />
              Stop Sound
            </>
          ) : (
            <>
              <Play className="h-4 w-4" />
              Play Test Sound
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default AudioTest;
