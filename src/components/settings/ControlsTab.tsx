
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface KeyBinding {
  key: string;
  label: string;
  defaultKey: string;
}

interface ControlsTabProps {
  settings: {
    keyBindings: Record<string, string>;
  };
  onUpdateSetting: (key: string, value: any) => void;
}

const defaultBindings: Record<string, KeyBinding> = {
  moveForward: { key: 'w', label: 'Pohyb Vpřed', defaultKey: 'w' },
  moveBackward: { key: 's', label: 'Pohyb Vzad', defaultKey: 's' },
  moveLeft: { key: 'a', label: 'Pohyb Doleva', defaultKey: 'a' },
  moveRight: { key: 'd', label: 'Pohyb Doprava', defaultKey: 'd' },
  boost: { key: 'shift', label: 'Zrychlení', defaultKey: 'shift' },
  brake: { key: 'space', label: 'Brzda', defaultKey: 'space' },
  interact: { key: 'e', label: 'Interakce', defaultKey: 'e' },
  openMap: { key: 'm', label: 'Mapa', defaultKey: 'm' },
  inventory: { key: 'i', label: 'Inventář', defaultKey: 'i' },
  firePrimary: { key: 'mouse0', label: 'Primární Zbraň', defaultKey: 'mouse0' },
  fireSecondary: { key: 'mouse1', label: 'Sekundární Zbraň', defaultKey: 'mouse1' }
};

const ControlsTab: React.FC<ControlsTabProps> = ({ settings, onUpdateSetting }) => {
  const [listeningForKey, setListeningForKey] = useState<string | null>(null);
  const [conflicts, setConflicts] = useState<Record<string, string>>({});
  
  // Initialize keyBindings if empty
  if (!settings.keyBindings || Object.keys(settings.keyBindings).length === 0) {
    const initialBindings: Record<string, string> = {};
    Object.entries(defaultBindings).forEach(([action, binding]) => {
      initialBindings[action] = binding.key;
    });
    onUpdateSetting('keyBindings', initialBindings);
  }
  
  const handleKeyChange = (action: string) => {
    setListeningForKey(action);
    
    const handleKeyDown = (e: KeyboardEvent) => {
      e.preventDefault();
      let newKey = e.key.toLowerCase();
      
      // Special keys
      if (newKey === ' ') newKey = 'space';
      if (newKey === 'control') newKey = 'ctrl';
      if (newKey === 'escape') {
        // Cancel rebinding
        setListeningForKey(null);
        window.removeEventListener('keydown', handleKeyDown);
        return;
      }
      
      // Check for conflicts
      let conflictAction = '';
      Object.entries(settings.keyBindings).forEach(([existingAction, existingKey]) => {
        if (existingKey === newKey && existingAction !== action) {
          conflictAction = existingAction;
        }
      });
      
      if (conflictAction) {
        setConflicts(prev => ({
          ...prev,
          [action]: conflictAction
        }));
        // You can implement conflict resolution here
        // For this example, we'll just allow the conflict
      }
      
      // Update binding
      onUpdateSetting('keyBindings', {
        ...settings.keyBindings,
        [action]: newKey
      });
      
      setListeningForKey(null);
      window.removeEventListener('keydown', handleKeyDown);
    };
    
    window.addEventListener('keydown', handleKeyDown);
  };
  
  const resetToDefault = (action: string) => {
    onUpdateSetting('keyBindings', {
      ...settings.keyBindings,
      [action]: defaultBindings[action].defaultKey
    });
    
    if (conflicts[action]) {
      const updatedConflicts = {...conflicts};
      delete updatedConflicts[action];
      setConflicts(updatedConflicts);
    }
  };
  
  const resetAllToDefaults = () => {
    const defaultKeys: Record<string, string> = {};
    Object.entries(defaultBindings).forEach(([action, binding]) => {
      defaultKeys[action] = binding.defaultKey;
    });
    onUpdateSetting('keyBindings', defaultKeys);
    setConflicts({});
  };
  
  // Format key name for display
  const formatKeyName = (key: string) => {
    switch(key) {
      case 'mouse0': return 'LMB';
      case 'mouse1': return 'RMB';
      case 'mouse2': return 'MMB';
      default: return key.charAt(0).toUpperCase() + key.slice(1);
    }
  };
  
  return (
    <div className="text-space-ui-text">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold">Nastavení Ovládání</h3>
        <Button 
          variant="outline" 
          className="border-space-buttons-border text-space-ui-text"
          onClick={resetAllToDefaults}
        >
          Reset Všech
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-3">
          <h4 className="font-semibold">Pohyb</h4>
          {['moveForward', 'moveBackward', 'moveLeft', 'moveRight', 'boost', 'brake'].map(action => (
            <div 
              key={action} 
              className={`flex justify-between items-center p-2 rounded ${conflicts[action] ? 'bg-red-900/30' : ''}`}
            >
              <Label>{defaultBindings[action].label}</Label>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className={`min-w-[80px] border-space-buttons-border ${listeningForKey === action ? 'bg-blue-600' : 'bg-space-dark'}`}
                  onClick={() => handleKeyChange(action)}
                >
                  {listeningForKey === action 
                    ? "Stiskni..." 
                    : formatKeyName(settings.keyBindings[action] || defaultBindings[action].key)}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs text-gray-400 hover:text-white"
                  onClick={() => resetToDefault(action)}
                >
                  Reset
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="space-y-3">
          <h4 className="font-semibold">Akce</h4>
          {['interact', 'openMap', 'inventory', 'firePrimary', 'fireSecondary'].map(action => (
            <div 
              key={action} 
              className={`flex justify-between items-center p-2 rounded ${conflicts[action] ? 'bg-red-900/30' : ''}`}
            >
              <Label>{defaultBindings[action].label}</Label>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className={`min-w-[80px] border-space-buttons-border ${listeningForKey === action ? 'bg-blue-600' : 'bg-space-dark'}`}
                  onClick={() => handleKeyChange(action)}
                >
                  {listeningForKey === action 
                    ? "Stiskni..." 
                    : formatKeyName(settings.keyBindings[action] || defaultBindings[action].key)}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs text-gray-400 hover:text-white"
                  onClick={() => resetToDefault(action)}
                >
                  Reset
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {Object.keys(conflicts).length > 0 && (
        <div className="mt-4 p-3 bg-red-900/30 border border-red-500 rounded text-sm">
          <p>Nalezen konflikt kláves. Některé klávesy jsou použité vícekrát, což může způsobit problémy s ovládáním.</p>
        </div>
      )}
      
      <div className="mt-6 text-sm text-space-ui-subtext">
        <p>Pro zrušení přiřazování klávesy stiskněte Escape.</p>
        <p>Pro reset všech kláves na výchozí hodnoty klikněte na 'Reset Všech'.</p>
      </div>
    </div>
  );
};

export default ControlsTab;
