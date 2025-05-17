
import { 
  StarGeneralDesignPrinciples, 
  StarType, 
  StarTypeG_Specifics,
  StarG_SunspotType,
  StarG_FaculaeType,
  StarG_SolarFlareType,
  StarG_CME_Type,
  StarLoreEntry
} from '../types/stars';

// Obecné principy designu hvězd
export const starGeneralDesignPrinciples: StarGeneralDesignPrinciples = {
  scaleAndSize_SystemMap_Px: [500, 1500],
  dynamicAppearance: "Hvězdy nesmí být statické koule. Jejich povrch musí být neustále v dynamickém pohybu, s viditelnými erupcemi, protuberancemi, slunečními skvrnami a vířením plazmy. Animace jsou klíčové.",
  systemLightingSource: "Hvězda je primárním zdrojem světla v systému. Její barva a intenzita ovlivní vzhled a stínování planet, asteroidů, lodí a dalších objektů. Světlo by mělo vrhat dynamické pixel artové stíny.",
  hazardProximity: {
    enabled: true,
    damageType: 'Heat',
    damageIncreaseFactor: 0.1,
    visualEffect_HeatHaze: {
      shaderAsset: "assets/shaders/effects/heat_haze_distortion.frag",
      intensityFactor: 0.05,
      animationSpeed: 1.0
    },
    specialProtectionRequired: "ThermalShieldingModule_MkII"
  },
  resourceCollection: {
    type: 'SolarWindParticles',
    collectionModuleRequired: "ParticleScoop_Module",
    riskFactor: 0.3
  },
  layeredPixelArtStructure: {
    core_Photosphere: "Nejjasnější, téměř oslnivá centrální část, může mít jemný bloom efekt.",
    chromosphere: "Viditelná jako texturovaná, dynamická vrstva nad fotosférou, s granulací a fakulemi.",
    corona: "Rozsáhlá, řídká vnější atmosféra hvězdy, viditelná jako nepravidelné halo nebo komplexní plazmatické struktury (paprsky, smyčky), často s animovanými proudy a výtrysky.",
    surfaceDetails: ["SolarFlares_Protuberances", "Sunspots", "Faculae_BrightRegions", "PlasmaGranulation", "CoronalMassEjections_CME"]
  },
  soundDesign_Ambient: "Hluboké, nízkofrekvenční pulzující hučení (závislé na velikosti/typu hvězdy), občasné praskání nebo energetické výboje (pro erupce a aktivitu)."
};

