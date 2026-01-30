import { useState, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import CanvasHeader from "@/components/CanvasHeader";
import SceneCard, { Scene, Mood } from "@/components/SceneCard";
import SceneDetailPanel from "@/components/SceneDetailPanel";
import Filmstrip from "@/components/Filmstrip";
import ExportModal from "@/components/ExportModal";
import MicButton from "@/components/ui/MicButton";
import WaveformVisualizer from "@/components/ui/WaveformVisualizer";
import { cn } from "@/lib/utils";

// Demo scenes for visualization
const demoScenes: Scene[] = [
  {
    id: '1',
    number: 1,
    location: 'TEA SHOP',
    timeOfDay: 'EVENING',
    interior: true,
    description: 'MEERA (25) sits alone at a corner table. Rain streaks the window beside her. A cup of tea grows cold. She checks her phone. Nothing. She checks again.',
    mood: 'melancholy',
    shotSuggestion: 'Medium shot, shallow focus on her face, rain blurred in background',
    characters: ['MEERA'],
  },
  {
    id: '2',
    number: 2,
    location: 'STREET',
    timeOfDay: 'EVENING',
    interior: false,
    description: 'ARJUN runs through the rain, dodging pedestrians. His phone is pressed to his ear. The call won\'t connect. He curses under his breath.',
    mood: 'anger',
    shotSuggestion: 'Tracking shot following Arjun, handheld for tension',
    characters: ['ARJUN'],
  },
  {
    id: '3',
    number: 3,
    location: 'TEA SHOP',
    timeOfDay: 'EVENING',
    interior: true,
    description: 'Meera stands up, leaving money on the table. She takes one last look at her phone. Nothing. She walks toward the door.',
    mood: 'melancholy',
    shotSuggestion: 'Wide shot showing the empty tea shop, Meera small in frame',
    characters: ['MEERA'],
  },
];

const Canvas = () => {
  const [searchParams] = useSearchParams();
  const language = searchParams.get('lang') || 'en';
  
  const [projectName, setProjectName] = useState('UNTITLED PROJECT');
  const [scenes, setScenes] = useState<Scene[]>(demoScenes);
  const [selectedSceneId, setSelectedSceneId] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const selectedScene = scenes.find(s => s.id === selectedSceneId) || null;

  const handleMicClick = useCallback(() => {
    if (isRecording) {
      setIsRecording(false);
      setIsProcessing(true);
      
      // Simulate processing and scene creation
      setTimeout(() => {
        const newScene: Scene = {
          id: String(Date.now()),
          number: scenes.length + 1,
          location: 'NEW LOCATION',
          timeOfDay: 'DAY',
          interior: true,
          description: 'New scene created from your voice input. Edit this description to match your vision.',
          mood: 'neutral' as Mood,
          characters: [],
        };
        setScenes(prev => [...prev, newScene]);
        setIsProcessing(false);
      }, 1500);
    } else {
      setIsRecording(true);
    }
  }, [isRecording, scenes.length]);

  const handleSceneClick = (sceneId: string) => {
    setSelectedSceneId(sceneId);
  };

  const handleSceneUpdate = (updatedScene: Scene) => {
    setScenes(prev => prev.map(s => s.id === updatedScene.id ? updatedScene : s));
  };

  const handleReorderScenes = (newScenes: Scene[]) => {
    setScenes(newScenes);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <CanvasHeader
        projectName={projectName}
        language={language}
        onExportClick={() => setIsExportOpen(true)}
        onProjectNameChange={setProjectName}
      />

      {/* Canvas Area */}
      <main className="pt-16 pb-32 min-h-screen grid-bg">
        <div className="p-8">
          {/* Empty State */}
          {scenes.length === 0 && !isRecording && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center justify-center min-h-[60vh]"
            >
              <p className="font-mono text-lg text-muted-foreground text-center max-w-md leading-relaxed">
                Press the mic and start telling your story.
                <br />
                <span className="text-cyan">Describe a scene, a character, a moment.</span>
                <br />
                I'll help you shape it.
              </p>
            </motion.div>
          )}

          {/* Scene Cards Grid */}
          <AnimatePresence mode="popLayout">
            <div className={cn(
              "flex flex-wrap gap-6 transition-opacity",
              isDragging && "opacity-70"
            )}>
              {scenes.map((scene) => (
                <SceneCard
                  key={scene.id}
                  scene={scene}
                  isSelected={selectedSceneId === scene.id}
                  onClick={() => handleSceneClick(scene.id)}
                  onDragStart={() => setIsDragging(true)}
                  onDragEnd={() => setIsDragging(false)}
                />
              ))}
            </div>
          </AnimatePresence>
        </div>
      </main>

      {/* Mic Button */}
      <div className="fixed bottom-36 right-8 z-40 flex flex-col items-center gap-4">
        {/* Waveform when recording */}
        <AnimatePresence>
          {isRecording && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="bg-background-elevated border-[3px] border-cyan px-6 py-4"
            >
              <WaveformVisualizer isActive={isRecording} />
              <p className="font-mono text-xs text-cyan text-center mt-2 uppercase">
                Listening...
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Processing indicator */}
        <AnimatePresence>
          {isProcessing && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="bg-background-elevated border-[3px] border-magenta px-6 py-4"
            >
              <p className="font-mono text-xs text-magenta text-center uppercase">
                Creating scene...
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <MicButton
          isRecording={isRecording}
          isProcessing={isProcessing}
          onClick={handleMicClick}
        />
      </div>

      {/* Scene Detail Panel */}
      <SceneDetailPanel
        scene={selectedScene}
        isOpen={selectedSceneId !== null}
        onClose={() => setSelectedSceneId(null)}
        onUpdate={handleSceneUpdate}
      />

      {/* Filmstrip */}
      <Filmstrip
        scenes={scenes}
        activeSceneId={selectedSceneId}
        onSceneClick={handleSceneClick}
        onReorder={handleReorderScenes}
      />

      {/* Export Modal */}
      <ExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
      />
    </div>
  );
};

export default Canvas;
