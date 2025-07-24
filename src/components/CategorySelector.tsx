import { CrewmateItem, ItemCategory } from '@/types';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { useState } from 'react';

interface CategorySelectorProps {
  crewmates: CrewmateItem[];
  trousers: CrewmateItem[];
  pets: CrewmateItem[];
  hats: CrewmateItem[];
  visors: CrewmateItem[];
  selectedItems: {
    crewmate?: CrewmateItem;
    trouser?: CrewmateItem;
    pet?: CrewmateItem;
    hat?: CrewmateItem;
    visor?: CrewmateItem;
  };
  onSelectItem: (category: ItemCategory, item: CrewmateItem | null) => void;
}

const categories = [
  { key: 'crewmates' as const, label: 'Crewmate', icon: '👤' },
  { key: 'trousers' as const, label: 'Trousers', icon: '👖' },
  { key: 'pets' as const, label: 'Pets', icon: '🐕' },
  { key: 'hats' as const, label: 'Hats', icon: '🎩' },
  { key: 'visors' as const, label: 'Visors', icon: '🥽' },
];

export function CategorySelector({ 
  crewmates, 
  trousers, 
  pets, 
  hats, 
  visors, 
  selectedItems,
  onSelectItem 
}: CategorySelectorProps) {
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());

  const handleImageError = (itemId: string) => {
    setImageErrors(prev => new Set(prev).add(itemId));
  };

  const getItems = (category: ItemCategory): CrewmateItem[] => {
    switch (category) {
      case 'crewmates': return crewmates;
      case 'trousers': return trousers;
      case 'pets': return pets;
      case 'hats': return hats;
      case 'visors': return visors;
      default: return [];
    }
  };

  const getSelectedItem = (category: ItemCategory): CrewmateItem | undefined => {
    switch (category) {
      case 'crewmates': return selectedItems.crewmate;
      case 'trousers': return selectedItems.trouser;
      case 'pets': return selectedItems.pet;
      case 'hats': return selectedItems.hat;
      case 'visors': return selectedItems.visor;
      default: return undefined;
    }
  };

  const renderItemGrid = (category: ItemCategory) => {
    const items = getItems(category);
    const selectedItem = getSelectedItem(category);
    
    return (
      <div className="space-y-4">
        {/* Clear selection button for optional categories */}
        {category !== 'crewmates' && selectedItem && (
          <div className="flex justify-center">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onSelectItem(category, null)}
              className="text-xs"
            >
              Remove {categories.find(c => c.key === category)?.label}
            </Button>
          </div>
        )}

        <div className="grid grid-cols-4 gap-2">
          {items.map((item) => (
            <div
              key={item.id}
              className={cn(
                "relative group cursor-pointer transition-all duration-300",
                "border-2 rounded-lg overflow-hidden backdrop-blur-sm aspect-square",
                selectedItem?.id === item.id
                  ? "border-primary bg-primary/10 shadow-lg shadow-primary/25" 
                  : "border-muted/30 bg-card/20 hover:border-primary/50 hover:bg-card/40",
              )}
              onClick={() => onSelectItem(category, item)}
            >
              <div className="p-2 h-full flex items-center justify-center">
                {imageErrors.has(item.id) ? (
                  <div className="w-full h-full bg-muted rounded flex items-center justify-center text-xs text-muted-foreground">
                    No Image
                  </div>
                ) : (
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
                    onError={() => handleImageError(item.id)}
                    loading="lazy"
                  />
                )}
              </div>
              
              {/* Selection indicator */}
              {selectedItem?.id === item.id && (
                <div className="absolute top-1 right-1">
                  <div className="w-3 h-3 bg-primary rounded-full shadow-lg border-2 border-white" />
                </div>
              )}

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-space-purple to-space-blue bg-clip-text text-transparent mb-2">
          Customize Character
        </h2>
        <p className="text-sm text-muted-foreground">
          Choose items from each category to build your crewmate
        </p>
      </div>

      {/* Category Tabs */}
      <Card className="flex-1 bg-card/30 backdrop-blur-sm border-primary/20">
        <Tabs defaultValue="crewmates" className="h-full flex flex-col">
          <TabsList className="grid w-full grid-cols-5 bg-muted/20">
            {categories.map(({ key, label, icon }) => (
              <TabsTrigger 
                key={key} 
                value={key}
                className="text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <span className="hidden sm:inline">{label}</span>
                <span className="sm:hidden">{icon}</span>
              </TabsTrigger>
            ))}
          </TabsList>
          
          <div className="flex-1 overflow-hidden">
            {categories.map(({ key, label }) => (
              <TabsContent key={key} value={key} className="h-full m-0">
                <div className="h-full flex flex-col">
                  <div className="p-4 border-b border-border/50">
                    <h3 className="font-medium text-foreground">
                      Select {label}
                      {getSelectedItem(key) && (
                        <span className="ml-2 text-xs text-primary">
                          • {getSelectedItem(key)?.name}
                        </span>
                      )}
                    </h3>
                  </div>
                  
                  <ScrollArea className="flex-1">
                    <div className="p-4">
                      {renderItemGrid(key)}
                    </div>
                  </ScrollArea>
                </div>
              </TabsContent>
            ))}
          </div>
        </Tabs>
      </Card>
    </div>
  );
}