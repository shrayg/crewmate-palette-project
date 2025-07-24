import { GeneratedCharacter } from '@/types';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface GeneratedCharactersProps {
  characters: GeneratedCharacter[];
}

export function GeneratedCharacters({ characters }: GeneratedCharactersProps) {
  if (characters.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-muted-foreground text-lg mb-2">
          No characters generated yet
        </div>
        <div className="text-sm text-muted-foreground">
          Click "Generate Characters" to create random crewmates!
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center bg-gradient-to-r from-space-purple to-space-blue bg-clip-text text-transparent">
        Generated Characters ({characters.length})
      </h2>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 max-w-6xl mx-auto">
        {characters.map((character, index) => (
          <Card 
            key={index}
            className={cn(
              "p-4 space-y-3 transition-all duration-300 transform hover:scale-105",
              "bg-gradient-to-br from-card to-card/50 backdrop-blur-sm border-primary/30",
              "hover:shadow-lg hover:shadow-primary/25 hover:border-primary/50"
            )}
          >
            <div className="text-xs font-medium text-center text-muted-foreground">
              Character #{index + 1}
            </div>
            
            {/* Character preview */}
            <div className="aspect-square relative bg-gradient-to-br from-muted/10 to-muted/30 rounded-lg overflow-hidden border border-primary/20">
              {/* Base crewmate */}
              <div className="absolute inset-0 flex items-center justify-center">
                <img
                  src={character.crewmate.imageUrl}
                  alt={character.crewmate.name}
                  className="w-4/5 h-4/5 object-contain drop-shadow-md"
                />
              </div>
              
              {/* Trouser layer */}
              {character.trouser && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <img
                    src={character.trouser.imageUrl}
                    alt={character.trouser.name}
                    className="w-4/5 h-4/5 object-contain"
                  />
                </div>
              )}
              
              {/* Hat layer */}
              {character.hat && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <img
                    src={character.hat.imageUrl}
                    alt={character.hat.name}
                    className="w-4/5 h-4/5 object-contain"
                  />
                </div>
              )}
              
              {/* Visor layer */}
              {character.visor && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <img
                    src={character.visor.imageUrl}
                    alt={character.visor.name}
                    className="w-4/5 h-4/5 object-contain"
                  />
                </div>
              )}
              
              {/* Pet positioned separately */}
              {character.pet && (
                <div className="absolute bottom-1 right-1">
                  <img
                    src={character.pet.imageUrl}
                    alt={character.pet.name}
                    className="w-5 h-5 object-contain drop-shadow-sm"
                  />
                </div>
              )}
            </div>
            
            {/* Character details */}
            <div className="space-y-1 text-xs">
              <div className="font-medium text-primary">
                {character.crewmate.name}
              </div>
              {character.trouser && (
                <div className="text-muted-foreground">
                  {character.trouser.name}
                </div>
              )}
              {character.hat && (
                <div className="text-muted-foreground">
                  {character.hat.name}
                </div>
              )}
              {character.pet && (
                <div className="text-muted-foreground">
                  {character.pet.name}
                </div>
              )}
              {character.visor && (
                <div className="text-muted-foreground">
                  {character.visor.name}
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}