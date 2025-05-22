
import React, { useState } from 'react';
import { usePlanetary } from '@/contexts/PlanetaryContext';
import { PlanetaryBaseType } from '@/types/planetary';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface NewBasePanelProps {
  onCreated: () => void;
}

const NewBasePanel: React.FC<NewBasePanelProps> = ({ onCreated }) => {
  const { baseDefinitions, createNewBase } = usePlanetary();
  const [selectedBaseType, setSelectedBaseType] = useState<PlanetaryBaseType | ''>('');
  const [baseName, setBaseName] = useState('');
  const [selectedPlanet, setSelectedPlanet] = useState('');
  
  // Mock planets data - in a real implementation this would come from game state
  const availablePlanets = [
    { id: 'planet1', name: 'Terra Nova', systemId: 'system1', systemName: 'Alpha Centauri' },
    { id: 'planet2', name: 'New Eden', systemId: 'system2', systemName: 'Proxima Centauri' }
  ];

  const selectedBaseDefinition = baseDefinitions.find(def => def.baseType === selectedBaseType);
  
  const handleCreateBase = () => {
    if (!selectedBaseType || !selectedPlanet) return;
    
    const planet = availablePlanets.find(p => p.id === selectedPlanet);
    if (!planet) return;
    
    createNewBase(selectedBaseType, planet.id, planet.systemId, baseName);
    onCreated();
  };

  return (
    <Card className="bg-space-card border-space-border">
      <CardHeader>
        <CardTitle className="font-pixel text-space-ui-text">Založit Novou Základnu</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="base-name" className="text-space-ui-text">Název Základny</Label>
            <Input 
              id="base-name" 
              value={baseName} 
              onChange={(e) => setBaseName(e.target.value)} 
              placeholder={selectedBaseDefinition?.defaultBaseName || "Název Základny"}
              className="bg-space-card-dark border-space-border text-space-ui-text"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="base-type" className="text-space-ui-text">Typ Základny</Label>
            <Select 
              value={selectedBaseType} 
              onValueChange={(value) => setSelectedBaseType(value as PlanetaryBaseType)}
            >
              <SelectTrigger id="base-type" className="bg-space-card-dark border-space-border text-space-ui-text">
                <SelectValue placeholder="Vyberte typ základny" />
              </SelectTrigger>
              <SelectContent className="bg-space-dark border-space-border">
                {baseDefinitions.map((baseType) => (
                  <SelectItem key={baseType.baseType} value={baseType.baseType} className="text-space-ui-text">
                    {baseType.defaultBaseName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            {selectedBaseDefinition && (
              <p className="text-xs text-space-ui-subtext mt-1">
                {selectedBaseDefinition.defaultDescription}
              </p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="planet" className="text-space-ui-text">Planeta</Label>
            <Select 
              value={selectedPlanet} 
              onValueChange={setSelectedPlanet}
            >
              <SelectTrigger id="planet" className="bg-space-card-dark border-space-border text-space-ui-text">
                <SelectValue placeholder="Vyberte planetu" />
              </SelectTrigger>
              <SelectContent className="bg-space-dark border-space-border">
                {availablePlanets.map((planet) => (
                  <SelectItem key={planet.id} value={planet.id} className="text-space-ui-text">
                    {planet.name} ({planet.systemName})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {selectedBaseDefinition && (
            <div className="space-y-2">
              <h3 className="font-medium text-space-ui-text">Požadované Zdroje</h3>
              <div className="bg-space-card-dark p-3 rounded-md">
                <ul className="space-y-1">
                  {selectedBaseDefinition.buildConditions.initialResourceCost_ToEstablish.map((cost, index) => (
                    <li key={index} className="flex justify-between text-sm">
                      <span className="text-space-ui-subtext">{cost.itemId}</span>
                      <span className="text-space-ui-text">{cost.quantity}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
          
          <Button 
            onClick={handleCreateBase}
            disabled={!selectedBaseType || !selectedPlanet}
            className="w-full bg-space-accent text-black hover:bg-space-accent/80"
          >
            Založit Základnu
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default NewBasePanel;
