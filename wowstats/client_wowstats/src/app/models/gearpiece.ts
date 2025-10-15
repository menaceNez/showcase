export interface Gearpiece {
  name: string;
  itemID: number;
  mediaID: number;
  invintory_type: string;
  subclass_name: string;
  required_level: number;
  quality: string;
  mediaLink: string;
  stats: {
    stamina: number,
    strength: number,
    intellect: number,
    agility: number,
    spirit: number,
    armor: number,
    dps: number,
  }
}