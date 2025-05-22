
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

import CombatTestScreen from './pages/CombatTestScreen';
import CrewManagementScreen from './pages/CrewManagementScreen';
import DiplomacyScreen from './pages/DiplomacyScreen';
import GalaxyMapScreen from './pages/GalaxyMapScreen';
import Index from './pages/Index';
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

import './App.css';

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
                                  <Router>
                                    <Routes>
                                      <Route path="/" element={<Index />} />
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
                                      <Route path="*" element={<NotFound />} />
                                    </Routes>
                                  </Router>
                                  <Toaster position="top-right" />
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
