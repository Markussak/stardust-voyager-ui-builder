import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SpaceBackground from '../components/game/SpaceBackground';
import CockpitOverlay from '../components/game/CockpitOverlay';
import VersionInfo from '../components/game/VersionInfo';
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import GraphicsTab from '../components/settings/GraphicsTab';
import SoundTab from '../components/settings/SoundTab';
import ControlsTab from '../components/settings/ControlsTab';

// Settings state context (simplified for demo)
const defaultSettings = {
  graphics: {
    resolution: 'native',
    displayMode: 'fullscreen',
    vsync: true,
    textureQuality: 'high',
    shadowQuality: 'medium',
    particleQuality: 'high',
    bloom: true,
    gravitationalLensing: true,
    colorblindMode: 'none'
  },
  sound: {
    masterVolume: 80,
    musicVolume: 70,
    sfxVolume: 100,
    uiSounds: true,
    ambientSounds: true
  },
  controls: {
    // Will be populated in ControlsTab
    keyBindings: {}
  }
};

const SettingsScreen = () => {
  const navigate = useNavigate();
  const [settings, setSettings] = useState(() => {
    // Load settings from localStorage if available
    const savedSettings = localStorage.getItem('game_settings');
    return savedSettings ? JSON.parse(savedSettings) : { ...defaultSettings };
  });
  
  const [activeTab, setActiveTab] = useState("graphics");
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  
  // Keep track of original settings to detect changes
  const [originalSettings, setOriginalSettings] = useState({});
  
  useEffect(() => {
    // Store original settings for comparison
    setOriginalSettings(JSON.parse(JSON.stringify(settings)));
  }, []);
  
  // Check for unsaved changes when settings change
  useEffect(() => {
    if (JSON.stringify(settings) !== JSON.stringify(originalSettings)) {
      setHasUnsavedChanges(true);
    } else {
      setHasUnsavedChanges(false);
    }
  }, [settings, originalSettings]);
  
  const handleUpdateSetting = (category, key, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value
      }
    }));
  };
  
  const handleApplySettings = () => {
    // Save settings to localStorage
    localStorage.setItem('game_settings', JSON.stringify(settings));
    setOriginalSettings(JSON.parse(JSON.stringify(settings)));
    setHasUnsavedChanges(false);
    
    // Notify the user that settings have been saved
    console.log("Settings applied and saved!");
    // In a real implementation, you would have a toast notification here
  };
  
  const handleResetToDefaults = () => {
    // Reset only the current tab to defaults
    setSettings(prev => ({
      ...prev,
      [activeTab]: { ...defaultSettings[activeTab] }
    }));
  };
  
  const handleBackToMenu = () => {
    if (hasUnsavedChanges) {
      // In a real implementation, you should show a confirmation dialog
      if (window.confirm("You have unsaved changes. Save before going back?")) {
        handleApplySettings();
      }
    }
    navigate('/');
  };
  
  return (
    <div className="h-screen w-screen overflow-hidden bg-space-dark relative">
      {/* Background */}
      <SpaceBackground />
      
      {/* Settings panel */}
      <div className="absolute inset-0 flex items-center justify-center z-20">
        <div className="w-[85%] h-[80%] bg-opacity-90 bg-[#080818] border-2 border-[#3388FF] p-5 rounded-lg overflow-auto">
          <h1 className="text-2xl text-space-ui-text font-pixel mb-4 text-center">NASTAVENÍ</h1>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full grid grid-cols-3 mb-6">
              <TabsTrigger 
                value="graphics" 
                className="flex items-center gap-2 data-[state=active]:bg-[#3388FF] data-[state=active]:text-white"
              >
                <img 
                  src="/assets/images/icons/tabs/icon_tab_graphics.png" 
                  alt="Graphics" 
                  className="w-5 h-5"
                  onError={(e) => e.currentTarget.style.display = 'none'} // Fallback if image not found
                />
                Grafika
              </TabsTrigger>
              <TabsTrigger 
                value="sound" 
                className="flex items-center gap-2 data-[state=active]:bg-[#3388FF] data-[state=active]:text-white"
              >
                <img 
                  src="/assets/images/icons/tabs/icon_tab_sound.png" 
                  alt="Sound" 
                  className="w-5 h-5"
                  onError={(e) => e.currentTarget.style.display = 'none'}
                />
                Zvuk
              </TabsTrigger>
              <TabsTrigger 
                value="controls" 
                className="flex items-center gap-2 data-[state=active]:bg-[#3388FF] data-[state=active]:text-white"
              >
                <img 
                  src="/assets/images/icons/tabs/icon_tab_controls.png" 
                  alt="Controls" 
                  className="w-5 h-5"
                  onError={(e) => e.currentTarget.style.display = 'none'}
                />
                Ovládání
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="graphics" className="mt-0">
              <GraphicsTab 
                settings={settings.graphics} 
                onUpdateSetting={(key, value) => handleUpdateSetting('graphics', key, value)}
              />
            </TabsContent>
            
            <TabsContent value="sound" className="mt-0">
              <SoundTab 
                settings={settings.sound} 
                onUpdateSetting={(key, value) => handleUpdateSetting('sound', key, value)}
              />
            </TabsContent>
            
            <TabsContent value="controls" className="mt-0">
              <ControlsTab 
                settings={settings.controls} 
                onUpdateSetting={(key, value) => handleUpdateSetting('controls', key, value)}
              />
            </TabsContent>
          </Tabs>
          
          {/* Action buttons */}
          <div className="flex justify-end gap-4 mt-6">
            <Button
              variant="outline"
              className="border-space-buttons-border text-space-ui-text"
              onClick={handleResetToDefaults}
            >
              Výchozí
            </Button>
            <Button
              variant={hasUnsavedChanges ? "default" : "outline"}
              className={hasUnsavedChanges 
                ? "bg-[#3388FF] text-white hover:bg-[#2277EE]" 
                : "border-space-buttons-border text-space-ui-text"
              }
              onClick={handleApplySettings}
              disabled={!hasUnsavedChanges}
            >
              Použít
            </Button>
            <Button
              variant="outline"
              className="border-space-buttons-border text-space-ui-text"
              onClick={handleBackToMenu}
            >
              Zpět
            </Button>
          </div>
        </div>
      </div>
      
      {/* Cockpit overlay */}
      <CockpitOverlay />
      
      {/* Version info */}
      <VersionInfo />
    </div>
  );
};

export default SettingsScreen;
