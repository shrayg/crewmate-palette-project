import { CrewmateData } from '@/types';

// Available crewmate colors
const crewmates = [
  { id: 'crewmate-red', name: 'Red', imageUrl: '/crewmates/red.png', enabled: true },
  { id: 'crewmate-blue', name: 'Blue', imageUrl: '/crewmates/blue.png', enabled: true },
  { id: 'crewmate-green', name: 'Green', imageUrl: '/crewmates/green.png', enabled: true },
  { id: 'crewmate-pink', name: 'Pink', imageUrl: '/crewmates/pink.png', enabled: true },
  { id: 'crewmate-orange', name: 'Orange', imageUrl: '/crewmates/orange.png', enabled: true },
  { id: 'crewmate-yellow', name: 'Yellow', imageUrl: '/crewmates/yellow.png', enabled: true },
];

// Available trousers (only 1 exists)
const trousers = [
  { id: 'trouser-1', name: 'Trouser 1', imageUrl: '/trousers/1.png', enabled: true },
];

// Available pets (only 1 exists)
const pets = [
  { id: 'pet-1', name: 'Pet 1', imageUrl: '/pets/1.png', enabled: true },
];

// Available hats (only 1 exists)
const hats = [
  { id: 'hat-1', name: 'Hat 1', imageUrl: '/hats/1.png', enabled: true },
];

// Available visors (only 1 exists)
const visors = [
  {
    id: 'visor-angery',
    name: 'Angery',
    imageUrl: '/visors/angery.png',
    enabled: true,
  },
];

function getCrewmateName(index: number): string {
  const colors = [
    'Red', 'Blue', 'Green', 'Pink', 'Orange', 'Yellow', 'Black', 'White',
    'Purple', 'Brown', 'Cyan', 'Lime', 'Maroon', 'Rose', 'Banana', 'Gray',
    'Tan', 'Coral'
  ];
  return colors[index] || `Color ${index}`;
}

export const crewmateData: CrewmateData = {
  crewmates,
  trousers,
  pets,
  hats,
  visors,
};