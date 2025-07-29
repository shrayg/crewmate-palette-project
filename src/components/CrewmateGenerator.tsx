import { CharacterPreview } from './CharacterPreview';
import { CategorySelector } from './CategorySelector';
import { useCrewmateGenerator } from '@/hooks/useCrewmateGenerator';

export function CrewmateGenerator() {
  const {
    data,
    currentCharacter,
    twitterHandle,
    setTwitterHandle,
    selectItem,
    randomizeCharacter,
    downloadCharacter,
    clearCharacter,
  } = useCrewmateGenerator();

  return (
    <div className="min-h-screen relative">
      {/* Starfield background */}
      <div className="starfield" />
      
      {/* Contract Address - Top Left */}
      <div className="absolute top-4 left-4 z-20">
        <div className="px-3 py-2 bg-black/80 border border-gray-600 rounded-lg backdrop-blur-sm">
          <label className="block text-xs font-medium text-gray-300 mb-1">
            Contract Address
          </label>
          <div className="text-white text-sm font-mono">
            2oQNkePakuPbHzrVVkQ875WHeewLHCd2cAwfwiLQbonk
          </div>
        </div>
      </div>
      
      {/* Community Button - Top Right */}
      <div className="absolute top-4 right-4 z-20">
        <a 
          href="https://x.com/i/communities/1948484175268336110"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-3 py-2 bg-black/80 hover:bg-black/90 border border-gray-600 rounded-lg text-white text-sm font-hey-comic transition-all duration-200 hover:scale-105 backdrop-blur-sm"
        >
          <svg 
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            fill="currentColor"
            className="text-white"
          >
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
          Community
        </a>
      </div>
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center space-y-4 mb-8">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-space-purple via-space-blue to-space-purple bg-clip-text text-transparent font-hey-comic">
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
              twitterHandle={twitterHandle}
              onTwitterHandleChange={setTwitterHandle}
              onRandomize={randomizeCharacter}
              onDownload={downloadCharacter}
              onReset={clearCharacter}
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