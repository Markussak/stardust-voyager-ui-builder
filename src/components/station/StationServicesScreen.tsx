import React from 'react';

interface StationServicesScreenProps {
    stationName: string;
    factionId: string; // or FactionData
    onUndock: () => void;
    // TODO: Add props for specific service actions e.g. onTrade: () => void;
}

const StationServicesScreen: React.FC<StationServicesScreenProps> = ({
    stationName,
    factionId,
    onUndock
}) => {
    return (
        <div style={{
            position: 'fixed', top: '0', left: '0', width: '100%', height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.85)', display: 'flex',
            justifyContent: 'center', alignItems: 'center', zIndex: 90, color: 'white'
        }}>
            <div style={{ padding: '20px', backgroundColor: '#101525', border: '1px solid #4A5588', width: '70%', height: '80%' }}>
                <h1>Vítejte na stanici {stationName} (Frakce: {factionId})</h1>
                <p>Služby Stanice (Station Services Screen)</p>
                <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '20px' }}>
                    <button>Obchod</button>
                    <button>Opravna</button>
                    <button>Náborové Středisko</button>
                    <button>Mise</button>
                    {/* Add more service buttons as needed */}
                </div>
                <div style={{ position: 'absolute', bottom: '30px', right: '30px' }}>
                    <button onClick={onUndock} style={{padding: '10px 20px'}}>Odkotvit</button>
                </div>
            </div>
        </div>
    );
};

export default StationServicesScreen;