// Specifické definice pro hvězdu třídy G
export const starTypeG_Specifics: StarTypeG_Specifics = {
  photosphere: {
    granulationTexture: {
      cellSizePxRange: [4, 8],
      animation: { 
        frameCount: 32, 
        speed: 0.5, 
        loop: true, 
        spritesheetUrl: "/assets/game/stars.png" 
      },
      colorPalette: { 
        cellBright: "#FFFF00", 
        cellMedium: "#FFEE00", 
        cellDarkEdge: "#FFDD00" 
      }
    },
    limbDarkeningFactor: 0.3
  },
  sunspotConfig: {
    maxActiveSpots: 5,
    spotGenerationRules: "Generovat 1-5 skvrn náhodně na povrchu, s mírnou preferencí pro rovníkové oblasti. Skvrny mají definovanou životnost a mohou se pomalu měnit.",
    spots: [
      { 
        type: StarG_SunspotType.Simple_Round_Large_WithPenumbra, 
        sizePxRange: [50, 100], 
        position: { lat: 0, lon: 0 }, // Bude generováno dynamicky
        animation_Movement: { frameCount: 1, speed: 0, loop: false },
        textureAsset_Template: "/assets/game/star-cluster.png", 
        variantCount: 3, 
        penumbraColor: "#AA7700", 
        umbraColor: "#884400" 
      },
      // Pro ukázku přidáváme jen jeden typ skvrny, v plné implementaci by bylo 10+ typů
    ]
  },
  faculaeConfig: {
    appearanceChanceNearSunspots: 0.7,
    faculaeTypes: [
      { 
        type: StarG_FaculaeType.Reticulated_Network, 
        areaCoveragePercent: 0.1, 
        brightnessFactor: 1.2, 
        animation_ShapeIntensity: { frameCount: 16, speed: 0.3, loop: true }, 
        textureAsset_Template: "/assets/game/planet.png", 
        variantCount: 2, 
        color: "#FFFFBB" 
      },
      // Další typy by byly přidány v plné implementaci
    ]
  },
  solarFlareConfig: {
    maxActiveFlares: 3,
    flareGenerationRules: "Erupce se objevují náhodně, častěji z oblastí s aktivními slunečními skvrnami. Mají definovaný cyklus života.",
    flareTypes: [
      { 
        type: StarG_SolarFlareType.Arch_Symmetrical, 
        sizeScaleRelativeToStarDiameter: [0.1, 0.15], 
        animation: { 
          frameCount: 48, 
          speed: 1.0, 
          loop: false, 
          spritesheetUrl: "/assets/game/star-cluster.png" 
        }, 
        colorPalette: { base: "#FF8C00", highlight: "#FFA500" }, 
        textureStyle: "Fibrous_Plasma", 
        spawnChancePerTimeUnit: 0.05, 
        durationRangeSeconds: [60, 180], 
        soundEffect_Eruption: "sfx/stars/solar_flare_medium.wav" 
      },
      // Další typy by byly přidány v plné implementaci
    ]
  },
  cmeConfig: {
    cmeTypes: [
      { 
        type: StarG_CME_Type.Directional_Jet, 
        animation: { 
          frameCount: 32, 
          speed: 1.5, 
          loop: false, 
          spritesheetUrl: "/assets/game/planet.png" 
        }, 
        color: "#FFFFE0", 
        sizeScaleAtMax: 3.0, 
        speed: 50, 
        gameEffect: "SensorInterference_Medium", 
        spawnChance_Rare: 0.01, 
        soundEffect_Blast: "sfx/stars/cme_blast_powerful.wav" 
      },
      // Další typy by byly přidány v plné implementaci
    ]
  },
  coronaDetails: {
    textureStyle: "Dynamic_Streamers",
    animation: { 
      frameCount: 32, 
      speed: 0.2, 
      loop: true, 
      spritesheetUrl: "/assets/game/stars.png" 
    },
    colorRange: ["#FFFFE0", "#FFFFAA"],
    extentFactor: 1.5, // Sahá 1.5x poloměr hvězdy od povrchu
    densityVariation: true
  },
  lensflareEffect: {
    shaderAsset: "assets/shaders/effects/lens_flare_pixel.frag",
    color: "#FFFFFF",
    intensity: 0.3,
    shapeElements: ["Halo", "Streaks", "PolygonalGhosts"]
  }
};

// Lore pro hvězdu třídy G
export const starLoreEntry_TypeG: StarLoreEntry = {
  title: "Hvězda Třídy G (Žlutý Trpaslík)",
  generalDescription: "Hvězdy třídy G, často nazývané 'žlutí trpaslíci' nebo 'hvězdy hlavní posloupnosti typu G', jsou stabilní hvězdy podobné Slunci v naší domovské soustavě. Vyzařují převážně žluté a bílé světlo a jsou známé svou dlouhou životností, která se pohybuje v řádu miliard let. Jejich povrchová teplota se obvykle pohybuje mezi 5,300 a 6,000 Kelviny.",
  lifeSupportingPotential: "Díky své stabilitě a typu vyzařované energie jsou hvězdy třídy G považovány za jedny z nejlepších kandidátů pro vznik a udržení života na planetách obíhajících v jejich obyvatelné zóně. Mnoho známých civilizací v galaxii pochází právě ze systémů s hvězdou třídy G.",
  activityCycleInfo: "Podobně jako jiné hvězdy, i hvězdy třídy G procházejí cykly sluneční aktivity, obvykle trvající několik pozemských let. Během maxima aktivity se zvyšuje počet slunečních skvrn, erupcí a koronálních výronů hmoty, což může představovat riziko pro nechráněné lodě a planetární infrastrukturu.",
  explorerNotes: [
    "'Pokud hledáš planetu k osídlení, systém s Géčkem je vždycky dobrá sázka. Jen si dej pozor na občasné sluneční bouře.' - Kapitán Rex Nebula",
    "'Fascinující dynamika povrchu! Granulace, fakule, neustálý tanec plazmy. Každá G-hvězda je unikátní umělecké dílo přírody.' - Dr. Aris Thorne, Xenofyzik"
  ]
};

// Mapování typu hvězdy na barvu pro zobrazení v galaxii
export const starTypeColors = {
  [StarType.M_RedDwarf]: "#FF6666",
  [StarType.G_YellowMainSequence]: "#FFFF99",
  [StarType.A_White]: "#DDDDFF",
  [StarType.O_BlueGiant]: "#99CCFF",
  [StarType.NeutronStar]: "#FFFFFF",
  [StarType.BlackHole]: "#333333",
  [StarType.BinarySystem]: "#FFCC99",
  [StarType.TrinarySystem]: "#CCFF99"
};
