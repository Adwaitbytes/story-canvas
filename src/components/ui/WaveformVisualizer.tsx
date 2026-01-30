import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface WaveformVisualizerProps {
  isActive: boolean;
  audioLevel?: number;
  className?: string;
}

const WaveformVisualizer = ({ isActive, audioLevel = 0, className }: WaveformVisualizerProps) => {
  const [bars, setBars] = useState<number[]>(Array(20).fill(8));
  
  useEffect(() => {
    if (!isActive) {
      setBars(Array(20).fill(8));
      return;
    }
    
    const interval = setInterval(() => {
      setBars(prev => prev.map(() => {
        const base = audioLevel > 0 ? audioLevel * 50 : Math.random() * 40;
        return Math.max(8, base + Math.random() * 20);
      }));
    }, 100);
    
    return () => clearInterval(interval);
  }, [isActive, audioLevel]);
  
  return (
    <div className={cn("flex items-end justify-center gap-1 h-16", className)}>
      {bars.map((height, i) => (
        <div
          key={i}
          className={cn(
            "w-1.5 transition-all duration-100",
            i % 2 === 0 ? "bg-cyan" : "bg-magenta"
          )}
          style={{ height: `${height}px` }}
        />
      ))}
    </div>
  );
};

export default WaveformVisualizer;
