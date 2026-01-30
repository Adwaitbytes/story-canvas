import { motion, AnimatePresence } from "framer-motion";
import { X, Mic, RefreshCw, Camera, Sun, Moon, Sunrise, Sunset, Home, Mountain } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Scene, Mood } from "./SceneCard";

interface SceneDetailPanelProps {
  scene: Scene | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (scene: Scene) => void;
}

const moods: { id: Mood; label: string; color: string }[] = [
  { id: 'melancholy', label: 'Melancholy', color: 'bg-mood-melancholy' },
  { id: 'anger', label: 'Tension', color: 'bg-mood-anger' },
  { id: 'joy', label: 'Joy', color: 'bg-mood-joy' },
  { id: 'fear', label: 'Suspense', color: 'bg-mood-fear' },
  { id: 'love', label: 'Warmth', color: 'bg-mood-love' },
  { id: 'neutral', label: 'Neutral', color: 'bg-mood-neutral' },
];

const timeOptions = [
  { id: 'DAY', icon: Sun, label: 'Day' },
  { id: 'NIGHT', icon: Moon, label: 'Night' },
  { id: 'DAWN', icon: Sunrise, label: 'Dawn' },
  { id: 'EVENING', icon: Sunset, label: 'Evening' },
];

const SceneDetailPanel = ({ scene, isOpen, onClose, onUpdate }: SceneDetailPanelProps) => {
  if (!scene) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", damping: 30, stiffness: 300 }}
          className="fixed right-0 top-0 bottom-0 w-full max-w-lg bg-background border-l-[3px] border-cyan z-40 overflow-y-auto"
        >
          {/* Header */}
          <div className="sticky top-0 bg-background border-b-[3px] border-border p-4 flex items-center justify-between">
            <h2 className="font-display text-xl font-bold uppercase tracking-brutal">
              Scene {String(scene.number).padStart(2, '0')}
            </h2>
            <button
              onClick={onClose}
              className="p-2 border-[2px] border-foreground hover:border-cyan hover:text-cyan transition-colors btn-brutal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 space-y-8">
            {/* Location Controls */}
            <section className="space-y-4">
              <h3 className="font-display text-sm font-bold uppercase tracking-brutal text-muted-foreground">
                Scene Heading
              </h3>
              
              {/* INT/EXT Toggle */}
              <div className="flex gap-2">
                <button
                  onClick={() => onUpdate({ ...scene, interior: true })}
                  className={cn(
                    "flex-1 py-3 border-[2px] font-mono text-sm font-bold uppercase",
                    "transition-all duration-150 btn-brutal",
                    scene.interior
                      ? "bg-cyan text-primary-foreground border-cyan"
                      : "bg-transparent text-foreground border-foreground hover:border-cyan"
                  )}
                >
                  <Home className="w-4 h-4 inline mr-2" />
                  Interior
                </button>
                <button
                  onClick={() => onUpdate({ ...scene, interior: false })}
                  className={cn(
                    "flex-1 py-3 border-[2px] font-mono text-sm font-bold uppercase",
                    "transition-all duration-150 btn-brutal",
                    !scene.interior
                      ? "bg-cyan text-primary-foreground border-cyan"
                      : "bg-transparent text-foreground border-foreground hover:border-cyan"
                  )}
                >
                  <Mountain className="w-4 h-4 inline mr-2" />
                  Exterior
                </button>
              </div>

              {/* Location Input */}
              <input
                type="text"
                value={scene.location}
                onChange={(e) => onUpdate({ ...scene, location: e.target.value })}
                className="w-full px-4 py-3 bg-background-elevated border-[2px] border-border font-mono text-foreground uppercase placeholder:text-muted-foreground focus:border-cyan focus:outline-none"
                placeholder="Location name..."
              />

              {/* Time of Day */}
              <div className="grid grid-cols-4 gap-2">
                {timeOptions.map(({ id, icon: Icon, label }) => (
                  <button
                    key={id}
                    onClick={() => onUpdate({ ...scene, timeOfDay: id })}
                    className={cn(
                      "py-3 border-[2px] font-mono text-xs font-bold uppercase flex flex-col items-center gap-1",
                      "transition-all duration-150 btn-brutal",
                      scene.timeOfDay === id
                        ? "bg-cyan text-primary-foreground border-cyan"
                        : "bg-transparent text-foreground border-foreground hover:border-cyan"
                    )}
                  >
                    <Icon className="w-4 h-4" />
                    {label}
                  </button>
                ))}
              </div>
            </section>

            {/* Scene Description */}
            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-sm font-bold uppercase tracking-brutal text-muted-foreground">
                  Scene Description
                </h3>
                <button className="flex items-center gap-2 px-3 py-1.5 border-[2px] border-magenta text-magenta font-mono text-xs uppercase hover:bg-magenta hover:text-primary-foreground transition-colors btn-brutal">
                  <Mic className="w-3 h-3" />
                  Speak to Edit
                </button>
              </div>
              
              <textarea
                value={scene.description}
                onChange={(e) => onUpdate({ ...scene, description: e.target.value })}
                rows={6}
                className="w-full px-4 py-3 bg-background-elevated border-[2px] border-border font-mono text-sm text-foreground leading-relaxed placeholder:text-muted-foreground focus:border-cyan focus:outline-none resize-none"
                placeholder="Describe the scene..."
              />

              {/* Characters */}
              {scene.characters && scene.characters.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {scene.characters.map((char) => (
                    <span
                      key={char}
                      className="px-3 py-1 bg-muted font-mono text-xs text-foreground uppercase border-[2px] border-border"
                    >
                      {char}
                    </span>
                  ))}
                </div>
              )}
            </section>

            {/* Mood Picker */}
            <section className="space-y-4">
              <h3 className="font-display text-sm font-bold uppercase tracking-brutal text-muted-foreground">
                Mood / Emotion
              </h3>
              <div className="flex flex-wrap gap-3">
                {moods.map(({ id, label, color }) => (
                  <button
                    key={id}
                    onClick={() => onUpdate({ ...scene, mood: id })}
                    className={cn(
                      "px-4 py-2 border-[2px] font-mono text-xs uppercase transition-all duration-150 btn-brutal",
                      scene.mood === id
                        ? `${color} text-primary-foreground border-transparent`
                        : "bg-transparent text-foreground border-foreground hover:opacity-80"
                    )}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </section>

            {/* Storyboard Frame */}
            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-sm font-bold uppercase tracking-brutal text-muted-foreground">
                  Storyboard Frame
                </h3>
                <button className="flex items-center gap-2 px-3 py-1.5 border-[2px] border-foreground text-foreground font-mono text-xs uppercase hover:border-cyan hover:text-cyan transition-colors btn-brutal">
                  <RefreshCw className="w-3 h-3" />
                  Regenerate
                </button>
              </div>
              
              <div className="aspect-video bg-background-elevated border-[3px] border-border flex items-center justify-center">
                <div className="text-center space-y-2">
                  <Camera className="w-12 h-12 text-muted-foreground mx-auto" />
                  <p className="font-mono text-xs text-muted-foreground">
                    Frame preview will appear here
                  </p>
                </div>
              </div>

              {/* Regenerate Options */}
              <div className="grid grid-cols-2 gap-2">
                {['Different Angle', 'Closer Shot', 'Wider Shot', 'Different Mood'].map((option) => (
                  <button
                    key={option}
                    className="py-2 border-[2px] border-border font-mono text-xs text-muted-foreground uppercase hover:border-cyan hover:text-cyan transition-colors"
                  >
                    {option}
                  </button>
                ))}
              </div>
            </section>

            {/* Shot Breakdown */}
            <section className="space-y-4">
              <h3 className="font-display text-sm font-bold uppercase tracking-brutal text-muted-foreground">
                Shot Breakdown
              </h3>
              <div className="flex flex-wrap gap-2">
                {['WIDE', 'MEDIUM', 'CU', 'INSERT'].map((shot, i) => (
                  <div
                    key={shot}
                    className="flex items-center gap-2"
                  >
                    <span className="px-3 py-2 bg-muted font-mono text-xs text-foreground uppercase border-[2px] border-border">
                      {shot}
                    </span>
                    {i < 3 && <span className="text-muted-foreground">→</span>}
                  </div>
                ))}
              </div>
            </section>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SceneDetailPanel;
