import { CrewmateData } from '@/types';

// Generate crewmates data (18 colors)
const crewmates = Array.from({ length: 18 }, (_, i) => ({
  id: `crewmate-${i}`,
  name: getCrewmateName(i),
  imageUrl: `/crewmates/${i}.png`,
  enabled: true,
}));

// Generate trousers data (16 items)
const trousers = Array.from({ length: 16 }, (_, i) => ({
  id: `trouser-${i + 1}`,
  name: `Trouser ${i + 1}`,
  imageUrl: `/trousers/${i + 1}.png`,
  enabled: true,
}));

// Generate pets data (15 items)
const pets = Array.from({ length: 15 }, (_, i) => ({
  id: `pet-${i + 1}`,
  name: `Pet ${i + 1}`,
  imageUrl: `/pets/${i + 1}.png`,
  enabled: true,
}));

// Generate hats data (68 items)
const hats = Array.from({ length: 68 }, (_, i) => ({
  id: `hat-${i + 1}`,
  name: `Hat ${i + 1}`,
  imageUrl: `/hats/${i + 1}.png`,
  enabled: true,
}));

// Visors data (3 items with specific names)
const visors = [
  {
    id: 'visor-angery',
    name: 'Angery',
    imageUrl: `/visors/angery.png`,
    enabled: true,
  },
  {
    id: 'visor-note-2-self',
    name: 'Note 2 Self',
    imageUrl: `/visors/note_2_self.png`,
    enabled: true,
  },
  {
    id: 'visor-safe-not-sorry',
    name: 'Safe Not Sorry',
    imageUrl: `/visors/safe_not_sorry.png`,
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