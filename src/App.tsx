
import { ReactNode } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Context Providers
import { GameProvider } from "./contexts/GameContext";
import { GalaxyProvider } from "./contexts/GalaxyContext";
import { ShipMovementProvider } from "./contexts/ShipMovementContext";
import { DiplomacyProvider } from "./contexts/DiplomacyContext";
import { TradeProvider } from "./contexts/TradeContext";
import { CraftingProvider } from "./contexts/CraftingContext";
import { ResearchProvider } from "./contexts/ResearchContext";
import { InventoryProvider } from "./contexts/InventoryContext";
import { CrewProvider } from "./contexts/CrewContext";
import { PlanetaryProvider } from "./contexts/PlanetaryContext";
import { MiningSystemProvider } from "./contexts/MiningSystemContext";
import { CombatSystemProvider } from "./contexts/CombatSystemContext";
import { ShipEditorProvider } from "./contexts/ShipEditorContext";
import { CodexProvider } from "./contexts/CodexContext";
import { ProceduralLoreProvider } from "./contexts/ProceduralLoreContext";
import { DynamicEventsProvider } from "./contexts/DynamicEventsContext";
import { NexusProvider } from "./contexts/NexusContext";

// Pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import GameMenuScreen from "./pages/GameMenuScreen";
import GalaxyMapScreen from "./pages/GalaxyMapScreen";
import StarSystemScreen from "./pages/StarSystemScreen";
import ShipDetailsScreen from "./pages/ShipDetailsScreen";
import InventoryScreen from "./pages/InventoryScreen";
import ResearchTreeScreen from "./pages/ResearchTreeScreen";
import CraftingScreen from "./pages/CraftingScreen";
import CrewManagementScreen from "./pages/CrewManagementScreen";
import PlanetaryScreen from "./pages/PlanetaryScreen";
import DiplomacyScreen from "./pages/DiplomacyScreen";
import TradeScreen from "./pages/TradeScreen";
import SettingsScreen from "./pages/SettingsScreen";
import ShipTestScreen from "./pages/ShipTestScreen";
import ShipEditorScreen from "./pages/ShipEditorScreen";
import CombatTestScreen from "./pages/CombatTestScreen";
import MissionLogScreen from "./pages/MissionLogScreen";
import KnowledgeLibraryScreen from "./pages/KnowledgeLibraryScreen";
import DynamicEventsTestScreen from "./pages/DynamicEventsTestScreen";
import NexusScreen from "./pages/NexusScreen";

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppProviders>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/game-menu" element={<GameMenuScreen />} />
            <Route path="/galaxy-map" element={<GalaxyMapScreen />} />
            <Route path="/star-system" element={<StarSystemScreen />} />
            <Route path="/ship-details" element={<ShipDetailsScreen />} />
            <Route path="/inventory" element={<InventoryScreen />} />
            <Route path="/research" element={<ResearchTreeScreen />} />
            <Route path="/mission-log" element={<MissionLogScreen />} />
            <Route path="/knowledge-library" element={<KnowledgeLibraryScreen />} />
            <Route path="/crew" element={<CrewManagementScreen />} />
            <Route path="/planetary" element={<PlanetaryScreen />} />
            <Route path="/diplomacy" element={<DiplomacyScreen />} />
            <Route path="/trade" element={<TradeScreen />} />
            <Route path="/crafting" element={<CraftingScreen />} />
            <Route path="/settings" element={<SettingsScreen />} />
            <Route path="/ship-test" element={<ShipTestScreen />} />
            <Route path="/ship-editor" element={<ShipEditorScreen />} />
            <Route path="/combat-test" element={<CombatTestScreen />} />
            <Route path="/dynamic-events-test" element={<DynamicEventsTestScreen />} />
            <Route path="/nexus" element={<NexusScreen />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster richColors position="top-right" />
        </BrowserRouter>
      </AppProviders>
    </QueryClientProvider>
  );
}

function AppProviders({ children }: { children: ReactNode }) {
  return (
    <GameProvider>
      <GalaxyProvider>
        <ShipMovementProvider>
          <DiplomacyProvider>
            <TradeProvider>
              <CraftingProvider>
                <ResearchProvider>
                  <InventoryProvider>
                    <CrewProvider>
                      <PlanetaryProvider>
                        <MiningSystemProvider>
                          <CombatSystemProvider>
                            <ShipEditorProvider>
                              <CodexProvider>
                                <ProceduralLoreProvider>
                                  <DynamicEventsProvider>
                                    <NexusProvider>
                                      {children}
                                    </NexusProvider>
                                  </DynamicEventsProvider>
                                </ProceduralLoreProvider>
                              </CodexProvider>
                            </ShipEditorProvider>
                          </CombatSystemProvider>
                        </MiningSystemProvider>
                      </PlanetaryProvider>
                    </CrewProvider>
                  </InventoryProvider>
                </ResearchProvider>
              </CraftingProvider>
            </TradeProvider>
          </DiplomacyProvider>
        </ShipMovementProvider>
      </GalaxyProvider>
    </GameProvider>
  );
}

export default App;
