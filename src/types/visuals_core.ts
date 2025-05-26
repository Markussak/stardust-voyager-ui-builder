// src/types/visuals_core.ts

// Section I: Posílení Základní Filozofie Pixel Artu
export interface PixelArtPrinciple {
    title_cz: string;
    description_cz: string;
    ai_implementation_note_cz: string;
}

export interface PixelArtCorePhilosophy {
    principle_PixelSingificance: PixelArtPrinciple;
    principle_RealismThroughAbstraction: PixelArtPrinciple;
    principle_TexturedDepth: PixelArtPrinciple;
    principle_PixelGridFeel: PixelArtPrinciple;
}

// Section VII: Obecné Pixel Art Techniky pro Realismus a Detail
export interface AdvancedDitheringParams {
    purpose_cz: string[];
    patternExamples: Array<'Bayer_4x4' | 'Bayer_8x8' | 'Noise_Randomized' | 'Custom_Artistic_Pattern' | string>; // Allow custom string for other patterns
    usageNotes_cz: string;
}

export interface ColorPaletteApplication_Detailed {
    harmonyAndContrast_cz: string;
    materialityThroughColor_cz: string;
    limitedSubPalette_PerObject_cz: string;
    colorRamps_ForShading_Length: [number, number];
}

export interface ManualAntiAliasingParams {
    principle_cz: string;
    applicationAreas_cz: string[];
}

export interface SemanticPixelUsageParams {
    functionalDesign_cz: string;
    shapeReadability_cz: string;
}

export interface PixelArtTechniques {
    advancedDithering: AdvancedDitheringParams;
    colorPaletteApplication_Detailed: ColorPaletteApplication_Detailed;
    manualAntiAliasing_PixelClusters: ManualAntiAliasingParams;
    semanticPixelUsage: SemanticPixelUsageParams;
}

// Core utility types, potentially refining existing ones for visual context.
// Ensure these are comprehensive for use in P35, P36, P37 visual descriptions.

export interface Vector2D {
    x: number;
    y: number;
}

export interface ColorPalette {
    // Example: { primary: "#FF0000", secondary: "#00FF00", accent?: string }
    // Or for indexed colors: { name: string, colors: string[] }
    // Prompt 35 (OrbitalCityViewFeature) uses: { "main_streets": "#FFFF00", ... }
    // So, a flexible string index seems best.
    [name: string]: string | string[];
}

export interface AnimationParams {
    frameCount: number;
    speed: number; // Could be frames per second, or ms per frame
    loop: boolean;
    spritesheetUrl?: string; // Path to the spritesheet
    soundEffect_Loop?: string; // Associated looping sound
    soundEffect_OneShot?: string; // Sound played once per animation cycle or on start
    // Add other potential animation properties if found in P35/36/37
    // e.g., "reverse": boolean, "pingPong": boolean
    // Prompt 37 (NuclearWarhead) uses detonationEffect_Visual_Space directly with frameCount, speed, loop, spritesheetUrl
    // Prompt 35 (StarCoronaDynamics_Enhanced) uses animation_OverallFlowAndChange: AnimationParams
}

