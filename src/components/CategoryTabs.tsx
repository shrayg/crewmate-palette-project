import { Button } from '@/components/ui/button';
import { ItemCategory } from '@/types';
import { cn } from '@/lib/utils';

interface CategoryTabsProps {
  activeCategory: ItemCategory;
  onCategoryChange: (category: ItemCategory) => void;
}

const categories: { key: ItemCategory; label: string }[] = [
  { key: 'crewmates', label: 'Crewmate' },
  { key: 'trousers', label: 'Trousers' },
  { key: 'pets', label: 'Pets' },
  { key: 'hats', label: 'Hats' },
  { key: 'visors', label: 'Visors' },
];

export function CategoryTabs({ activeCategory, onCategoryChange }: CategoryTabsProps) {
  return (
    <div className="flex gap-2 mb-6 flex-wrap justify-center">
      {categories.map(({ key, label }) => (
        <Button
          key={key}
          variant="tab"
          size="sm"
          onClick={() => onCategoryChange(key)}
          className={cn(
            "transition-all duration-300",
            activeCategory === key && "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
          )}
        >
          {label}
        </Button>
      ))}
    </div>
  );
}