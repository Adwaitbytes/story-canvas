import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface WaveformVisualizerProps {
  isActive: boolean;
  className?: string;
}

const WaveformVisualizer = ({ isActive, className }: WaveformVisualizerProps) => {
  const bars = 24;
  
  return (
    <div className={cn("flex items-center justify-center gap-1 h-16", className)}>
      {Array.from({ length: bars }).map((_, i) => (
        <motion.div
          key={i}
          className={cn(
            "w-1 rounded-full",
            i % 3 === 0 ? "bg-cyan" : i % 3 === 1 ? "bg-magenta" : "bg-yellow"
          )}
          initial={{ height: 8 }}
          animate={isActive ? {
            height: [8, Math.random() * 48 + 16, 8],
          } : { height: 8 }}
          transition={{
            repeat: isActive ? Infinity : 0,
            duration: 0.3 + Math.random() * 0.3,
            delay: i * 0.02,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

export default WaveformVisualizer;
