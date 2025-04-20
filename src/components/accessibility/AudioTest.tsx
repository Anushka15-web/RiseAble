
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Volume2, VolumeX, Play, Pause } from "lucide-react";
import { useAccessibility } from "@/context/AccessibilityContext";

const AudioTest: React.FC = () => {
  const { language } = useAccessibility();
  const [volume, setVolume] = useState<number>(80);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create audio element
    audioRef.current = new Audio("/notification-sound.mp3");
    
    // Cleanup on unmount
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    // Update volume when it changes
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    } else {
      audioRef.current.play().catch(err => {
        console.error("Error playing audio:", err);
      });
      
      // Set a timeout to reset the play button after the audio ends
      audioRef.current.onended = () => {
        setIsPlaying(false);
      };
    }
    
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (newValue: number[]) => {
    setVolume(newValue[0]);
  };

  const toggleMute = () => {
    if (volume > 0) {
      setVolume(0);
    } else {
      setVolume(80);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col space-y-2">
        <label className="text-sm font-medium">
          {language === "en" ? "Test Audio" : "ऑडियो परीक्षण"}
        </label>
        <Button 
          onClick={togglePlay} 
          className="w-full flex items-center justify-center gap-2"
        >
          {isPlaying ? (
            <>
              <Pause className="h-4 w-4" />
              {language === "en" ? "Stop Sound" : "आवाज़ बंद करें"}
            </>
          ) : (
            <>
              <Play className="h-4 w-4" />
              {language === "en" ? "Play Test Sound" : "परीक्षण ध्वनि चलाएं"}
            </>
          )}
        </Button>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">
          {language === "en" ? "Volume Control" : "वॉल्यूम नियंत्रण"}
        </label>
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={toggleMute}
            aria-label={volume === 0 ? "Unmute" : "Mute"}
          >
            {volume === 0 ? (
              <VolumeX className="h-4 w-4" />
            ) : (
              <Volume2 className="h-4 w-4" />
            )}
          </Button>
          <Slider
            value={[volume]}
            min={0}
            max={100}
            step={1}
            onValueChange={handleVolumeChange}
            className="flex-1"
          />
          <span className="w-8 text-sm text-right">{volume}%</span>
        </div>
      </div>
    </div>
  );
};

export default AudioTest;
