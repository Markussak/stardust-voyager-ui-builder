import React from 'react';
import { useNavigate } from 'react-router-dom';

const CreditsScreen: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div style={{ padding: '20px', color: 'white', backgroundColor: '#000010', height: '100vh', overflowY: 'auto' }}>
            <h1>Tvůrci (Credits Screen)</h1>
            <div style={{ height: '1500px' /* Make it scrollable */ }}>
                <p>Hra: Star Dust Voyager: Galaxy Wanderer</p>
                <br />
                <p>Hlavní Vývojář AI: Jules</p>
                <br />
                <p>Prompt Inženýři: [Jména dle potřeby]</p>
                <br />
                <p>Poděkování:</p>
                <p>...</p>
                <br />
                <p>Použité Technologie:</p>
                <p>React, TypeScript, TailwindCSS (předpoklad), PixiJS (možná), ...</p>
                <br />
                <p>Hudba & Zvuky:</p>
                <p>...</p>
                <br />
                <p>(Tento text bude rolovat)</p>
            </div>
            <button style={{ marginTop: '20px' }} onClick={() => navigate('/game-menu')}>Zpět do Hlavního Menu</button>
        </div>
    );
};

export default CreditsScreen;
