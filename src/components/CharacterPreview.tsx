import { CurrentCharacter } from '@/types';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Shuffle, RotateCcw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CharacterPreviewProps {
  character: CurrentCharacter;
  onRandomize: () => void;
  onDownload: () => void;
  onReset: () => void;
}

export function CharacterPreview({ character, onRandomize, onDownload, onReset }: CharacterPreviewProps) {
  const { toast } = useToast();

  const handleDownload = () => {
    onDownload();
    toast({
      title: "Download Started",
      description: "Your character is being prepared for download.",
    });
  };

  const handleRandomize = () => {
    onRandomize();
    toast({
      title: "Character Randomized!",
      description: "Generated a new random character combination.",
    });
  };

  const handleReset = () => {
    onReset();
    toast({
      title: "Character Reset",
      description: "All character selections have been cleared.",
    });
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-space-purple to-space-blue bg-clip-text text-transparent mb-2 font-hey-comic">
          Character Preview
        </h2>
        <p className="text-sm text-muted-foreground">
          Select items from the categories to customize your crewmate
        </p>
      </div>

      {/* Character Display */}
      <Card className="flex-1 p-8 bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-sm border-primary/30 mb-6">
        <div className="h-full flex items-center justify-center">
          <div className="relative w-80 h-80 border-2 border-dashed border-primary/30 rounded-xl bg-gradient-to-br from-muted/10 to-muted/30 overflow-hidden">
            {character.crewmate ? (
              <>
                {/* Base crewmate */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <img
                    src={character.crewmate.imageUrl}
                    alt={character.crewmate.name}
                    className="w-3/4 h-3/4 object-contain drop-shadow-lg"
                  />
                </div>
                
                {/* Trouser layer */}
                {character.trouser && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <img
                      src={character.trouser.imageUrl}
                      alt={character.trouser.name}
                      className="w-3/4 h-3/4 object-contain"
                    />
                  </div>
                )}
                
                {/* Hat layer */}
                {character.hat && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <img
                      src={character.hat.imageUrl}
                      alt={character.hat.name}
                      className="w-3/4 h-3/4 object-contain"
                    />
                  </div>
                )}
                
                {/* Visor layer */}
                {character.visor && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <img
                      src={character.visor.imageUrl}
                      alt={character.visor.name}
                      className="w-3/4 h-3/4 object-contain"
                    />
                  </div>
                )}
                
                {/* Pet positioned separately */}
                {character.pet && (
                  <div className="absolute bottom-4 right-4">
                    <img
                      src={character.pet.imageUrl}
                      alt={character.pet.name}
                      className="w-20 h-20 object-contain drop-shadow-lg"
                    />
                  </div>
                )}
              </>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                <div className="text-center">
                  <div className="text-4xl mb-2">👤</div>
                  <div className="text-sm">Select a crewmate color to start</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </Card>

      {/* Character Details */}
      {character.crewmate && (
        <Card className="p-4 bg-card/30 backdrop-blur-sm border-primary/20 mb-6">
          <div className="space-y-2 text-sm">
            <div className="font-medium text-primary flex items-center gap-2">
              <div className="w-3 h-3 bg-primary rounded-full"></div>
              {character.crewmate.name}
            </div>
            {character.trouser && (
              <div className="text-muted-foreground flex items-center gap-2">
                <div className="w-2 h-2 bg-accent rounded-full"></div>
                {character.trouser.name}
              </div>
            )}
            {character.hat && (
              <div className="text-muted-foreground flex items-center gap-2">
                <div className="w-2 h-2 bg-accent rounded-full"></div>
                {character.hat.name}
              </div>
            )}
            {character.pet && (
              <div className="text-muted-foreground flex items-center gap-2">
                <div className="w-2 h-2 bg-accent rounded-full"></div>
                {character.pet.name}
              </div>
            )}
            {character.visor && (
              <div className="text-muted-foreground flex items-center gap-2">
                <div className="w-2 h-2 bg-accent rounded-full"></div>
                {character.visor.name}
              </div>
            )}
          </div>
        </Card>
      )}

      {/* Action Buttons */}
      <div className="space-y-3">
        {/* Top row with Reset and Randomize buttons */}
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="default"
            onClick={handleReset}
            className="flex-1"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </Button>
          
          <Button 
            variant="space" 
            size="default"
            onClick={handleRandomize}
            className="flex-1"
          >
            <Shuffle className="w-4 h-4" />
            Randomize
          </Button>
        </div>
        
        {/* Download button full width */}
        <Button 
          variant="outline" 
          size="lg"
          onClick={handleDownload}
          className="w-full"
          disabled={!character.crewmate}
        >
          <Download className="w-5 h-5" />
          Download Character
        </Button>
      </div>
    </div>
  );
}