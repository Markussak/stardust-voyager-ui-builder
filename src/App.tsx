
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GameProvider } from "./contexts/GameContext";
import { InventoryProvider } from "./contexts/InventoryContext";
import { DiplomacyProvider } from "./contexts/DiplomacyContext";
import { CodexProvider } from "./contexts/CodexContext";
import { MissionsProvider } from "./contexts/MissionsContext";
import Index from "./pages/Index";
import GalaxyMapScreen from "./pages/GalaxyMapScreen";
import NotFound from "./pages/NotFound";
import ShipDetailsScreen from "./pages/ShipDetailsScreen";
import StarSystemScreen from "./pages/StarSystemScreen";
import SettingsScreen from "./pages/SettingsScreen";
import InventoryScreen from "./pages/InventoryScreen";
import ShipEditorScreen from "./pages/ShipEditorScreen";
import ResearchTreeScreen from "./pages/ResearchTreeScreen";
import TradeScreen from "./pages/TradeScreen";
import DiplomacyScreen from "./pages/DiplomacyScreen";
import KnowledgeLibraryScreen from "./pages/KnowledgeLibraryScreen";
import MissionLogScreen from "./pages/MissionLogScreen";
import "./App.css";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <GameProvider>
      <InventoryProvider>
        <DiplomacyProvider>
          <CodexProvider>
            <MissionsProvider>
              <TooltipProvider>
                <Toaster />
                <Sonner />
                <BrowserRouter>
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/galaxy-map" element={<GalaxyMapScreen />} />
                    <Route path="/ship-details" element={<ShipDetailsScreen />} />
                    <Route path="/system/:systemId" element={<StarSystemScreen />} />
                    <Route path="/settings" element={<SettingsScreen />} />
                    <Route path="/inventory" element={<InventoryScreen />} />
                    <Route path="/ship-editor" element={<ShipEditorScreen />} />
                    <Route path="/research" element={<ResearchTreeScreen />} />
                    <Route path="/trade" element={<TradeScreen />} />
                    <Route path="/diplomacy" element={<DiplomacyScreen />} />
                    <Route path="/knowledge-library" element={<KnowledgeLibraryScreen />} />
                    <Route path="/mission-log" element={<MissionLogScreen />} />
                    {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </BrowserRouter>
              </TooltipProvider>
            </MissionsProvider>
          </CodexProvider>
        </DiplomacyProvider>
      </InventoryProvider>
    </GameProvider>
  </QueryClientProvider>
);

export default App;
