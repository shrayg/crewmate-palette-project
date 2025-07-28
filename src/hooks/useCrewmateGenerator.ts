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

  const downloadCharacter = useCallback(async () => {
    if (!currentCharacter.crewmate) return;
    
    try {
      // Create a canvas to render the character
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      // Set canvas size
      const canvasSize = 600;
      canvas.width = canvasSize;
      canvas.height = canvasSize;
      
      // Set background to transparent
      ctx.clearRect(0, 0, canvasSize, canvasSize);
      
      // Helper function to load and draw image
      const loadAndDrawImage = (src: string, x: number, y: number, width: number, height: number): Promise<void> => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.crossOrigin = 'anonymous';
          img.onload = () => {
            try {
              ctx.drawImage(img, x, y, width, height);
              resolve();
            } catch (e) {
              reject(e);
            }
          };
          img.onerror = () => {
            reject(new Error(`Failed to load image: ${src}`));
          };
          img.src = src;
        });
      };
      
      // Calculate dimensions for main character
      const mainSize = canvasSize * 0.7;
      const mainX = (canvasSize - mainSize) / 2;
      const mainY = (canvasSize - mainSize) / 2;
      
      // Draw layers sequentially
      if (currentCharacter.crewmate) {
        await loadAndDrawImage(currentCharacter.crewmate.imageUrl, mainX, mainY, mainSize, mainSize);
      }
      
      if (currentCharacter.trouser) {
        await loadAndDrawImage(currentCharacter.trouser.imageUrl, mainX, mainY, mainSize, mainSize);
      }
      
      if (currentCharacter.hat) {
        await loadAndDrawImage(currentCharacter.hat.imageUrl, mainX, mainY, mainSize, mainSize);
      }
      
      if (currentCharacter.visor) {
        await loadAndDrawImage(currentCharacter.visor.imageUrl, mainX, mainY, mainSize, mainSize);
      }
      
      // Pet positioned in bottom right
      if (currentCharacter.pet) {
        const petSize = canvasSize * 0.15;
        const petX = canvasSize - petSize - 30;
        const petY = canvasSize - petSize - 30;
        await loadAndDrawImage(currentCharacter.pet.imageUrl, petX, petY, petSize, petSize);
      }
      
      // Create download link
      canvas.toBlob((blob) => {
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