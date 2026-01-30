import { cn } from "@/lib/utils";

interface LanguageButtonProps {
  language: string;
  code: string;
  isSelected?: boolean;
  onClick: () => void;
}

const LanguageButton = ({ language, code, isSelected, onClick }: LanguageButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "relative px-8 py-4 border-[3px] font-display text-lg font-bold uppercase tracking-wide",
        "transition-all duration-100 btn-brutal",
        isSelected
          ? "bg-cyan text-primary-foreground border-cyan"
          : "bg-transparent text-foreground border-foreground hover:bg-cyan hover:text-primary-foreground hover:border-cyan"
      )}
    >
      <span className={cn(
        code === 'ta' && "font-tamil",
        code === 'te' && "font-tamil",
        code === 'hi' && "font-tamil",
      )}>
        {language}
      </span>
    </button>
  );
};

export default LanguageButton;
