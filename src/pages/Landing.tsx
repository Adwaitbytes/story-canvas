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
      <div className="fixed inset-0 grid-bg opacity-40 pointer-events-none" />

      {/* Main Content */}
      <div className="relative z-10 text-center max-w-4xl">
        {/* Logo */}
        <div className="mb-12">
          <div className="inline-block px-4 py-2 border-[3px] border-cyan bg-cyan mb-6">
            <span className="font-display text-sm font-bold uppercase tracking-wide text-primary-foreground">
              StoryBridge
            </span>
          </div>
        </div>

        {/* Hero Text */}
        <h1 className="font-display text-5xl md:text-7xl font-bold uppercase tracking-tight mb-4">
          <span className="text-foreground">Speak Your Story.</span>
          <br />
          <span className="text-cyan">See It Come Alive.</span>
        </h1>

        <p className="font-mono text-lg text-muted-foreground mb-16 max-w-xl mx-auto">
          Transform your voice into professional storyboards. 
          No screenplay format needed. Just tell your story.
        </p>

        {/* Language Selection */}
        <div className="space-y-8">
          <p className="font-display text-sm font-bold uppercase tracking-wide text-muted-foreground">
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
        </div>

        {/* Demo Link */}
        <div className="mt-16">
          <button className="inline-flex items-center gap-2 font-mono text-sm text-muted-foreground hover:text-foreground transition-colors">
            <Play className="w-4 h-4" />
            See how it works
          </button>
        </div>
      </div>

      {/* Footer text */}
      <div className="fixed bottom-8 left-8 font-mono text-xs text-muted-foreground">
        <span className="text-cyan">●</span> Voice-First Storytelling
      </div>

      <div className="fixed bottom-8 right-8 font-mono text-xs text-muted-foreground">
        For Vernacular Filmmakers
      </div>

      {/* Accent lines */}
      <div className="fixed top-1/4 left-8 w-px h-32 bg-cyan" />
      <div className="fixed top-1/3 right-8 w-px h-24 bg-magenta" />
    </div>
  );
};

export default Landing;
