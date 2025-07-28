import { CrewmateData } from '@/types';

// Available crewmate colors
const crewmates = Array.from({ length: 18 }, (_, i) => ({
  id: `crewmate-${i}`,
  name: getCrewmateName(i),
  imageUrl: `/crewmates/crewmate_${i}.png`,
  enabled: true,
}));

// Available trousers
const trousers = Array.from({ length: 16 }, (_, i) => ({
  id: `trouser-${i + 1}`,
  name: `Trouser ${i + 1}`,
  imageUrl: `/trousers/trousers_${i + 1}.png`,
  enabled: true,
}));

// Available pets
const pets = Array.from({ length: 15 }, (_, i) => ({
  id: `pet-${i + 1}`,
  name: `Pet ${i + 1}`,
  imageUrl: `/pets/pets_${i + 1}.png`,
  enabled: true,
}));

// Available hats
const hats = Array.from({ length: 68 }, (_, i) => ({
  id: `hat-${i + 1}`,
  name: `Hat ${i + 1}`,
  imageUrl: `/hats/hats_${i + 1}.png`,
  enabled: true,
}));

// Available visors
const visors = [
  {
    id: 'visor-angery',
    name: 'Angery',
    imageUrl: '/visors/visors_angery.png',
    enabled: true,
  },
  {
    id: 'visor-note-2-self',
    name: 'Note 2 Self',
    imageUrl: '/visors/visors_note_2_self.png',
    enabled: true,
  },
  {
    id: 'visor-safe-not-sorry',
    name: 'Safe Not Sorry',
    imageUrl: '/visors/visors_safe_not_sorry.png',
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