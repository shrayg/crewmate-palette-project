import { useState, useCallback } from 'react';
import { CrewmateData, CrewmateItem, ItemCategory, CurrentCharacter } from '@/types';
import { crewmateData } from '@/data/crewmateData';

export function useCrewmateGenerator() {
  const [data] = useState<CrewmateData>(crewmateData);
  const [currentCharacter, setCurrentCharacter] = useState<CurrentCharacter>({});

  const selectItem = useCallback((category: ItemCategory, item: CrewmateItem | null) => {
    setCurrentCharacter(prev => {
      const newCharacter = { ...prev };
      
      switch (category) {
        case 'crewmates':
          newCharacter.crewmate = item || undefined;
          break;
        case 'trousers':
          newCharacter.trouser = item || undefined;
          break;
        case 'pets':
          newCharacter.pet = item || undefined;
          break;
        case 'hats':
          newCharacter.hat = item || undefined;
          break;
        case 'visors':
          newCharacter.visor = item || undefined;
          break;
      }
      
      return newCharacter;
    });
  }, []);

  const randomizeCharacter = useCallback(() => {
    const newCharacter: CurrentCharacter = {};
    
    // Always select a random crewmate
    const crewmates = data.crewmates;
    if (crewmates.length > 0) {
      newCharacter.crewmate = crewmates[Math.floor(Math.random() * crewmates.length)];
    }
    
    // Randomly select other items (with probability)
    if (data.trousers.length > 0 && Math.random() > 0.3) {
      newCharacter.trouser = data.trousers[Math.floor(Math.random() * data.trousers.length)];
    }
    
    if (data.pets.length > 0 && Math.random() > 0.5) {
      newCharacter.pet = data.pets[Math.floor(Math.random() * data.pets.length)];
    }
    
    if (data.hats.length > 0 && Math.random() > 0.4) {
      newCharacter.hat = data.hats[Math.floor(Math.random() * data.hats.length)];
    }
    
    if (data.visors.length > 0 && Math.random() > 0.7) {
      newCharacter.visor = data.visors[Math.floor(Math.random() * data.visors.length)];
    }
    
    setCurrentCharacter(newCharacter);
  }, [data]);

  const clearCharacter = useCallback(() => {
    setCurrentCharacter({});
  }, []);

  const downloadCharacter = useCallback(() => {
    if (!currentCharacter.crewmate) return;
    
    // Create character data object
    const characterData = {
      timestamp: new Date().toISOString(),
      character: {
        crewmate: currentCharacter.crewmate?.name,
        trouser: currentCharacter.trouser?.name || null,
        hat: currentCharacter.hat?.name || null,
        pet: currentCharacter.pet?.name || null,
        visor: currentCharacter.visor?.name || null,
      },
      imageUrls: {
        crewmate: currentCharacter.crewmate?.imageUrl,
        trouser: currentCharacter.trouser?.imageUrl || null,
        hat: currentCharacter.hat?.imageUrl || null,
        pet: currentCharacter.pet?.imageUrl || null,
        visor: currentCharacter.visor?.imageUrl || null,
      }
    };
    
    // Create and download JSON file
    const dataStr = JSON.stringify(characterData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `crewmate-${currentCharacter.crewmate.name.toLowerCase()}-${Date.now()}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, [currentCharacter]);

  return {
    data,
    currentCharacter,
    selectItem,
    randomizeCharacter,
    clearCharacter,
    downloadCharacter,
  };
}