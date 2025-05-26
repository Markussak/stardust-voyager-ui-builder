
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'; // Added useNavigate
import { Toaster } from 'sonner';
import { CombatSystemProvider } from './contexts/CombatSystemContext';
import { DiplomacyProvider } from './contexts/DiplomacyContext';
import { GalaxyProvider } from './contexts/GalaxyContext';
import { GameProvider } from './contexts/GameContext';
import { InventoryProvider } from './contexts/InventoryContext';
import { MiningSystemProvider } from './contexts/MiningSystemContext';
import { MissionsProvider } from './contexts/MissionsContext';
import { ResearchProvider } from './contexts/ResearchContext';
import { ShipEditorProvider } from './contexts/ShipEditorContext';
import { ShipMovementProvider } from './contexts/ShipMovementContext';
import { TradeProvider } from './contexts/TradeContext';
import { CodexProvider } from './contexts/CodexContext';
import { CraftingProvider } from './contexts/CraftingContext';
import { CrewProvider } from './contexts/CrewContext';
import { PlanetaryProvider } from './contexts/PlanetaryContext';
import { DynamicEventsProvider } from './contexts/DynamicEventsContext';
import { ProceduralLoreProvider } from './contexts/ProceduralLoreContext';

import CombatTestScreen from './pages/CombatTestScreen';
import CrewManagementScreen from './pages/CrewManagementScreen';
import DiplomacyScreen from './pages/DiplomacyScreen';
import GalaxyMapScreen from './pages/GalaxyMapScreen';
import Index from './pages/Index';
import GameMenuScreen from './pages/GameMenuScreen';
import InventoryScreen from './pages/InventoryScreen';
import KnowledgeLibraryScreen from './pages/KnowledgeLibraryScreen';
import MissionLogScreen from './pages/MissionLogScreen';
import NotFound from './pages/NotFound';
import ResearchTreeScreen from './pages/ResearchTreeScreen';
import SettingsScreen from './pages/SettingsScreen';
import ShipDetailsScreen from './pages/ShipDetailsScreen';
import ShipTestScreen from './pages/ShipTestScreen';
import StarSystemScreen from './pages/StarSystemScreen';
import ShipEditorScreen from './pages/ShipEditorScreen';
import TradeScreen from './pages/TradeScreen';
import CraftingScreen from './pages/CraftingScreen';
import PlanetaryScreen from './pages/PlanetaryScreen';
import DynamicEventsTestScreen from './pages/DynamicEventsTestScreen';
import NewGameSetupScreen from './pages/NewGameSetupScreen';
import InSystemScene from './pages/InSystemScene';
import LoadGameScreen from './pages/LoadGameScreen';
import CreditsScreen from './pages/CreditsScreen';
import InitialLoadingScreen from './pages/InitialLoadingScreen'; // Added for root route
import { useGame } from './contexts/GameContext'; // Or useGameContext
import InGameMenuScreen from './components/game/InGameMenuScreen'; // For ModalRenderer
import StationServicesScreen from './components/station/StationServicesScreen'; // For ModalRenderer
import TransitionLoadingScreen from './components/ui/TransitionLoadingScreen'; // Added
import { TransitionLoadingScreenConfig } from './types/uiScreens'; // Added


import './App.css';

// Default config for TransitionLoadingScreen (as per Sub-Task B instructions)
const defaultTransitionConfig: TransitionLoadingScreenConfig = {
    id: "DefaultTransitionScreen",
    backgroundAsset_Subtle_Animated_Path: "assets/images/ui/loading_screens/transition_warp_lines_subtle_anim.png", // Placeholder
    loadingIndicator_Type: 'Spinning_Galaxy_Icon',
    // loadingText_cz is set dynamically via GameContext's loadingTransitionText
    fontStyleKey_LoadingText: "StandardText_HUD_White", // Placeholder
    displayDuration_IfNoAsyncTask_ms: 500 // This is used by showTransition in GameContext
};

const CurrentTransitionScreen = () => {
    const { isLoadingTransition, loadingTransitionText } = useGame();
    if (!isLoadingTransition) return null;
    
    return (
        <TransitionLoadingScreen 
            config={{
                ...defaultTransitionConfig, 
                loadingText_cz: loadingTransitionText || defaultTransitionConfig.loadingText_cz || "Načítání..."
            }} 
            isActive={true} 
        />
    );
};

