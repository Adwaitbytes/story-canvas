import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import LanguageButton from "@/components/ui/LanguageButton";
import { Play } from "lucide-react";

const languages = [
  { code: 'ta', name: 'தமிழ்' },
  { code: 'te', name: 'తెలుగు' },
  { code: 'hi', name: 'हिंदी' },
  { code: 'en', name: 'ENGLISH' },
];

const Landing = () => {
  const navigate = useNavigate();

  const handleLanguageSelect = (code: string) => {
    navigate(`/canvas?lang=${code}`);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6">
      {/* Background grid */}
      <div className="fixed inset-0 grid-bg opacity-30 pointer-events-none" />

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 text-center max-w-4xl"
      >
        {/* Logo / Brand Mark */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-12"
        >
          <div className="inline-block px-4 py-2 border-[3px] border-cyan mb-6">
            <span className="font-display text-sm font-bold uppercase tracking-brutal text-cyan">
              StoryBridge
            </span>
          </div>
        </motion.div>

        {/* Hero Text */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="font-display text-5xl md:text-7xl font-bold uppercase tracking-tight mb-4"
        >
          <span className="text-foreground">Speak Your Story.</span>
          <br />
          <span className="text-glow-cyan text-cyan">See It Come Alive.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="font-mono text-lg text-muted-foreground mb-16 max-w-xl mx-auto"
        >
          Transform your voice into professional storyboards. 
          No screenplay format needed. Just tell your story.
        </motion.p>

        {/* Language Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="space-y-8"
        >
          <p className="font-display text-sm font-bold uppercase tracking-brutal text-muted-foreground">
            Choose Your Language
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-4">
            {languages.map((lang) => (
              <LanguageButton
                key={lang.code}
                language={lang.name}
                code={lang.code}
                onClick={() => handleLanguageSelect(lang.code)}
              />
            ))}
          </div>
        </motion.div>

        {/* Demo Link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="mt-16"
        >
          <button className="inline-flex items-center gap-2 font-mono text-sm text-muted-foreground hover:text-cyan transition-colors group">
            <Play className="w-4 h-4 group-hover:text-cyan" />
            See how it works
          </button>
        </motion.div>
      </motion.div>

      {/* Decorative Elements */}
      <motion.div
        className="fixed bottom-8 left-8 font-mono text-xs text-muted-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <span className="text-cyan">●</span> Voice-First Storytelling
      </motion.div>

      <motion.div
        className="fixed bottom-8 right-8 font-mono text-xs text-muted-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        For Vernacular Filmmakers
      </motion.div>

      {/* Floating accent lines */}
      <motion.div
        className="fixed top-1/4 left-8 w-px h-32 bg-gradient-to-b from-cyan to-transparent"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
      />
      <motion.div
        className="fixed top-1/3 right-8 w-px h-24 bg-gradient-to-b from-magenta to-transparent"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      />
    </div>
  );
};

export default Landing;
