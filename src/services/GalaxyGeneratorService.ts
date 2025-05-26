// src/services/GalaxyGeneratorService.ts
import { NewGameSettingsData } from './GameSetupService'; // Assuming settings might influence generation

// Placeholder for what galaxy generation might produce (simplified)
export interface GeneratedGalaxyData {
    seed: string;
    numberOfSystems: number;
    playerStartSystemId: string;
    // ... other galaxy structural data
}

class GalaxyGeneratorController {
    public generateNewGalaxy(settings?: NewGameSettingsData): GeneratedGalaxyData {
        const seed = settings?.galaxySeed || Date.now().toString();
        console.log(`GalaxyGenerator: Generating new galaxy with seed: ${seed}`, settings);
        // Simulate galaxy generation
        const generatedData: GeneratedGalaxyData = {
            seed: seed,
            numberOfSystems: Math.floor(Math.random() * 50) + 50, // 50-99 systems
            playerStartSystemId: "alpha_centauri_prime" // Default starting system ID
        };
        console.log("GalaxyGenerator: Generated galaxy data:", generatedData);
        localStorage.setItem("generatedGalaxyData_debug", JSON.stringify(generatedData));
        return generatedData;
    }
}

export const GalaxyGenerator = new GalaxyGeneratorController();
