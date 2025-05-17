
import { Galaxy, StarSystem, Hyperlane, GalaxyShape, StarType, Vector2D } from '../types/galaxy';
import { galaxyGenerationConfig } from '../config/galaxyConfig';

// Pomocné funkce pro generování galaxie
const getRandomFromArray = <T>(array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)];
};

const getStarTypeByProbability = (): StarType => {
  const totalWeight = galaxyGenerationConfig.starTypeDistribution.reduce(
    (sum, item) => sum + item.probabilityWeight, 0
  );
  
  const randomValue = Math.random() * totalWeight;
  let currentWeight = 0;
  
  for (const item of galaxyGenerationConfig.starTypeDistribution) {
    currentWeight += item.probabilityWeight;
    if (randomValue <= currentWeight) {
      return item.type;
    }
  }
  
  return StarType.G_YellowMainSequence; // Fallback
};

const generateSystemName = (): string => {
  const prefixes = ["Alpha", "Beta", "Gamma", "Delta", "Epsilon", "Zeta", "Eta", "Theta"];
  const suffixes = ["Prime", "Minor", "Major", "Secundus", "Tertius", "IV", "V", "VI"];
  const numbers = Math.floor(Math.random() * 999) + 1;
  
  return `${getRandomFromArray(prefixes)}-${numbers}${Math.random() > 0.5 ? ` ${getRandomFromArray(suffixes)}` : ''}`;
};

const generateSystems = (count: number, shape: GalaxyShape): StarSystem[] => {
  const systems: StarSystem[] = [];
  const mapSize = 2000; // Velikost mapy v pixelech
  const centerX = mapSize / 2;
  const centerY = mapSize / 2;
  
  for (let i = 0; i < count; i++) {
    // Generovat pozici podle tvaru galaxie
    let position: Vector2D;
    
    switch (shape) {
      case GalaxyShape.Spiral_2Arm:
        // Generování ve spirále se 2 rameny
        const angle = Math.random() * Math.PI * 2;
        const armOffset = Math.random() > 0.5 ? 0 : Math.PI;
        const distance = Math.random() * mapSize * 0.4;
        const spiralFactor = 0.3;
        
        const spiralAngle = angle + armOffset + distance * spiralFactor;
        position = {
          x: centerX + Math.cos(spiralAngle) * distance,
          y: centerY + Math.sin(spiralAngle) * distance
        };
        break;
        
      case GalaxyShape.Elliptical:
        // Generování v eliptickém tvaru
        const r = Math.sqrt(Math.random()) * mapSize * 0.4;
        const theta = Math.random() * Math.PI * 2;
        position = {
          x: centerX + Math.cos(theta) * r,
          y: centerY + Math.sin(theta) * r * 0.7 // 0.7 pro eliptický tvar
        };
        break;
        
      default:
        // Náhodné rozložení pro ostatní tvary
        position = {
          x: Math.random() * mapSize,
          y: Math.random() * mapSize
        };
    }
    
    const starType = getStarTypeByProbability();
    const planets = Math.floor(Math.random() * 13) + 2; // 2-15 planet
    
    systems.push({
      id: `system_${i}`,
      name: generateSystemName(),
      position,
      starType,
      explored: i === 0, // Začínáme s jedním prozkoumaným systémem
      planets,
      anomalyPresent: Math.random() < 0.15,
      resources: []
    });
  }
  
  return systems;
};

const generateHyperlanes = (systems: StarSystem[]): Hyperlane[] => {
  const hyperlanes: Hyperlane[] = [];
  const maxDistance = 300; // Maximální vzdálenost pro vytvoření hyperlane
  
  // Pro každý systém vytvoříme několik spojení s nejbližšími systémy
  systems.forEach(system => {
    // Najdeme nejbližší systémy
    const nearestSystems = systems
      .filter(s => s.id !== system.id)
      .map(s => ({
        system: s,
        distance: Math.sqrt(
          Math.pow(s.position.x - system.position.x, 2) + 
          Math.pow(s.position.y - system.position.y, 2)
        )
      }))
      .filter(s => s.distance < maxDistance)
      .sort((a, b) => a.distance - b.distance)
      .slice(0, 3); // Maximálně 3 spojení na systém
      
    // Vytvoříme hyperlanes
    nearestSystems.forEach(nearest => {
      // Zkontrolujeme, zda už tato hyperlane neexistuje
      const exists = hyperlanes.some(h => 
        (h.fromSystemId === system.id && h.toSystemId === nearest.system.id) ||
        (h.fromSystemId === nearest.system.id && h.toSystemId === system.id)
      );
      
      if (!exists) {
        hyperlanes.push({
          fromSystemId: system.id,
          toSystemId: nearest.system.id,
          danger: Math.random() < 0.2 ? 'Dangerous' : 'Safe'
        });
      }
    });
  });
  
  return hyperlanes;
};

export const generateGalaxy = (shape: GalaxyShape = galaxyGenerationConfig.defaultGalaxyShape): Galaxy => {
  const [minSystems, maxSystems] = galaxyGenerationConfig.starSystemCountRange;
  const systemCount = Math.floor(Math.random() * (maxSystems - minSystems + 1)) + minSystems;
  
  const systems = generateSystems(systemCount, shape);
  const hyperlanes = generateHyperlanes(systems);
  
  // Vybereme náhodný systém jako počáteční pozici hráče
  const playerSystem = systems[0]; // První systém použijeme jako startovní
  playerSystem.explored = true; // Startovní systém je vždy prozkoumaný
  
  return {
    systems,
    hyperlanes,
    shape,
    playerPosition: playerSystem.id
  };
};
