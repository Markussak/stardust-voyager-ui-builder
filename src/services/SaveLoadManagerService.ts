// src/services/SaveLoadManagerService.ts

export interface SaveSlotInfo {
    id: string;
    name: string;
    playerName: string;
    gameTime: string; // Formatted game time string
    saveDate: string; // Formatted real-world date string
    previewImg?: string; // Path to a preview image
    // Add any other relevant metadata for a save slot
}

export interface GameStateToSave {
    // This would be a comprehensive object representing all data to save
    // e.g., playerStore, gameSessionStore, missionStore, researchStore etc. from Prompt 49
    playerData: any;
    galaxyData: any;
    systemStates: Record<string, any>; // For persistent changes in visited systems
    currentLocation: {
        systemId: string;
        playerPosition: { x: number; y: number };
    };
    // ... and so on
    version: string;
}

const MOCK_SAVE_SLOTS_KEY = "starDustVoyager_mockSaveSlots";

class SaveLoadManagerController {
    private getMockSaveSlots(): SaveSlotInfo[] {
        const slotsJson = localStorage.getItem(MOCK_SAVE_SLOTS_KEY);
        return slotsJson ? JSON.parse(slotsJson) : [
            { id: "slot1", name: "Automatické Uložení 1", playerName: "Jules Alpha", gameTime: "Den 10, 08:30", saveDate: new Date(Date.now() - 86400000).toLocaleString(), previewImg: "/placeholder.svg" },
            { id: "slot2", name: "Před Misí Krall", playerName: "Jules Alpha", gameTime: "Den 9, 15:45", saveDate: new Date(Date.now() - 2*86400000).toLocaleString(), previewImg: "/placeholder.svg" },
        ];
    }

    private saveMockSaveSlots(slots: SaveSlotInfo[]): void {
        localStorage.setItem(MOCK_SAVE_SLOTS_KEY, JSON.stringify(slots));
    }

    public hasSavedGames(): boolean {
        console.log("SaveLoadManager: Checking for saved games...");
        const slots = this.getMockSaveSlots();
        const hasGames = slots.length > 0;
        console.log(`SaveLoadManager: Has saved games: ${hasGames}`);
        return hasGames;
    }

    public getAvailableSaveSlots(): SaveSlotInfo[] {
        console.log("SaveLoadManager: Fetching available save slots...");
        const slots = this.getMockSaveSlots();
        console.log("SaveLoadManager: Found slots:", slots);
        return slots;
    }

    public loadGame(slotId: string): GameStateToSave | null {
        console.log(`SaveLoadManager: Attempting to load game from slot: ${slotId}`);
        const savedGameStateJson = localStorage.getItem(`savegame_${slotId}`);
        if (savedGameStateJson) {
            const gameState = JSON.parse(savedGameStateJson) as GameStateToSave;
            console.log("SaveLoadManager: Game loaded successfully.", gameState);
            // Here, you would typically update all relevant Zustand stores or contexts
            // with the loaded game state.
            // For example: gameContext.loadFullGameState(gameState);
            alert(`Načtena hra ze slotu ${slotId}. (TODO: Obnovit herní stav)`);
            return gameState;
        }
        console.warn(`SaveLoadManager: No save data found for slot: ${slotId}`);
        alert(`Chyba: Nepodařilo se načíst data pro slot ${slotId}.`);
        return null;
    }

    public saveGame(slotId: string, currentGameState: GameStateToSave): boolean {
        console.log(`SaveLoadManager: Attempting to save game to slot: ${slotId}`, currentGameState);
        try {
            // Add/update slot info
            let slots = this.getMockSaveSlots();
            const existingSlotIndex = slots.findIndex(s => s.id === slotId);
            const slotInfo: SaveSlotInfo = {
                id: slotId,
                name: `Uložená Hra ${slotId.replace('slot', '')}`, // Simple name
                playerName: currentGameState.playerData?.name || "Neznámý Pilot",
                gameTime: `Den X, HH:MM`, // Placeholder, should come from gameState
                saveDate: new Date().toLocaleString(),
                previewImg: "/placeholder.svg"
            };
            if (existingSlotIndex > -1) {
                slots[existingSlotIndex] = slotInfo;
            } else {
                slots.push(slotInfo);
            }
            this.saveMockSaveSlots(slots);

            // Save actual game data
            localStorage.setItem(`savegame_${slotId}`, JSON.stringify(currentGameState));
            console.log("SaveLoadManager: Game saved successfully to slot:", slotId);
            alert(`Hra uložena do slotu ${slotId}.`);
            return true;
        } catch (error) {
            console.error("SaveLoadManager: Error saving game:", error);
            alert(`Chyba při ukládání hry do slotu ${slotId}.`);
            return false;
        }
    }

    public deleteGame(slotId: string): boolean {
        console.log(`SaveLoadManager: Attempting to delete game from slot: ${slotId}`);
        let slots = this.getMockSaveSlots();
        const initialLength = slots.length;
        slots = slots.filter(s => s.id !== slotId);
        if (slots.length < initialLength) {
            this.saveMockSaveSlots(slots);
            localStorage.removeItem(`savegame_${slotId}`);
            console.log(`SaveLoadManager: Game slot ${slotId} deleted.`);
            alert(`Slot ${slotId} smazán.`);
            return true;
        }
        console.warn(`SaveLoadManager: Game slot ${slotId} not found for deletion.`);
        alert(`Chyba: Slot ${slotId} nenalezen pro smazání.`);
        return false;
    }
}

export const SaveLoadManager = new SaveLoadManagerController();
