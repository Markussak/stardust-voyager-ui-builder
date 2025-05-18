
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GameProvider } from "./contexts/GameContext";
import Index from "./pages/Index";
import GalaxyMapScreen from "./pages/GalaxyMapScreen";
import NotFound from "./pages/NotFound";
import ShipDetailsScreen from "./pages/ShipDetailsScreen";
import StarSystemScreen from "./pages/StarSystemScreen";
import SettingsScreen from "./pages/SettingsScreen";
import "./App.css";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <GameProvider>
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
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </GameProvider>
  </QueryClientProvider>
);

export default App;
