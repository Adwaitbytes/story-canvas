import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Mic, Square } from "lucide-react";

interface MicButtonProps {
  isRecording: boolean;
  isProcessing?: boolean;
  onClick: () => void;
  className?: string;
}

const MicButton = ({ isRecording, isProcessing, onClick, className }: MicButtonProps) => {
  return (
    <motion.button
      onClick={onClick}
      disabled={isProcessing}
      className={cn(
        "relative w-20 h-20 rounded-full border-[3px] flex items-center justify-center",
        "transition-all duration-150",
        isRecording
          ? "bg-cyan border-cyan"
          : "bg-transparent border-cyan",
        isProcessing && "opacity-50 cursor-not-allowed",
        !isRecording && !isProcessing && "pulse-glow",
        className
      )}
      whileHover={!isProcessing ? { scale: 1.05 } : undefined}
      whileTap={!isProcessing ? { scale: 0.95 } : undefined}
    >
      {/* Icon */}
      <motion.div
        animate={isRecording ? { scale: [1, 1.1, 1] } : {}}
        transition={{ repeat: Infinity, duration: 0.5 }}
      >
        {isRecording ? (
          <Square className="w-8 h-8 text-primary-foreground fill-current" />
        ) : (
          <Mic className={cn(
            "w-8 h-8",
            isRecording ? "text-primary-foreground" : "text-cyan"
          )} />
        )}
      </motion.div>

      {/* Recording waveform rings */}
      {isRecording && (
        <>
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-magenta"
            initial={{ scale: 1, opacity: 1 }}
            animate={{ scale: 1.5, opacity: 0 }}
            transition={{ repeat: Infinity, duration: 1 }}
          />
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-cyan"
            initial={{ scale: 1, opacity: 1 }}
            animate={{ scale: 1.8, opacity: 0 }}
            transition={{ repeat: Infinity, duration: 1, delay: 0.3 }}
          />
        </>
      )}

      {/* Processing scanline */}
      {isProcessing && (
        <div className="absolute inset-0 rounded-full overflow-hidden">
          <motion.div
            className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan to-transparent"
            initial={{ top: 0 }}
            animate={{ top: "100%" }}
            transition={{ repeat: Infinity, duration: 0.6 }}
          />
        </div>
      )}
    </motion.button>
  );
};

export default MicButton;
