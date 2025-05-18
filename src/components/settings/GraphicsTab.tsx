
import React from 'react';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface GraphicsTabProps {
  settings: {
    resolution: string;
    displayMode: string;
    vsync: boolean;
    textureQuality: string;
    shadowQuality: string;
    particleQuality: string;
    bloom: boolean;
    gravitationalLensing: boolean;
    colorblindMode: string;
  };
  onUpdateSetting: (key: string, value: any) => void;
}

const GraphicsTab: React.FC<GraphicsTabProps> = ({ settings, onUpdateSetting }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-space-ui-text">
      {/* Display Settings Column */}
      <div>
        <h3 className="text-lg font-bold mb-3 text-space-ui-text">Zobrazení</h3>
        
        {/* Resolution */}
        <div className="mb-4">
          <Label htmlFor="resolution" className="block mb-2">Rozlíšenie</Label>
          <Select
            value={settings.resolution}
            onValueChange={(value) => onUpdateSetting('resolution', value)}
          >
            <SelectTrigger id="resolution" className="w-full bg-space-dark border-space-buttons-border">
              <SelectValue placeholder="Select resolution" />
            </SelectTrigger>
            <SelectContent className="bg-space-dark border-space-buttons-border">
              <SelectItem value="1280x720">1280 x 720</SelectItem>
              <SelectItem value="1920x1080">1920 x 1080</SelectItem>
              <SelectItem value="native">Natívne</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-xs text-space-ui-subtext mt-1">* Vyžaduje restart hry</p>
        </div>
        
        {/* Display Mode */}
        <div className="mb-4">
          <Label htmlFor="displayMode" className="block mb-2">Režim Zobrazenia</Label>
          <Select
            value={settings.displayMode}
            onValueChange={(value) => onUpdateSetting('displayMode', value)}
          >
            <SelectTrigger id="displayMode" className="w-full bg-space-dark border-space-buttons-border">
              <SelectValue placeholder="Select display mode" />
            </SelectTrigger>
            <SelectContent className="bg-space-dark border-space-buttons-border">
              <SelectItem value="windowed">V Okne</SelectItem>
              <SelectItem value="fullscreen">Celá Obrazovka</SelectItem>
              <SelectItem value="borderless">Bez Okrajov</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-xs text-space-ui-subtext mt-1">* Vyžaduje restart hry</p>
        </div>
        
        {/* VSync */}
        <div className="mb-4 flex items-center gap-2">
          <Checkbox 
            id="vsync" 
            checked={settings.vsync}
            onCheckedChange={(checked) => onUpdateSetting('vsync', checked === true)}
            className="h-5 w-5 border-space-buttons-border"
          />
          <Label htmlFor="vsync" className="cursor-pointer">Vertikálna Synchronizácia (VSync)</Label>
        </div>
      </div>
      
      {/* Quality Settings Column */}
      <div>
        <h3 className="text-lg font-bold mb-3 text-space-ui-text">Kvalita Detailov</h3>
        
        {/* Texture Quality */}
        <div className="mb-4">
          <Label htmlFor="textureQuality" className="block mb-2">Kvalita Textúr</Label>
          <Select
            value={settings.textureQuality}
            onValueChange={(value) => onUpdateSetting('textureQuality', value)}
          >
            <SelectTrigger id="textureQuality" className="w-full bg-space-dark border-space-buttons-border">
              <SelectValue placeholder="Select texture quality" />
            </SelectTrigger>
            <SelectContent className="bg-space-dark border-space-buttons-border">
              <SelectItem value="low">Nízka</SelectItem>
              <SelectItem value="medium">Stredná</SelectItem>
              <SelectItem value="high">Vysoká</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {/* Shadow Quality */}
        <div className="mb-4">
          <Label htmlFor="shadowQuality" className="block mb-2">Kvalita Tieňov</Label>
          <Select
            value={settings.shadowQuality}
            onValueChange={(value) => onUpdateSetting('shadowQuality', value)}
          >
            <SelectTrigger id="shadowQuality" className="w-full bg-space-dark border-space-buttons-border">
              <SelectValue placeholder="Select shadow quality" />
            </SelectTrigger>
            <SelectContent className="bg-space-dark border-space-buttons-border">
              <SelectItem value="off">Vypnuté</SelectItem>
              <SelectItem value="low">Nízka</SelectItem>
              <SelectItem value="medium">Stredná</SelectItem>
              <SelectItem value="high">Vysoká</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {/* Particle Quality */}
        <div className="mb-4">
          <Label htmlFor="particleQuality" className="block mb-2">Kvalita Časticových Efektov</Label>
          <Select
            value={settings.particleQuality}
            onValueChange={(value) => onUpdateSetting('particleQuality', value)}
          >
            <SelectTrigger id="particleQuality" className="w-full bg-space-dark border-space-buttons-border">
              <SelectValue placeholder="Select particle quality" />
            </SelectTrigger>
            <SelectContent className="bg-space-dark border-space-buttons-border">
              <SelectItem value="low">Nízka</SelectItem>
              <SelectItem value="medium">Stredná</SelectItem>
              <SelectItem value="high">Vysoká</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {/* Bloom */}
        <div className="mb-4 flex items-center gap-2">
          <Checkbox 
            id="bloom" 
            checked={settings.bloom}
            onCheckedChange={(checked) => onUpdateSetting('bloom', checked === true)}
            className="h-5 w-5 border-space-buttons-border"
          />
          <Label htmlFor="bloom" className="cursor-pointer">Bloom Efekt</Label>
        </div>
        
        {/* Gravitational Lensing */}
        <div className="mb-4 flex items-center gap-2">
          <Checkbox 
            id="gravitationalLensing" 
            checked={settings.gravitationalLensing}
            onCheckedChange={(checked) => onUpdateSetting('gravitationalLensing', checked === true)}
            className="h-5 w-5 border-space-buttons-border"
          />
          <Label htmlFor="gravitationalLensing" className="cursor-pointer">Efekt Gravitačnej Šošovky</Label>
        </div>
        
        {/* Colorblind Mode */}
        <div className="mb-4">
          <Label htmlFor="colorblindMode" className="block mb-2">Režim pre Farboslepých</Label>
          <Select
            value={settings.colorblindMode}
            onValueChange={(value) => onUpdateSetting('colorblindMode', value)}
          >
            <SelectTrigger id="colorblindMode" className="w-full bg-space-dark border-space-buttons-border">
              <SelectValue placeholder="Select colorblind mode" />
            </SelectTrigger>
            <SelectContent className="bg-space-dark border-space-buttons-border">
              <SelectItem value="none">Vypnuté</SelectItem>
              <SelectItem value="protanopia">Protanopia</SelectItem>
              <SelectItem value="deuteranopia">Deuteranopia</SelectItem>
              <SelectItem value="tritanopia">Tritanopia</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default GraphicsTab;
