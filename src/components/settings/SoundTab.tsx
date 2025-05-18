
import React from 'react';
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface SoundTabProps {
  settings: {
    masterVolume: number;
    musicVolume: number;
    sfxVolume: number;
    uiSounds: boolean;
    ambientSounds: boolean;
  };
  onUpdateSetting: (key: string, value: any) => void;
}

const SoundTab: React.FC<SoundTabProps> = ({ settings, onUpdateSetting }) => {
  return (
    <div className="max-w-2xl mx-auto text-space-ui-text">
      <h3 className="text-lg font-bold mb-4 text-space-ui-text">Nastavení Zvuku</h3>
      
      {/* Master Volume */}
      <div className="mb-6">
        <div className="flex justify-between mb-2">
          <Label htmlFor="masterVolume">Hlavní Hlasitost</Label>
          <span className="text-space-ui-text">{settings.masterVolume}%</span>
        </div>
        <Slider
          id="masterVolume"
          value={[settings.masterVolume]}
          min={0}
          max={100}
          step={1}
          onValueChange={(value) => onUpdateSetting('masterVolume', value[0])}
          className="w-full"
        />
      </div>
      
      {/* Music Volume */}
      <div className="mb-6">
        <div className="flex justify-between mb-2">
          <Label htmlFor="musicVolume">Hlasitost Hudby</Label>
          <span className="text-space-ui-text">{settings.musicVolume}%</span>
        </div>
        <Slider
          id="musicVolume"
          value={[settings.musicVolume]}
          min={0}
          max={100}
          step={1}
          onValueChange={(value) => onUpdateSetting('musicVolume', value[0])}
          className="w-full"
        />
      </div>
      
      {/* SFX Volume */}
      <div className="mb-6">
        <div className="flex justify-between mb-2">
          <Label htmlFor="sfxVolume">Hlasitost Efektů</Label>
          <span className="text-space-ui-text">{settings.sfxVolume}%</span>
        </div>
        <Slider
          id="sfxVolume"
          value={[settings.sfxVolume]}
          min={0}
          max={100}
          step={1}
          onValueChange={(value) => onUpdateSetting('sfxVolume', value[0])}
          className="w-full"
        />
      </div>
      
      <div className="space-y-4 mt-6">
        {/* UI Sounds */}
        <div className="flex items-center gap-2">
          <Checkbox 
            id="uiSounds" 
            checked={settings.uiSounds}
            onCheckedChange={(checked) => onUpdateSetting('uiSounds', checked === true)}
            className="h-5 w-5 border-space-buttons-border"
          />
          <Label htmlFor="uiSounds" className="cursor-pointer">Zvuky UI</Label>
        </div>
        
        {/* Ambient Sounds */}
        <div className="flex items-center gap-2">
          <Checkbox 
            id="ambientSounds" 
            checked={settings.ambientSounds}
            onCheckedChange={(checked) => onUpdateSetting('ambientSounds', checked === true)}
            className="h-5 w-5 border-space-buttons-border"
          />
          <Label htmlFor="ambientSounds" className="cursor-pointer">Ambientní Zvuky</Label>
        </div>
      </div>
    </div>
  );
};

export default SoundTab;
