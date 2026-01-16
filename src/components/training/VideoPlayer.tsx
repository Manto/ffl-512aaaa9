import { useState, useRef, useEffect } from 'react';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  SkipForward,
  Settings,
  CheckCircle,
  RotateCcw,
} from 'lucide-react';
import { Button } from '../ui/button';
import { Slider } from '../ui/slider';

interface VideoPlayerProps {
  title: string;
  onComplete: () => void;
}

export function VideoPlayer({ title, onComplete }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(80);
  const [currentTime, setCurrentTime] = useState('0:00');
  const [duration] = useState('3:45');
  const progressInterval = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isPlaying) {
      progressInterval.current = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setIsPlaying(false);
            return 100;
          }
          const newProgress = prev + 0.5;
          // Update current time display
          const totalSeconds = Math.floor((newProgress / 100) * 225); // 3:45 = 225 seconds
          const minutes = Math.floor(totalSeconds / 60);
          const seconds = totalSeconds % 60;
          setCurrentTime(`${minutes}:${seconds.toString().padStart(2, '0')}`);
          return newProgress;
        });
      }, 100);
    } else if (progressInterval.current) {
      clearInterval(progressInterval.current);
    }

    return () => {
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    };
  }, [isPlaying, onComplete]);

  const isComplete = progress >= 100;

  const togglePlay = () => {
    if (isComplete) {
      // Reset and play from beginning
      setProgress(0);
      setCurrentTime('0:00');
      setIsPlaying(true);
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  const handleRewatch = () => {
    setProgress(0);
    setCurrentTime('0:00');
    setIsPlaying(true);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleProgressClick = (value: number[]) => {
    setProgress(value[0]);
    const totalSeconds = Math.floor((value[0] / 100) * 225);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    setCurrentTime(`${minutes}:${seconds.toString().padStart(2, '0')}`);
  };

  return (
    <div className="bg-card rounded-2xl shadow-lg overflow-hidden">
      {/* Video Area */}
      <div className="relative aspect-video bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        {/* Placeholder industrial image */}
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              'url(https://images.pexels.com/photos/247763/pexels-photo-247763.jpeg?auto=compress&cs=tinysrgb&w=1920)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />

        {/* Completion overlay */}
        {isComplete && (
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex flex-col items-center justify-center z-20 animate-fade-in">
            <div className="w-20 h-20 rounded-full bg-emerald-500/20 flex items-center justify-center mb-4 animate-scale-in">
              <CheckCircle className="w-12 h-12 text-emerald-500" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">Video Complete</h3>
            <p className="text-sm text-muted-foreground mb-6">You've finished watching the introduction</p>
            <Button
              variant="outline"
              onClick={handleRewatch}
              className="bg-background/50 hover:bg-background/80"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Rewatch Video
            </Button>
          </div>
        )}

        {/* Play button overlay */}
        {!isPlaying && !isComplete && (
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <button
              onClick={togglePlay}
              className="w-20 h-20 rounded-full bg-primary/90 hover:bg-primary flex items-center justify-center transition-all hover:scale-105 shadow-2xl"
            >
              <Play className="w-8 h-8 text-primary-foreground ml-1" fill="currentColor" />
            </button>
          </div>
        )}

        {/* Video title overlay */}
        <div className="absolute top-4 left-4 z-10">
          <div className="bg-background/80 backdrop-blur-sm rounded-lg px-3 py-2">
            <p className="text-xs text-muted-foreground">Introduction</p>
            <p className="text-sm font-medium text-foreground">{title}</p>
          </div>
        </div>

        {/* Progress bar on video */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-muted/30">
          <div
            className="h-full bg-primary transition-all duration-100"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Controls */}
      <div className="p-4 bg-card border-t border-border">
        {/* Progress slider */}
        <div className="mb-3">
          <Slider
            value={[progress]}
            max={100}
            step={0.1}
            onValueChange={handleProgressClick}
            className="cursor-pointer"
          />
        </div>

        <div className="flex items-center justify-between">
          {/* Left controls */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={togglePlay}
              className="h-9 w-9"
            >
              {isPlaying ? (
                <Pause className="w-5 h-5" />
              ) : (
                <Play className="w-5 h-5" />
              )}
            </Button>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleMute}
                className="h-9 w-9"
              >
                {isMuted || volume === 0 ? (
                  <VolumeX className="w-5 h-5" />
                ) : (
                  <Volume2 className="w-5 h-5" />
                )}
              </Button>
              <div className="w-20 hidden sm:block">
                <Slider
                  value={[isMuted ? 0 : volume]}
                  max={100}
                  step={1}
                  onValueChange={(value) => {
                    setVolume(value[0]);
                    if (value[0] > 0) setIsMuted(false);
                  }}
                />
              </div>
            </div>

            <span className="text-sm text-muted-foreground ml-2">
              {currentTime} / {duration}
            </span>
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <Settings className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <Maximize className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Continue button */}
        <div className="mt-4 pt-4 border-t border-border flex justify-end">
          <Button onClick={onComplete} className="bg-primary hover:bg-primary/90">
            Continue to Briefing
            <SkipForward className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}
