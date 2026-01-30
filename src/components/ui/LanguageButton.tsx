import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface LanguageButtonProps {
  language: string;
  code: string;
  isSelected?: boolean;
  onClick: () => void;
}

const LanguageButton = ({ language, code, isSelected, onClick }: LanguageButtonProps) => {
  return (
    <motion.button
      onClick={onClick}
      className={cn(
        "relative px-8 py-4 border-[3px] font-display text-lg font-bold uppercase tracking-brutal",
        "transition-all duration-150 btn-brutal",
        isSelected
          ? "bg-cyan text-primary-foreground border-cyan"
          : "bg-transparent text-foreground border-foreground hover:border-cyan hover:text-cyan"
      )}
      whileHover={{ 
        boxShadow: "0 0 20px hsl(180 100% 50% / 0.5), 4px 4px 0px hsl(0 0% 0%)",
      }}
      whileTap={{ 
        x: 2, 
        y: 2,
        boxShadow: "2px 2px 0px hsl(0 0% 0%)",
      }}
    >
      <span className={cn(
        code === 'ta' && "font-tamil",
        code === 'te' && "font-tamil",
        code === 'hi' && "font-tamil",
      )}>
        {language}
      </span>
      
      {/* Glow effect on hover */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        style={{
          boxShadow: "inset 0 0 20px hsl(180 100% 50% / 0.2)",
        }}
      />
    </motion.button>
  );
};

export default LanguageButton;
