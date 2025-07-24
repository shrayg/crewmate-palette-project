export interface CrewmateItem {
  id: string;
  name: string;
  imageUrl: string;
  enabled: boolean;
  alwaysInclude?: boolean;
}

export interface CrewmateData {
  crewmates: CrewmateItem[];
  trousers: CrewmateItem[];
  pets: CrewmateItem[];
  hats: CrewmateItem[];
  visors: CrewmateItem[];
}

export type ItemCategory = 'crewmates' | 'trousers' | 'pets' | 'hats' | 'visors';

export interface CurrentCharacter {
  crewmate?: CrewmateItem;
  trouser?: CrewmateItem;
  pet?: CrewmateItem;
  hat?: CrewmateItem;
  visor?: CrewmateItem;
}