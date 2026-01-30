import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp, ChevronDown, Play, Expand } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Scene } from "./SceneCard";
import { useState } from "react";

interface FilmstripProps {
  scenes: Scene[];
  activeSceneId: string | null;
  onSceneClick: (sceneId: string) => void;
  onReorder: (scenes: Scene[]) => void;
}

const Filmstrip = ({ scenes, activeSceneId, onSceneClick, onReorder }: FilmstripProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      className={cn(
        "fixed bottom-0 left-0 right-0 bg-background border-t-[3px] border-cyan z-30",
        "transition-all duration-300"
      )}
      animate={{ height: isExpanded ? 280 : 120 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-border">
        <div className="flex items-center gap-4">
          <h3 className="font-display text-sm font-bold uppercase tracking-brutal">
            Timeline
          </h3>
          <span className="font-mono text-xs text-muted-foreground">
            {scenes.length} scenes
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          <button className="p-2 border-[2px] border-foreground text-foreground hover:border-cyan hover:text-cyan transition-colors btn-brutal">
            <Play className="w-4 h-4" />
          </button>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2 border-[2px] border-foreground text-foreground hover:border-cyan hover:text-cyan transition-colors btn-brutal"
          >
            {isExpanded ? (
              <ChevronDown className="w-4 h-4" />
            ) : (
              <ChevronUp className="w-4 h-4" />
            )}
          </button>
          <button className="p-2 border-[2px] border-foreground text-foreground hover:border-cyan hover:text-cyan transition-colors btn-brutal">
            <Expand className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Pacing Graph (when expanded) */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 60 }}
            exit={{ opacity: 0, height: 0 }}
            className="px-4 py-2 border-b border-border overflow-hidden"
          >
            <div className="h-full flex items-end gap-1">
              {scenes.map((scene) => {
                const height = scene.mood === 'anger' || scene.mood === 'fear' 
                  ? 80 
                  : scene.mood === 'joy' || scene.mood === 'love' 
                  ? 60 
                  : 40;
                return (
                  <motion.div
                    key={scene.id}
                    className={cn(
                      "flex-1 transition-colors",
                      scene.mood === 'melancholy' && "bg-mood-melancholy",
                      scene.mood === 'anger' && "bg-mood-anger",
                      scene.mood === 'joy' && "bg-mood-joy",
                      scene.mood === 'fear' && "bg-mood-fear",
                      scene.mood === 'love' && "bg-mood-love",
                      scene.mood === 'neutral' && "bg-mood-neutral",
                    )}
                    initial={{ height: 0 }}
                    animate={{ height: `${height}%` }}
                    transition={{ delay: 0.1 }}
                  />
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Frames */}
      <div className="px-4 py-3 overflow-x-auto">
        <div className="flex gap-3 min-w-max">
          {scenes.map((scene) => (
            <motion.button
              key={scene.id}
              onClick={() => onSceneClick(scene.id)}
              className={cn(
                "filmstrip-frame w-16 h-16 flex flex-col items-center justify-center gap-1",
                "hover:border-cyan hover:shadow-glow-cyan transition-all",
                activeSceneId === scene.id && "active"
              )}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="font-mono text-sm font-bold">
                {String(scene.number).padStart(2, '0')}
              </span>
            </motion.button>
          ))}
          
          {scenes.length === 0 && (
            <div className="w-16 h-16 border-[2px] border-dashed border-muted-foreground flex items-center justify-center">
              <span className="font-mono text-xs text-muted-foreground">—</span>
            </div>
          )}
        </div>
      </div>

      {/* Scene labels (when expanded) */}
      <AnimatePresence>
        {isExpanded && scenes.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="px-4 pb-3 overflow-x-auto"
          >
            <div className="flex gap-3 min-w-max">
              {scenes.map((scene) => (
                <div key={scene.id} className="w-16 text-center">
                  <p className="font-mono text-[10px] text-muted-foreground uppercase truncate">
                    {scene.location}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Filmstrip;
