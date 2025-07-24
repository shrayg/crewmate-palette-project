import { CharacterPreview } from './CharacterPreview';
import { CategorySelector } from './CategorySelector';
import { useCrewmateGenerator } from '@/hooks/useCrewmateGenerator';

export function CrewmateGenerator() {
  const {
    data,
    currentCharacter,
    selectItem,
    randomizeCharacter,
    downloadCharacter,
  } = useCrewmateGenerator();

  return (
    <div className="min-h-screen relative">
      {/* Starfield background */}
      <div className="starfield" />
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center space-y-4 mb-8">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-space-purple via-space-blue to-space-purple bg-clip-text text-transparent animate-pulse-slow">
            Crewmate Generator
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Create unique Among Us characters by selecting colors, outfits, pets, hats, and visors.
          </p>
        </div>

        {/* Main Layout - Split View */}
        <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {/* Left Side - Character Preview */}
          <div className="lg:sticky lg:top-8 h-fit">
            <CharacterPreview
              character={currentCharacter}
              onRandomize={randomizeCharacter}
              onDownload={downloadCharacter}
            />
          </div>

          {/* Right Side - Category Selector */}
          <div className="min-h-[600px]">
            <CategorySelector
              crewmates={data.crewmates}
              trousers={data.trousers}
              pets={data.pets}
              hats={data.hats}
              visors={data.visors}
              selectedItems={{
                crewmate: currentCharacter.crewmate,
                trouser: currentCharacter.trouser,
                pet: currentCharacter.pet,
                hat: currentCharacter.hat,
                visor: currentCharacter.visor,
              }}
              onSelectItem={selectItem}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-muted-foreground mt-16">
          <p>
            Inspired by Among Us • Built with React & TypeScript
          </p>
        </div>
      </div>
    </div>
  );
}