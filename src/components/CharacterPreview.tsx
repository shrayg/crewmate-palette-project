import { CurrentCharacter } from '@/types';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Download, Shuffle, RotateCcw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CharacterPreviewProps {
  character: CurrentCharacter;
  twitterHandle: string;
  onTwitterHandleChange: (handle: string) => void;
  onRandomize: () => void;
  onDownload: () => void;
  onReset: () => void;
}

export function CharacterPreview({ character, twitterHandle, onTwitterHandleChange, onRandomize, onDownload, onReset }: CharacterPreviewProps) {
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
          <div className="relative w-80 h-80 bg-transparent" data-character-preview>
            {character.crewmate ? (
              <div className="relative w-full h-full">
                {/* Base crewmate - positioned at center */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <img
                    src={character.crewmate.imageUrl}
                    alt={character.crewmate.name}
                    className="w-48 h-48 object-contain drop-shadow-lg"
                    style={{ imageRendering: 'pixelated' }}
                  />
                </div>
                
                {/* Trouser layer - same position as crewmate */}
                {character.trouser && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <img
                      src={character.trouser.imageUrl}
                      alt={character.trouser.name}
                      className="w-48 h-48 object-contain"
                      style={{ imageRendering: 'pixelated' }}
                    />
                  </div>
                )}
                
                {/* Hat layer - positioned slightly higher */}
                {character.hat && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <img
                      src={character.hat.imageUrl}
                      alt={character.hat.name}
                      className="w-48 h-48 object-contain"
                      style={{ imageRendering: 'pixelated' }}
                    />
                  </div>
                )}
                
                {/* Visor layer - positioned on face */}
                {character.visor && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <img
                      src={character.visor.imageUrl}
                      alt={character.visor.name}
                      className="w-48 h-48 object-contain"
                      style={{ imageRendering: 'pixelated' }}
                    />
                  </div>
                )}
                
                {/* Pet positioned to the side */}
                {character.pet && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <img
                      src={character.pet.imageUrl}
                      alt={character.pet.name}
                      className="w-48 h-48 object-contain drop-shadow-lg"
                      style={{ imageRendering: 'pixelated' }}
                    />
                  </div>
                )}
                
                {/* Twitter handle in bottom right */}
                {twitterHandle && (
                  <div className="absolute bottom-0 right-0 text-white text-sm font-hey-comic drop-shadow-lg"
                       style={{ 
                         textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
                         transform: 'translate(-8px, -8px)'
                       }}>
                    @{twitterHandle}
                  </div>
                )}
              </div>
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

      {/* Twitter Handle Input */}
      <Card className="p-4 bg-card/30 backdrop-blur-sm border-primary/20 mb-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground" htmlFor="twitter-handle">
            Twitter Handle (optional)
          </label>
          <Input
            id="twitter-handle"
            placeholder="Enter your Twitter handle..."
            value={twitterHandle}
            onChange={(e) => onTwitterHandleChange(e.target.value)}
            className="bg-input/50 border-primary/30"
          />
          <p className="text-xs text-muted-foreground">
            Your handle will appear in the bottom right of the downloaded image
          </p>
        </div>
      </Card>

      {/* Contract Address */}
      <Card className="p-4 bg-card/30 backdrop-blur-sm border-primary/20 mb-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">
            Contract Address
          </label>
          <div className="p-2 bg-input/50 border border-primary/30 rounded text-sm text-muted-foreground">
            Contract Address
          </div>
        </div>
      </Card>

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