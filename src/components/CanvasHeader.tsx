import { motion } from "framer-motion";
import { Settings, Download, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface CanvasHeaderProps {
  projectName: string;
  language: string;
  onExportClick: () => void;
  onProjectNameChange: (name: string) => void;
}

const languageLabels: Record<string, string> = {
  ta: 'தமிழ்',
  te: 'తెలుగు',
  hi: 'हिंदी',
  en: 'English',
};

const CanvasHeader = ({ projectName, language, onExportClick, onProjectNameChange }: CanvasHeaderProps) => {
  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-background border-b-[3px] border-border z-30 flex items-center justify-between px-6">
      {/* Left: Project Name */}
      <div className="flex items-center gap-4">
        <motion.div
          className="flex items-center gap-2 group cursor-pointer"
          whileHover={{ x: 2 }}
        >
          <input
            type="text"
            value={projectName}
            onChange={(e) => onProjectNameChange(e.target.value)}
            className="bg-transparent font-display text-xl font-bold uppercase tracking-brutal text-foreground focus:outline-none focus:text-cyan border-b-2 border-transparent focus:border-cyan"
          />
          <ChevronDown className="w-4 h-4 text-muted-foreground group-hover:text-cyan transition-colors" />
        </motion.div>

        {/* Language Badge */}
        <span className={cn(
          "px-3 py-1 border-[2px] border-cyan text-cyan font-mono text-xs uppercase",
          language === 'ta' || language === 'te' || language === 'hi' ? "font-tamil" : "font-mono"
        )}>
          {languageLabels[language] || language}
        </span>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-3">
        <button className="p-2 border-[2px] border-foreground text-foreground hover:border-cyan hover:text-cyan transition-colors btn-brutal">
          <Settings className="w-5 h-5" />
        </button>
        
        <motion.button
          onClick={onExportClick}
          className="flex items-center gap-2 px-4 py-2 bg-cyan text-primary-foreground font-display font-bold uppercase tracking-brutal border-[3px] border-cyan hover:bg-transparent hover:text-cyan transition-colors btn-brutal"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Download className="w-4 h-4" />
          Export
        </motion.button>
      </div>
    </header>
  );
};

export default CanvasHeader;
