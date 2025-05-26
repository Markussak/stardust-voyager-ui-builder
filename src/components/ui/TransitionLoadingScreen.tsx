import React, { useEffect, useState } from 'react';
import { TransitionLoadingScreenConfig } from '../../types/uiScreens'; // Adjust path if needed

// Example of a simple spinning icon (CSS or SVG based)
const SpinningGalaxyIcon: React.FC = () => (
    <div style={{
        width: '50px',
        height: '50px',
        border: '4px solid rgba(255, 255, 255, 0.2)',
        borderLeftColor: '#FFF',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
    }}>
        <style>{`
            @keyframes spin {
                to { transform: rotate(360deg); }
            }
        `}</style>
    </div>
);

// Placeholder for a pulsating symbol (could be an SVG or animated image)
const PulsatingNexusSymbol: React.FC<{ assetPath?: string }> = ({ assetPath }) => (
    assetPath ? 
    <img src={assetPath} alt="Loading Symbol" style={{ width: '60px', height: '60px', animation: 'pulse 1.5s infinite ease-in-out' }} /> : 
    <div style={{
        width: '50px',
        height: '50px',
        backgroundColor: '#8800FF', // Example color
        borderRadius: '50%',
        animation: 'pulse 1.5s infinite ease-in-out',
    }}>
        <style>{`
            @keyframes pulse {
                0% { transform: scale(0.9); opacity: 0.7; }
                50% { transform: scale(1); opacity: 1; }
                100% { transform: scale(0.9); opacity: 0.7; }
            }
        `}</style>
    </div>
);

interface TransitionLoadingScreenProps {
    config: TransitionLoadingScreenConfig;
    isActive: boolean; // Controlled by parent to show/hide
}

const TransitionLoadingScreen: React.FC<TransitionLoadingScreenProps> = ({ config, isActive }) => {
    if (!isActive) {
        return null;
    }

    const [displayText, setDisplayText] = useState(config.loadingText_cz || "Načítání...");

    // If there's a list of texts, cycle through them (example, not in config but could be added)
    // For now, just use the provided config.loadingText_cz

    const backgroundStyle: React.CSSProperties = {
        backgroundImage: config.backgroundAsset_Subtle_Animated_Path
            ? `url(${config.backgroundAsset_Subtle_Animated_Path})`
            : undefined,
        backgroundColor: 'rgba(0, 0, 10, 0.85)', // Dark, semi-transparent overlay
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        textAlign: 'center',
        padding: '20px',
        zIndex: 200, // Ensure it's above other UI but potentially below critical alerts
        transition: 'opacity 0.3s ease-in-out', // Smooth fade in/out if isActive changes
        opacity: isActive ? 1 : 0,
        pointerEvents: isActive ? 'auto' : 'none',
    };

    let indicatorElement: React.ReactNode = null;
    switch (config.loadingIndicator_Type) {
        case 'Spinning_Galaxy_Icon':
            indicatorElement = <SpinningGalaxyIcon />;
            break;
        case 'Pulsating_Nexus_Symbol':
            indicatorElement = <PulsatingNexusSymbol assetPath={config.loadingIndicator_AssetPath} />;
            break;
        case 'Simple_Text_CZ':
            // Text is already handled by displayText state
            break;
        default:
            indicatorElement = <SpinningGalaxyIcon />; // Default fallback
    }
    
    // TODO: Apply fontStyleKey_LoadingText via a global CSS class or style object lookup

    return (
        <div style={backgroundStyle} className={isActive ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}>
            {indicatorElement && <div style={{ marginBottom: '20px' }}>{indicatorElement}</div>}
            {displayText && (
                <p style={{ fontSize: '1.2em', /* Apply fontStyleKey_LoadingText here */ }}>
                    {displayText}
                </p>
            )}
        </div>
    );
};

export default TransitionLoadingScreen;