// Example instance of the philosophy (values from Prompt 35)
export const examplePixelArtPhilosophy: PixelArtCorePhilosophy = {
    principle_PixelSingificance: {
        title_cz: "Každý Pixel Zpívá",
        description_cz: "Nejenže má každý pixel svůj význam, ale měl by aktivně přispívat k definici textury, tvaru, osvětlení a celkového dojmu zobrazovaného objektu. Je třeba se vyvarovat 'mrtvým' nebo čistě 'výplňovým' pixelům, které nepřidávají informaci nebo detail. Každý pixel by měl být umístěn se záměrem.",
        ai_implementation_note_cz: "AI by měla být instruována, aby negenerovala velké jednobarevné plochy bez jemných variací odstínů, textury nebo naznačeného detailu, i když je plocha zdánlivě uniformní (např. kovový plát lodi)."
    },
    principle_RealismThroughAbstraction: {
        title_cz: "Realismus Skrze Inteligentní Abstrakci",
        description_cz: "Cílem není fotorealismus v tradičním slova smyslu, ale dosažení *dojmu* realismu a vysoké komplexnosti pomocí limitované palety (pro daný objekt/scénu) a diskrétní povahy pixelů. Jde o inteligentní abstrakci reálných tvarů, materiálů a světelných jevů do pixel artu.",
        ai_implementation_note_cz: "AI by měla analyzovat reálné reference (viz Sekce VIII) a extrahovat klíčové vizuální charakteristiky, které pak převede do pixel artu pomocí technik jako je selektivní detail, zjednodušení tvarů při zachování jejich podstaty a využití barevných přechodů k naznačení objemu."
    },
    principle_TexturedDepth: {
        title_cz: "Texturovaná Hloubka Všech Povrchů",
        description_cz: "Všechny povrchy ve hře – od trupů lodí, přes planetární kůru, až po UI panely a tlačítka – musí vykazovat zřetelnou, promyšlenou texturu vytvořenou pomocí pixel artových technik. To zahrnuje použití ditheringu, ručně umístěných pixelů pro naznačení nerovností, škrábanců, vzorů materiálu atd.",
        ai_implementation_note_cz: "AI by měla pro každý materiál generovat specifické pixel artové textury. Například pro kov: jemné škrábance, odlesky, nýty. Pro kámen: hrubší texturu, praskliny. Pro UI: jemný vzor na pozadí panelů, texturu tlačítek."
    },
    principle_PixelGridFeel: {
        title_cz: "Konzistentní 'Pocit Pixelové Mřížky'",
        description_cz: "Všechny herní prvky by měly působit, jako by byly pečlivě sestaveny na pixelové mřížce. To je obzvláště důležité pro UI, kde je třeba se vyhnout příliš 'vektorovému', rozmazanému nebo automaticky vyhlazenému vzhledu, který by narušil celkový pixel art styl. Ostré hrany a jasně definované shluky pixelů jsou preferovány, pokud není specifickým designovým záměrem jiný efekt (např. měkký 'glow' efekt vytvořený ditheringem nebo poloprůhlednými pixely).",
        ai_implementation_note_cz: "AI by měla při generování UI prvků a herních spritů dbát na zarovnání na pixelovou mřížku. Pro křivky a diagonální linie by měla používat techniky ručního anti-aliasingu (umísťování pixelů v mezilehlých barvách) namísto automatického vyhlazování."
    }
};

export const examplePixelArtTechniques: PixelArtTechniques = {
    advancedDithering: {
        purpose_cz: ["Plynulé barevné přechody", "Texturování materiálů (kov, kámen, látka)", "Simulace poloprůhlednosti (sklo, energie)", "Jemný anti-aliasing na hranách"],
        patternExamples: ["Bayer_4x4", "Bayer_8x8", "Noise_Randomized", "Custom_Artistic_Pattern"],
        usageNotes_cz": "Volba vzoru by měla odpovídat materiálu a požadovanému efektu. Např. uspořádaný dithering pro kov, náhodnější pro organické textury."
    },
    colorPaletteApplication_Detailed: {
        harmonyAndContrast_cz": "Pečlivý výběr barev pro vizuální harmonii a dostatečný kontrast pro čitelnost detailů.",
        materialityThroughColor_cz": "Použití barev, sytosti a jasu k naznačení materiálu (studené tóny pro kov, teplé pro organiku, syté pro energii).",
        limitedSubPalette_PerObject_cz": "Pro jednotlivé objekty/scény/frakce používat omezenější sub-paletu (4-8 hlavních barev s odstíny) pro konzistenci. Používat 'hue shifting' pro živější barvy.",
        colorRamps_ForShading_Length": [3, 7]
    },
    manualAntiAliasing_PixelClusters: {
        principle_cz": "Na zakřivených/diagonálních hranách používat pečlivě umístěné pixely v mezilehlých barvách/průhlednostech pro iluzi hladšího tvaru bez rozmazání.",
        applicationAreas_cz": ["Siluety lodí", "Okraje planet", "Detaily UI ikon", "Větší pixel art fonty"]
    },
    semanticPixelUsage: {
        functionalDesign_cz": "Každý shluk pixelů by měl vizuálně reprezentovat konkrétní prvek (panel, nýt, světlo, stín, texturu). Vyhnout se náhodnému umisťování.",
        shapeReadability_cz": "I komplexní objekty musí mít jasně čitelnou základní siluetu a identifikovatelné hlavní části."
    }
};
