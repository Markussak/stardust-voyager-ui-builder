import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { InitialLoadingScreenConfig } from '../types/uiScreens'; // Adjust path if needed
import GameLogo from '../components/game/GameLogo'; // Assuming GameLogo component exists
import { Progress } from "@/components/ui/progress"; // Assuming shadcn/ui progress bar

// Placeholder configuration based on Prompt 49
const screenConfig: InitialLoadingScreenConfig = {
    id: "InitialLoadingScreen",
    screenName_cz: "Načítání Hry",
    backgroundAsset_Animated_Path: "assets/images/ui/loading_screens/initial_load_animated_nebula_ship.png", // Placeholder path
    logoGame_Display: true,
    progressBar_Loading: {
        enabled: true,
        styleKey: "ProgressBar_Loading_BlueWhite", // Will be applied via className or style
        labelText_cz_Template: "Načítání assetů: {percent}% ({currentAsset})",
    },
    loadingTips_cz: [
        "Tip: Nezapomeňte pravidelně kontrolovat deník misí!",
        "Lore: Hvězdný prach je klíčem k pohonu warpových motorů...",
        "Tip: Vylepšování modulů lodi může výrazně zvýšit vaše šance na přežití.",
        "Lore: Prastaré ruiny Nexus jsou záhadou i pro nejmoudřejší rasy galaxie...",
    ],
    music_LoadingScreen_AssetPath: "music/themes/loading_theme_ambient_hopeful.ogg", // Placeholder path
    duration_MinSeconds: 3, // Minimum display duration
    transitionTo_ScreenId: "/game-menu", // Route to navigate to
};

const InitialLoadingScreen: React.FC = () => {
    const navigate = useNavigate();
    const [progress, setProgress] = useState(0);
    const [currentTip, setCurrentTip] = useState("");
    const [currentAsset, setCurrentAsset] = useState("Základní systémy...");

    useEffect(() => {
        // Simulate loading tips rotation
        if (screenConfig.loadingTips_cz && screenConfig.loadingTips_cz.length > 0) {
            setCurrentTip(screenConfig.loadingTips_cz[Math.floor(Math.random() * screenConfig.loadingTips_cz.length)]);
            const tipInterval = setInterval(() => {
                setCurrentTip(screenConfig.loadingTips_cz![Math.floor(Math.random() * screenConfig.loadingTips_cz!.length)]);
            }, 5000); // Change tip every 5 seconds
            return () => clearInterval(tipInterval);
        }
    }, []);

    useEffect(() => {
        // Simulate loading progress
        const assetsToLoad = [
            "Mapové textury...", "Modely lodí...", "Zvukové efekty...", "UI Elementy...", "Shader Kompilace..."
        ];
        let assetIndex = 0;

        const progressInterval = setInterval(() => {
            setProgress(prevProgress => {
                if (prevProgress >= 100) {
                    clearInterval(progressInterval);
                    return 100;
                }
                if (assetIndex < assetsToLoad.length && prevProgress % (100 / assetsToLoad.length) < 10 ) { // Update asset name at certain progress intervals
                     setCurrentAsset(assetsToLoad[assetIndex]);
                     assetIndex++;
                }
                return prevProgress + 5; // Increment progress
            });
        }, screenConfig.duration_MinSeconds * 1000 / (100/5)); // Distribute progress over min duration

        return () => clearInterval(progressInterval);
    }, []);

    useEffect(() => {
        if (progress >= 100) {
            const startTime = Date.now();
            // Ensure minimum display time even if loading is faster
            // This logic should ideally use the actual start time of the loading screen component,
            // not just from when progress hits 100.
            // For simplicity in this stub, we'll keep it as is, but in a real scenario,
            // capture initial mount time.
            let initialScreenMountTime = Date.now(); // Fallback if not set earlier
            try {
                const mountTimeStr = sessionStorage.getItem('initialLoadingScreenMountTime');
                if (mountTimeStr) initialScreenMountTime = parseInt(mountTimeStr, 10);
            } catch (e) { /* ignore error */ }


            const timeElapsedSinceMount = (Date.now() - initialScreenMountTime) / 1000;
            const remainingTime = Math.max(0, screenConfig.duration_MinSeconds - timeElapsedSinceMount);
            
            console.log(`Progress 100%. Time elapsed: ${timeElapsedSinceMount.toFixed(2)}s. Min duration: ${screenConfig.duration_MinSeconds}s. Remaining time: ${remainingTime.toFixed(2)}s.`);

            setTimeout(() => {
                navigate(screenConfig.transitionTo_ScreenId);
            }, remainingTime * 1000);
        }
    }, [progress, navigate]);

    // Store mount time for duration calculation
    useEffect(() => {
        sessionStorage.setItem('initialLoadingScreenMountTime', Date.now().toString());
        return () => {
            sessionStorage.removeItem('initialLoadingScreenMountTime');
        }
    },[])

    const backgroundStyle: React.CSSProperties = {
        backgroundImage: screenConfig.backgroundAsset_Animated_Path 
            ? `url(${screenConfig.backgroundAsset_Animated_Path})` 
            : undefined,
        backgroundColor: '#000010', // Fallback color
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        textAlign: 'center',
        padding: '20px',
    };
    
    const loadingLabel = screenConfig.progressBar_Loading.labelText_cz_Template
        ?.replace("{percent}", Math.round(progress).toString())
        .replace("{currentAsset}", currentAsset);

    return (
        <div style={backgroundStyle}>
            {screenConfig.logoGame_Display && (
                <div style={{ marginBottom: '40px' }}>
                    <GameLogo /> {/* Assuming GameLogo is a known component */}
                </div>
            )}
            {screenConfig.progressBar_Loading.enabled && (
                <div style={{ width: '60%', maxWidth: '600px', marginBottom: '20px' }}>
                    <Progress value={progress} className="w-full bg-gray-700 h-4 border border-blue-500" /> {/* Apply styleKey if possible or use Tailwind */}
                    {loadingLabel && <p style={{ marginTop: '10px', fontSize: '0.9em', color: '#aaa' }}>{loadingLabel}</p>}
                </div>
            )}
            {currentTip && (
                <p style={{ fontStyle: 'italic', color: '#ccc', marginTop: '30px', fontSize: '1em' }}>
                    {currentTip}
                </p>
            )}
            {/* Placeholder for music - actual playback requires an audio library or <audio> element */}
            {/* <audio autoPlay loop src={screenConfig.music_LoadingScreen_AssetPath} /> */}
            <p style={{position: 'absolute', bottom: '20px', fontSize: '0.8em', color: '#555'}}>Verze Hry: 0.1.0 (Alpha)</p>
        </div>
    );
};

export default InitialLoadingScreen;
