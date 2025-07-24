import { CrewmateItem, ItemCategory } from '@/types';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

interface ItemGridProps {
  items: CrewmateItem[];
  category: ItemCategory;
  onToggleItem: (itemId: string) => void;
  onToggleAlwaysInclude: (itemId: string) => void;
  onDisableAll: () => void;
}

export function ItemGrid({ 
  items, 
  category, 
  onToggleItem, 
  onToggleAlwaysInclude,
  onDisableAll 
}: ItemGridProps) {
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());
  const { toast } = useToast();

  const handleImageError = (itemId: string) => {
    setImageErrors(prev => new Set(prev).add(itemId));
  };

  const handleDisableAll = () => {
    onDisableAll();
    toast({
      title: "Items Disabled",
      description: `All ${category} have been disabled.`,
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-3 flex-wrap justify-center">
        <Button 
          variant="spaceOutline" 
          size="sm"
          onClick={handleDisableAll}
          className="text-xs"
        >
          Disable All
        </Button>
        {category !== 'crewmates' && (
          <Button 
            variant="outline" 
            size="sm"
            className="text-xs"
            onClick={() => {
              items.forEach(item => {
                if (item.enabled) {
                  onToggleAlwaysInclude(item.id);
                }
              });
            }}
          >
            Always Include
          </Button>
        )}
      </div>

      <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-3 max-w-6xl mx-auto">
        {items.map((item) => (
          <div
            key={item.id}
            className={cn(
              "relative group cursor-pointer transition-all duration-300 transform hover:scale-105",
              "border-2 rounded-lg overflow-hidden backdrop-blur-sm",
              item.enabled 
                ? "border-primary/50 bg-card/50 shadow-lg hover:shadow-primary/25 hover:border-primary" 
                : "border-muted/30 bg-muted/20 opacity-50",
              item.alwaysInclude && "ring-2 ring-accent ring-offset-2 ring-offset-background"
            )}
            onClick={() => onToggleItem(item.id)}
          >
            <div className="aspect-square p-2 flex items-center justify-center">
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
            
            {/* Status indicators */}
            <div className="absolute top-1 right-1 flex flex-col gap-1">
              {item.enabled && (
                <div className="w-2 h-2 bg-green-500 rounded-full shadow-lg" />
              )}
              {item.alwaysInclude && (
                <div className="w-2 h-2 bg-accent rounded-full shadow-lg" />
              )}
            </div>

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        ))}
      </div>
    </div>
  );
}