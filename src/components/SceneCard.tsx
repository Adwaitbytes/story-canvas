import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { GripVertical, Eye } from "lucide-react";

export type Mood = 'melancholy' | 'anger' | 'joy' | 'fear' | 'love' | 'neutral';

export interface Scene {
  id: string;
  number: number;
  location: string;
  timeOfDay: string;
  interior: boolean;
  description: string;
  mood: Mood;
  shotSuggestion?: string;
  characters?: string[];
}

interface SceneCardProps {
  scene: Scene;
  isSelected?: boolean;
  onClick?: () => void;
  onDragStart?: () => void;
  onDragEnd?: () => void;
}

const moodColors: Record<Mood, string> = {
  melancholy: 'border-mood-melancholy',
  anger: 'border-mood-anger',
  joy: 'border-mood-joy',
  fear: 'border-mood-fear',
  love: 'border-mood-love',
  neutral: 'border-mood-neutral',
};

const moodLabels: Record<Mood, string> = {
  melancholy: 'Melancholy',
  anger: 'Tension',
  joy: 'Joy',
  fear: 'Suspense',
  love: 'Warmth',
  neutral: 'Neutral',
};

const moodBgColors: Record<Mood, string> = {
  melancholy: 'bg-mood-melancholy',
  anger: 'bg-mood-anger',
  joy: 'bg-mood-joy',
  fear: 'bg-mood-fear',
  love: 'bg-mood-love',
  neutral: 'bg-mood-neutral',
};

const SceneCard = ({ scene, isSelected, onClick, onDragStart, onDragEnd }: SceneCardProps) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ scale: 1.02, x: -2, y: -2 }}
      whileDrag={{ scale: 1.05, zIndex: 50 }}
      drag
      dragMomentum={false}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onClick={onClick}
      className={cn(
        "w-72 bg-card border-[3px] cursor-pointer select-none",
        "transition-shadow duration-150",
        moodColors[scene.mood],
        isSelected ? "shadow-glow-cyan" : "shadow-brutal hover:shadow-brutal-lg"
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2 border-b-[2px] border-border bg-background-elevated">
        <div className="flex items-center gap-2">
          <GripVertical className="w-4 h-4 text-muted-foreground cursor-grab" />
          <span className="font-mono text-sm font-bold text-foreground">
            {String(scene.number).padStart(2, '0')}
          </span>
          <span className="text-muted-foreground">—</span>
          <span className="font-mono text-xs text-muted-foreground uppercase">
            {scene.interior ? 'INT' : 'EXT'}. {scene.location}
          </span>
        </div>
        <span className="font-mono text-xs text-muted-foreground uppercase">
          {scene.timeOfDay}
        </span>
      </div>

      {/* Body */}
      <div className="p-3 space-y-3">
        {/* Description */}
        <p className="font-mono text-sm text-foreground leading-relaxed line-clamp-4">
          {scene.description}
        </p>

        {/* Characters */}
        {scene.characters && scene.characters.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {scene.characters.map((char) => (
              <span
                key={char}
                className="px-2 py-0.5 bg-muted font-mono text-xs text-foreground uppercase"
              >
                {char}
              </span>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-2 border-t border-border">
          {/* Mood Tag */}
          <span className={cn(
            "px-2 py-0.5 text-xs font-bold uppercase text-primary-foreground",
            moodBgColors[scene.mood]
          )}>
            {moodLabels[scene.mood]}
          </span>

          {/* View Icon */}
          <button className="p-1 text-muted-foreground hover:text-cyan transition-colors">
            <Eye className="w-4 h-4" />
          </button>
        </div>

        {/* Shot Suggestion */}
        {scene.shotSuggestion && (
          <p className="font-mono text-xs text-muted-foreground">
            📷 {scene.shotSuggestion}
          </p>
        )}
      </div>

      {/* Scanline effect on creation */}
      <motion.div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan to-transparent"
          initial={{ top: 0 }}
          animate={{ top: "100%" }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      </motion.div>
    </motion.div>
  );
};

export default SceneCard;
