import { Button } from '@/components/ui/button';
import { Download, Shuffle, Trash2, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ControlPanelProps {
  generatedCount: number;
  onGenerate: () => void;
  onClearAll: () => void;
  onDownload: () => void;
}

export function ControlPanel({ 
  generatedCount, 
  onGenerate, 
  onClearAll, 
  onDownload 
}: ControlPanelProps) {
  const { toast } = useToast();

  const handleGenerate = () => {
    onGenerate();
    toast({
      title: "Characters Generated!",
      description: `Generated ${generatedCount} unique crewmates.`,
    });
  };

  const handleClearAll = () => {
    onClearAll();
    toast({
      title: "All Cleared",
      description: "All character selections have been reset.",
    });
  };

  const handleDownload = () => {
    onDownload();
    toast({
      title: "Download Started",
      description: "Your characters are being prepared for download.",
    });
  };

  return (
    <div className="flex gap-4 flex-wrap justify-center mb-8">
      <Button 
        variant="space" 
        size="lg"
        onClick={handleGenerate}
        className="min-w-40"
      >
        <Sparkles className="w-5 h-5" />
        Generate Characters
      </Button>
      
      <Button 
        variant="outline" 
        size="lg"
        onClick={handleClearAll}
        className="min-w-32"
      >
        <Trash2 className="w-5 h-5" />
        Clear All
      </Button>
      
      <Button 
        variant="secondary" 
        size="lg"
        onClick={handleDownload}
        className="min-w-40"
        disabled={generatedCount === 0}
      >
        <Download className="w-5 h-5" />
        Download Characters
      </Button>
    </div>
  );
}