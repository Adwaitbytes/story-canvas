import { cn } from "@/lib/utils";
import { Mic, Square, Loader2 } from "lucide-react";

interface MicButtonProps {
  isRecording: boolean;
  isProcessing?: boolean;
  onClick: () => void;
  className?: string;
}

const MicButton = ({ isRecording, isProcessing, onClick, className }: MicButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={isProcessing}
      className={cn(
        "relative w-20 h-20 border-[3px] flex items-center justify-center btn-brutal",
        "transition-all duration-100",
        isRecording
          ? "bg-magenta border-magenta"
          : "bg-cyan border-cyan",
        isProcessing && "opacity-50 cursor-not-allowed",
        className
      )}
    >
      {isProcessing ? (
        <Loader2 className="w-8 h-8 text-primary-foreground animate-spin" />
      ) : isRecording ? (
        <Square className="w-8 h-8 text-primary-foreground fill-current" />
      ) : (
        <Mic className="w-8 h-8 text-primary-foreground" />
      )}
    </button>
  );
};

export default MicButton;
