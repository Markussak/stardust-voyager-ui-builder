import React from 'react';
import { useNavigate } from 'react-router-dom';

const LoadGameScreen: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div style={{ padding: '20px', color: 'white', backgroundColor: '#111', height: '100vh' }}>
            <h1>Načíst Hru (Load Game Screen)</h1>
            <p>TODO: Zobrazit seznam uložených pozic.</p>
            {/* Placeholder for save slots */}
            <div style={{ margin: '20px 0' }}>
                <button onClick={() => alert("TODO: Načíst vybranou hru")}>Načíst Slot 1</button>
            </div>
            <button onClick={() => navigate(-1)}>Zpět</button>
        </div>
    );
};

export default LoadGameScreen;
