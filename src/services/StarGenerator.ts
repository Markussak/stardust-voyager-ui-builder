
import { StarData, StarType, StarDataTypeG } from '../types/stars';
import { starTypeG_Specifics, starLoreEntry_TypeG } from '../config/starsConfig';

// Generuje náhodný název hvězdy
const generateStarName = (): string => {
  const prefixes = ["Alpha", "Beta", "Gamma", "Delta", "Epsilon", "Sigma", "Tau"];
  const suffixes = ["Prime", "Major", "Minor", "A", "B", "Centauri"];
  const numbers = Math.floor(Math.random() * 999) + 1;
  
  const usePrefix = Math.random() > 0.5;
  const useSuffix = Math.random() > 0.7;
  
  let name = "";
  if (usePrefix) {
    name += `${prefixes[Math.floor(Math.random() * prefixes.length)]}-`;
  }
  
  name += numbers;
  
  if (useSuffix) {
    name += ` ${suffixes[Math.floor(Math.random() * suffixes.length)]}`;
  }
  
  return name;
};

// Generuje hvězdu daného typu
export const generateStar = (type: StarType, position?: { x: number, y: number }): StarData => {
  const id = `star_${Math.random().toString(36).substring(2, 9)}`;
  const name = generateStarName();
  
  // Základní velikost hvězdy v závislosti na typu
  let sizePx: number;
  switch (type) {
    case StarType.O_BlueGiant:
      sizePx = Math.floor(Math.random() * 500) + 1000; // 1000-1500
      break;
    case StarType.A_White:
      sizePx = Math.floor(Math.random() * 300) + 800; // 800-1100
      break;
    case StarType.G_YellowMainSequence:
      sizePx = Math.floor(Math.random() * 300) + 700; // 700-1000
      break;
    case StarType.M_RedDwarf:
      sizePx = Math.floor(Math.random() * 200) + 500; // 500-700
      break;
    case StarType.NeutronStar:
      sizePx = Math.floor(Math.random() * 100) + 400; // 400-500
      break;
    case StarType.BlackHole:
      sizePx = Math.floor(Math.random() * 200) + 600; // 600-800
      break;
    case StarType.BinarySystem:
    case StarType.TrinarySystem:
      sizePx = Math.floor(Math.random() * 400) + 800; // 800-1200
      break;
    default:
      sizePx = Math.floor(Math.random() * 300) + 700; // Výchozí hodnota
  }
  
  // Základní hvězda
  const star: StarData = {
    id,
    name,
    type,
    sizePx,
    position,
    activityLevel: Math.random(), // 0-1
  };
  
  return star;
};

// Generuje hvězdu typu G s jejími specifiky
export const generateStarTypeG = (position?: { x: number, y: number }): StarDataTypeG => {
  const baseStar = generateStar(StarType.G_YellowMainSequence, position);
  
  const starG: StarDataTypeG = {
    ...baseStar,
    type: StarType.G_YellowMainSequence,
    specificParams: starTypeG_Specifics,
    loreEntry: starLoreEntry_TypeG,
    activeFeatures: {
      sunspots: [],
      solarFlares: [],
    }
  };
  
  return starG;
};

// Generuje systém s hvězdou typu G a planetami
export const generateGTypeStarSystem = (position?: { x: number, y: number }): {
  star: StarDataTypeG,
  // další data systému by byla zde
} => {
  const star = generateStarTypeG(position);
  
  return {
    star
  };
};
