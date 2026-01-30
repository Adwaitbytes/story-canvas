import { motion, AnimatePresence } from "framer-motion";
import { X, FileText, Film, Presentation, Link2, Download } from "lucide-react";
import { cn } from "@/lib/utils";

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const exportOptions = [
  {
    id: 'storyboard',
    icon: Film,
    title: 'Storyboard PDF',
    description: 'Classic printable format with frames and scene descriptions',
    color: 'cyan',
  },
  {
    id: 'screenplay',
    icon: FileText,
    title: 'Screenplay PDF',
    description: 'Properly formatted screenplay in standard format',
    color: 'magenta',
  },
  {
    id: 'deck',
    icon: Presentation,
    title: "Director's Deck",
    description: 'Presentation format, one scene per slide',
    color: 'yellow',
  },
  {
    id: 'share',
    icon: Link2,
    title: 'Share Link',
    description: 'Generate a view-only link for collaborators',
    color: 'cyan',
  },
];

const ExportModal = ({ isOpen, onClose }: ExportModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl bg-background border-[3px] border-foreground shadow-brutal z-50"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b-[3px] border-border">
              <h2 className="font-display text-2xl font-bold uppercase tracking-brutal">
                Export Your Story
              </h2>
              <button
                onClick={onClose}
                className="p-2 border-[2px] border-foreground hover:border-cyan hover:text-cyan transition-colors btn-brutal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Options Grid */}
            <div className="p-6 grid grid-cols-2 gap-4">
              {exportOptions.map(({ id, icon: Icon, title, description, color }) => (
                <motion.button
                  key={id}
                  className={cn(
                    "p-6 text-left border-[3px] border-foreground",
                    "hover:shadow-brutal-lg transition-all duration-150",
                    "group"
                  )}
                  whileHover={{ 
                    x: -4, 
                    y: -4,
                    borderColor: color === 'cyan' 
                      ? 'hsl(180 100% 50%)' 
                      : color === 'magenta' 
                      ? 'hsl(300 100% 50%)' 
                      : 'hsl(75 100% 50%)',
                  }}
                  whileTap={{ x: 0, y: 0 }}
                >
                  <Icon className={cn(
                    "w-8 h-8 mb-4 transition-colors",
                    color === 'cyan' && "group-hover:text-cyan",
                    color === 'magenta' && "group-hover:text-magenta",
                    color === 'yellow' && "group-hover:text-yellow",
                  )} />
                  <h3 className="font-display text-lg font-bold uppercase mb-2">
                    {title}
                  </h3>
                  <p className="font-mono text-xs text-muted-foreground">
                    {description}
                  </p>
                </motion.button>
              ))}
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t-[3px] border-border flex items-center justify-between">
              <p className="font-mono text-xs text-muted-foreground">
                All exports include vernacular text support
              </p>
              <button
                onClick={onClose}
                className="px-6 py-2 bg-cyan text-primary-foreground font-display font-bold uppercase tracking-brutal border-[3px] border-cyan hover:bg-transparent hover:text-cyan transition-colors btn-brutal"
              >
                <Download className="w-4 h-4 inline mr-2" />
                Export
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ExportModal;