const ModalRenderer = () => {
  const { activeModal, closeModal, openModal } = useGame();
  const navigate = useNavigate(); // Added for navigation

  if (!activeModal) return null;

  // Updated prop functions for InGameMenuScreen
  const igmOnContinue = () => closeModal();
  const igmOnSaveGame = () => {
      alert('Hra Uložena (TODO: Implement SaveLoadManager.saveGame())');
      console.log("SaveLoadManager.saveGame() called - Placeholder");
      // closeModal(); // Optional: close menu after save
  };
  const igmOnLoadGame = () => {
      closeModal();
      navigate('/load-game');
  };
  const igmOnSettings = () => {
      closeModal();
      openModal('Settings');
  };
  const igmOnExitToMainMenu = () => {
      closeModal();
      navigate('/game-menu');
  };
  const igmOnExitToDesktop = () => {
      alert('Ukončuji hru... (TODO: Implement actual exit)');
      console.log("Application Exit called - Placeholder");
      closeModal();
      // window.close(); // This has limitations in browsers
  };

  const dummyStationProps = { // Keep existing dummy props for other modals if not being updated
      stationName: "Terra Station",
      factionId: "SolarConfederacy",
      onUndock: () => closeModal(),
  };

  switch (activeModal) {
      case 'Settings':
          // SettingsScreen might need props like onBack={closeModal}
          // This assumes SettingsScreen can be adapted to be a modal or uses a global close mechanism.
          return <SettingsScreen />; 
      case 'InGameMenu':
          return <InGameMenuScreen 
                      onContinue={igmOnContinue}
                      onSaveGame={igmOnSaveGame}
                      onLoadGame={igmOnLoadGame}
                      onSettings={igmOnSettings}
                      onExitToMainMenu={igmOnExitToMainMenu}
                      onExitToDesktop={igmOnExitToDesktop}
                  />;
      case 'StationServices':
          return <StationServicesScreen {...dummyStationProps} />;
      // Add cases for other modals as needed
      default:
          console.warn("Unknown modal requested:", activeModal);
          return null;
  }
};

function App() {
  return (
    <GameProvider>
      <ShipMovementProvider>
        <CombatSystemProvider>
          <GalaxyProvider>
            <MiningSystemProvider>
              <InventoryProvider>
                <ResearchProvider>
                  <MissionsProvider>
                    <DiplomacyProvider>
                      <ShipEditorProvider>
                        <TradeProvider>
                          <CodexProvider>
                            <CraftingProvider>
                              <CrewProvider>
                                <PlanetaryProvider>
                                  <DynamicEventsProvider>
                                    <ProceduralLoreProvider>
                                      <Router>
                                        <ModalRenderer /> {/* ModalRenderer added here */}
                                        <CurrentTransitionScreen /> {/* Added for transition loading */}
                                        <Routes>
                                          <Route path="/" element={<InitialLoadingScreen />} /> {/* Changed from Index */}
                                          <Route path="/game-menu" element={<GameMenuScreen />} />
                                          <Route path="/galaxy-map" element={<GalaxyMapScreen />} />
                                          <Route path="/star-system/:systemId" element={<StarSystemScreen />} />
                                          <Route path="/ship-details" element={<ShipDetailsScreen />} />
                                          <Route path="/ship-editor" element={<ShipEditorScreen />} />
                                          <Route path="/inventory" element={<InventoryScreen />} />
                                          <Route path="/research" element={<ResearchTreeScreen />} />
                                          <Route path="/mission-log" element={<MissionLogScreen />} />
                                          <Route path="/knowledge-library" element={<KnowledgeLibraryScreen />} />
                                          <Route path="/diplomacy" element={<DiplomacyScreen />} />
                                          <Route path="/trade" element={<TradeScreen />} />
                                          <Route path="/settings" element={<SettingsScreen />} />
                                          <Route path="/ship-test" element={<ShipTestScreen />} />
                                          <Route path="/combat-test" element={<CombatTestScreen />} />
                                          <Route path="/crafting" element={<CraftingScreen />} />
                                          <Route path="/crew" element={<CrewManagementScreen />} />
                                          <Route path="/planetary" element={<PlanetaryScreen />} />
                                          <Route path="/dynamic-events-test" element={<DynamicEventsTestScreen />} />
                                          <Route path="/new-game-setup" element={<NewGameSetupScreen />} />
                                          <Route path="/in-system" element={<InSystemScene />} />
                                          <Route path="/load-game" element={<LoadGameScreen />} />
                                          <Route path="/credits" element={<CreditsScreen />} />
                                          <Route path="*" element={<NotFound />} />
                                        </Routes>
                                      </Router>
                                      <Toaster position="top-right" />
                                    </ProceduralLoreProvider>
                                  </DynamicEventsProvider>
                                </PlanetaryProvider>
                              </CrewProvider>
                            </CraftingProvider>
                          </CodexProvider>
                        </TradeProvider>
                      </ShipEditorProvider>
                    </DiplomacyProvider>
                  </MissionsProvider>
                </ResearchProvider>
              </InventoryProvider>
            </MiningSystemProvider>
          </GalaxyProvider>
        </CombatSystemProvider>
      </ShipMovementProvider>
    </GameProvider>
  );
}

export default App;
