import { useState, useCallback } from 'react';
import { CrewmateData, CrewmateItem, ItemCategory, GeneratedCharacter } from '@/types';
import { crewmateData } from '@/data/crewmateData';

export function useCrewmateGenerator() {
  const [data, setData] = useState<CrewmateData>(crewmateData);
  const [generatedCharacters, setGeneratedCharacters] = useState<GeneratedCharacter[]>([]);
  const [activeCategory, setActiveCategory] = useState<ItemCategory>('crewmates');

  const toggleItem = useCallback((category: ItemCategory, itemId: string) => {
    setData(prev => ({
      ...prev,
      [category]: prev[category].map(item =>
        item.id === itemId 
          ? { ...item, enabled: !item.enabled }
          : item
      )
    }));
  }, []);

  const toggleAlwaysInclude = useCallback((category: ItemCategory, itemId: string) => {
    setData(prev => ({
      ...prev,
      [category]: prev[category].map(item =>
        item.id === itemId 
          ? { ...item, alwaysInclude: !item.alwaysInclude }
          : item
      )
    }));
  }, []);

  const disableAllInCategory = useCallback((category: ItemCategory) => {
    setData(prev => ({
      ...prev,
      [category]: prev[category].map(item => ({ ...item, enabled: false }))
    }));
  }, []);

  const clearAllSelections = useCallback(() => {
    setData(crewmateData);
    setGeneratedCharacters([]);
  }, []);

  const generateCharacters = useCallback((count: number = 10) => {
    const enabledCrewmates = data.crewmates.filter(item => item.enabled);
    const enabledTrousers = data.trousers.filter(item => item.enabled);
    const enabledPets = data.pets.filter(item => item.enabled);
    const enabledHats = data.hats.filter(item => item.enabled);
    const enabledVisors = data.visors.filter(item => item.enabled);
    
    if (enabledCrewmates.length === 0) {
      return;
    }

    const characters: GeneratedCharacter[] = [];
    
    for (let i = 0; i < count; i++) {
      const crewmate = enabledCrewmates[Math.floor(Math.random() * enabledCrewmates.length)];
      
      const character: GeneratedCharacter = {
        crewmate,
        trouser: enabledTrousers.length > 0 && Math.random() > 0.3 
          ? enabledTrousers[Math.floor(Math.random() * enabledTrousers.length)]
          : undefined,
        pet: enabledPets.length > 0 && Math.random() > 0.5
          ? enabledPets[Math.floor(Math.random() * enabledPets.length)]
          : undefined,
        hat: enabledHats.length > 0 && Math.random() > 0.4
          ? enabledHats[Math.floor(Math.random() * enabledHats.length)]
          : undefined,
        visor: enabledVisors.length > 0 && Math.random() > 0.7
          ? enabledVisors[Math.floor(Math.random() * enabledVisors.length)]
          : undefined,
      };
      
      // Handle always include items
      data.trousers.forEach(item => {
        if (item.alwaysInclude && item.enabled) {
          character.trouser = item;
        }
      });
      
      data.pets.forEach(item => {
        if (item.alwaysInclude && item.enabled) {
          character.pet = item;
        }
      });
      
      data.hats.forEach(item => {
        if (item.alwaysInclude && item.enabled) {
          character.hat = item;
        }
      });
      
      data.visors.forEach(item => {
        if (item.alwaysInclude && item.enabled) {
          character.visor = item;
        }
      });
      
      characters.push(character);
    }
    
    setGeneratedCharacters(characters);
  }, [data]);

  const downloadCharacters = useCallback(() => {
    // In a real implementation, this would create a zip file or individual images
    // For now, we'll just create a JSON with the character data
    const dataStr = JSON.stringify(generatedCharacters, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = 'crewmate-characters.json';
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  }, [generatedCharacters]);

  return {
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
  };
}