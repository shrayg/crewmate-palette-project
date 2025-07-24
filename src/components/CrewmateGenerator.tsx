import { CategoryTabs } from './CategoryTabs';
import { ItemGrid } from './ItemGrid';
import { ControlPanel } from './ControlPanel';
import { GeneratedCharacters } from './GeneratedCharacters';
import { useCrewmateGenerator } from '@/hooks/useCrewmateGenerator';
import { Card } from '@/components/ui/card';

export function CrewmateGenerator() {
  const {
    data,
    generatedCharacters,
    activeCategory,
    setActiveCategory,
    toggleItem,
    toggleAlwaysInclude,
    disableAllInCategory,
    clearAllSelections,
    generateCharacters,
    downloadCharacters,
  } = useCrewmateGenerator();

  const currentItems = data[activeCategory];

  return (
    <div className="min-h-screen relative">
      {/* Starfield background */}
      <div className="starfield" />
      
      <div className="relative z-10 container mx-auto px-4 py-8 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-space-purple via-space-blue to-space-purple bg-clip-text text-transparent animate-pulse-slow">
            Crewmate Generator
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Create unique Among Us characters with custom combinations of colors, outfits, pets, hats, and visors.
          </p>
        </div>

        {/* Control Panel */}
        <ControlPanel
          generatedCount={generatedCharacters.length}
          onGenerate={() => generateCharacters(10)}
          onClearAll={clearAllSelections}
          onDownload={downloadCharacters}
        />

        {/* Generated Characters */}
        {generatedCharacters.length > 0 && (
          <Card className="p-6 bg-card/50 backdrop-blur-sm border-primary/30">
            <GeneratedCharacters characters={generatedCharacters} />
          </Card>
        )}

        {/* Category Selection */}
        <Card className="p-6 bg-card/50 backdrop-blur-sm border-primary/30">
          <CategoryTabs
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />
          
          {/* Item Grid */}
          <ItemGrid
            items={currentItems}
            category={activeCategory}
            onToggleItem={(itemId) => toggleItem(activeCategory, itemId)}
            onToggleAlwaysInclude={(itemId) => toggleAlwaysInclude(activeCategory, itemId)}
            onDisableAll={() => disableAllInCategory(activeCategory)}
          />
        </Card>

        {/* Footer */}
        <div className="text-center text-sm text-muted-foreground">
          <p>
            Inspired by Among Us • Built with React & TypeScript
          </p>
        </div>
      </div>
    </div>
  );
}