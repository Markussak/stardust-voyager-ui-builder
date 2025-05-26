import React, { useState, useEffect } from 'react'; // Added useEffect, useState
import { useNavigate } from 'react-router-dom';
import { SaveLoadManager, SaveSlotInfo } from '../services/SaveLoadManagerService'; // Added SaveSlotInfo
import { useGame } from '../contexts/GameContext'; // Added useGame

const LoadGameScreen: React.FC = () => {
    const navigate = useNavigate();
    const { applyLoadedGameState } = useGame(); 
    const [slots, setSlots] = useState<SaveSlotInfo[]>([]);

    useEffect(() => {
        setSlots(SaveLoadManager.getAvailableSaveSlots());
    }, []);

    const handleLoadGame = (slotId: string, slotName: string) => {
        console.log(`Attempting to load game from ${slotId}`);
        const gameState = SaveLoadManager.loadGame(slotId);
        if (gameState) {
            applyLoadedGameState(gameState); 
            console.log("Simulating: Game state applied from loaded data for slot:", slotName, gameState);
            alert(`Hra načtena ze slotu: ${slotName}. (Herní stav obnoven - viz konzole)`);
            navigate('/in-system');
        } else {
            alert(`Nepodařilo se načíst hru ze slotu: ${slotName}.`);
        }
    };

    const handleDeleteGame = (slotId: string, slotName: string) => {
        if (window.confirm(`Opravdu si přejete smazat uloženou hru "${slotName}"?`)) {
            console.log(`Attempting to delete game from ${slotId}`);
            const success = SaveLoadManager.deleteGame(slotId);
            if (success) {
                alert(`Uložená hra "${slotName}" byla smazána.`);
                setSlots(SaveLoadManager.getAvailableSaveSlots()); // Refresh list
            } else {
                alert(`Nepodařilo se smazat uloženou hru "${slotName}".`);
            }
        }
    };

    return (
        <div style={{ padding: '20px', color: 'white', backgroundColor: '#111', height: '100vh', textAlign: 'center' }}>
            <h1>Načíst Hru</h1>
            <div style={{ maxHeight: '60vh', overflowY: 'auto', margin: '20px 0', border: '1px solid #333' }}>
                {slots.length > 0 ? (
                    slots.map(slot => (
                        <div key={slot.id} style={{
                            padding: '10px', margin: '10px', backgroundColor: '#222', border: '1px solid #444',
                        }}>
                            <img src={slot.previewImg || "/placeholder.svg"} alt="Náhled" style={{ width: '80px', height: '50px', float: 'left', marginRight: '10px', border: '1px solid #555' }} />
                            <p style={{ margin: 0, fontWeight: 'bold' }}>{slot.name}</p>
                            <p style={{ margin: '2px 0', fontSize: '0.9em' }}>Hráč: {slot.playerName}</p>
                            <p style={{ margin: '2px 0', fontSize: '0.8em', color: '#aaa' }}>Uloženo: {slot.saveDate}</p>
                            <div style={{clear: 'both', marginBottom: '5px'}}></div>
                            <button onClick={() => handleLoadGame(slot.id, slot.name)} style={{marginRight: '10px', padding: '5px 10px'}}>Načíst</button>
                            <button onClick={() => handleDeleteGame(slot.id, slot.name)} style={{padding: '5px 10px'}}>Smazat</button>
                        </div>
                    ))
                ) : (
                    <p>Žádné uložené pozice nebyly nalezeny.</p>
                )}
            </div>
            <button onClick={() => navigate(-1)} style={{padding: '10px 20px'}}>Zpět</button>
        </div>
    );
};

export default LoadGameScreen;
