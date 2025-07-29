import { useState, useCallback } from 'react';
import { CrewmateData, CrewmateItem, ItemCategory, CurrentCharacter } from '@/types';
import { crewmateData } from '@/data/crewmateData';
import html2canvas from 'html2canvas';

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

  const downloadCharacter = useCallback(async () => {
    if (!currentCharacter.crewmate) return;
    
    try {
      // Find the character preview element
      const previewElement = document.querySelector('[data-character-preview]') as HTMLElement;
      if (!previewElement) {
        console.error('Character preview element not found');
        return;
      }
      
      // Capture the element at higher resolution to match preview quality
      const originalCanvas = await html2canvas(previewElement, {
        backgroundColor: 'transparent',
        scale: 2, // Higher resolution for better quality
        logging: false,
        useCORS: true,
        allowTaint: false,
        width: 320, // Match the preview container width
        height: 320, // Match the preview container height
      });
      
      // Create square canvas with horizontal padding
      const squareCanvas = document.createElement('canvas');
      const squareSize = Math.max(originalCanvas.width, originalCanvas.height);
      squareCanvas.width = squareSize;
      squareCanvas.height = squareSize;
      const ctx = squareCanvas.getContext('2d')!;
      
      // Center the original canvas horizontally with transparent padding
      const offsetX = (squareSize - originalCanvas.width) / 2;
      const offsetY = (squareSize - originalCanvas.height) / 2;
      ctx.drawImage(originalCanvas, offsetX, offsetY);
      
      // Download the square canvas as PNG
      squareCanvas.toBlob((blob) => {
        if (!blob) return;
        
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `crewmate-${currentCharacter.crewmate!.name.toLowerCase()}-${Date.now()}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }, 'image/png');
      
    } catch (error) {
      console.error('Error downloading character:', error);
      // Fallback to JSON download if canvas fails
      const characterData = {
        timestamp: new Date().toISOString(),
        character: {
          crewmate: currentCharacter.crewmate?.name,
          trouser: currentCharacter.trouser?.name || null,
          hat: currentCharacter.hat?.name || null,
          pet: currentCharacter.pet?.name || null,
          visor: currentCharacter.visor?.name || null,
        }
      };
      
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
    }
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