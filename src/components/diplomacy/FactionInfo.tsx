
import React from 'react';
import { FactionDefinition } from '@/types/factions';
import { Card } from '@/components/ui/card';
import { Shield, Flag, Users, Building } from 'lucide-react';
import { AlienCulturalEthos, AlienGovernmentType } from '@/types/aliens';

interface FactionInfoProps {
  faction: FactionDefinition;
}

const FactionInfo: React.FC<FactionInfoProps> = ({ faction }) => {
  // Helper function to translate enum values to readable text
  const getEthosText = (ethos: AlienCulturalEthos): string => {
    return ethos.replace(/_/g, ' ');
  };

  const getGovernmentText = (gov: AlienGovernmentType): string => {
    return gov.split('_').join(' ');
  };

  // Helper function to generate CSS gradient based on faction colors
  const getFactionGradient = () => {
    const primary = faction.visualIdentity.primaryColor;
    const secondary = faction.visualIdentity.secondaryColor || primary;
    return `linear-gradient(135deg, ${primary}33 0%, ${secondary}33 100%)`;
  };

  return (
    <Card className="p-4 bg-space-dark border border-space-buttons-border overflow-hidden relative">
      {/* Background styling with faction colors */}
      <div 
        className="absolute inset-0 opacity-20" 
        style={{ background: getFactionGradient() }}
      />
      
      <div className="relative z-10">
        {/* Faction header */}
        <div className="flex items-center mb-4">
          {faction.visualIdentity.logo && (
            <div className="mr-4 flex-shrink-0">
              <img 
                src={faction.visualIdentity.logo.assetUrl_Small} 
                alt={faction.defaultFactionName}
                className="w-12 h-12 object-contain"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "/assets/factions/logos/default_faction.png";
                }}
              />
            </div>
          )}
          <div>
            <h3 className="text-xl font-pixel text-space-ui-text">{faction.defaultFactionName}</h3>
            <p className="text-sm text-space-ui-subtext">{faction.defaultFactionDescription_Short}</p>
          </div>
        </div>
        
        {/* Faction details in grid */}
        <div className="grid grid-cols-2 gap-3 my-3">
          {/* Government type */}
          <div className="flex items-center">
            <Building size={18} className="mr-2 text-space-ui-subtext" />
            <div>
              <div className="text-xs text-space-ui-subtext">Vládní systém</div>
              <div className="text-sm text-space-ui-text">{getGovernmentText(faction.diplomacyAI.governmentType)}</div>
            </div>
          </div>
          
          {/* Ethos */}
          <div className="flex items-center">
            <Flag size={18} className="mr-2 text-space-ui-subtext" />
            <div>
              <div className="text-xs text-space-ui-subtext">Étos</div>
              <div className="text-sm text-space-ui-text">{getEthosText(faction.diplomacyAI.baseEthos)}</div>
            </div>
          </div>
          
          {/* Military strength */}
          <div className="flex items-center">
            <Shield size={18} className="mr-2 text-space-ui-subtext" />
            <div>
              <div className="text-xs text-space-ui-subtext">Vojenská síla</div>
              <div className="text-sm text-space-ui-text">
                {faction.militaryProfile.fleetStrength_Descriptor.replace('_', ' ')}
              </div>
            </div>
          </div>
          
          {/* Systems count */}
          <div className="flex items-center">
            <Users size={18} className="mr-2 text-space-ui-subtext" />
            <div>
              <div className="text-xs text-space-ui-subtext">Kontrolované systémy</div>
              <div className="text-sm text-space-ui-text">
                {faction.controlledSystems_Initial_CountRange 
                  ? `${faction.controlledSystems_Initial_CountRange[0]}-${faction.controlledSystems_Initial_CountRange[1]}`
                  : 'Neznámé'}
              </div>
            </div>
          </div>
        </div>
        
        {/* Core goals */}
        <div className="mt-4">
          <h4 className="text-sm font-semibold text-space-ui-text mb-1">Hlavní cíle</h4>
          <ul className="list-disc list-inside text-sm text-space-ui-subtext">
            {faction.diplomacyAI.coreGoals.map((goal, index) => (
              <li key={index} className="mb-1">{goal}</li>
            ))}
          </ul>
        </div>
        
        {/* Tech & exports */}
        <div className="grid grid-cols-2 gap-3 mt-4">
          <div>
            <h4 className="text-sm font-semibold text-space-ui-text mb-1">Technologická úroveň</h4>
            <div className="text-sm text-space-ui-subtext">
              {faction.techProfile.overallTechLevel.replace(/_/g, ' ')}
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold text-space-ui-text mb-1">Hlavní exporty</h4>
            <div className="text-sm text-space-ui-subtext">
              {faction.economicProfile.primaryExports.join(', ')}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default FactionInfo;
