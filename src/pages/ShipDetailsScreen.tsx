
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MenuButton from '../components/game/MenuButton';
import VersionInfo from '../components/game/VersionInfo';
import { PlayerShipConfig_Nomad } from '../types/ships';

// Default ship configuration for the Nomad class explorer
const nomadShipConfig: PlayerShipConfig_Nomad = {
  id: "player_ship_nomad_class_explorer",
  className: "Nomad",
  role: "Lehký Průzkumník, Univerzální Startovní Loď",
  appearancePhilosophy: "Funkční, mírně opotřebovaný, ale spolehlivý vzhled. Není to luxusní jachta ani těžký křižník.",
  dimensionsPx: {
    width: 60,
    length: 120
  },
  baseSpriteAsset: "/assets/ships/nomad_base.png",
  visualDetails: {
    hull: {
      primaryMaterial: "Slitiny titanu a oceli s kompozitními prvky",
      baseColorPalette: {
        primary: "#336699", // Středně modrá
        panelVariants: ["#2d5b88", "#306090", "#4073aa", "#386898"],
        accentPiping: "#B0B0B0", // Světle šedá pro potrubí
        accentLights: "#FFAA00"  // Oranžová pro malá světla
      },
      panelingDescription: "Povrch lodi je složen z desítek viditelných panelů různých geometrických tvarů."
    }
  },
  functionalStats: {
    mobility: {
      turnRate_degPerSec: 90,
      maxSpeed_unitsPerSec: 120,
      acceleration_unitsPerSec2: 40,
      strafeSpeedFactor: 0.5
    },
    hullPoints_Base: 100,
    shieldPoints_Base: 50,
    shieldRegenRate_PerSec_Base: 2,
    sensorRange_Base_Units: 3000,
    cargoCapacity_BaseUnits: 20
  },
  internalLayout_Conceptual: [
    "Kokpit: Dvě místa (pilot, kopilot/navigátor).",
    "Malá Obytná Sekce: Kajuty pro 2-3 členy posádky, malá jídelna/společenská místnost.",
    "Technická Místnost/Strojovna: Přístup k motorům, generátoru energie, systémům podpory života.",
    "Nákladový Prostor: Malý, pro několik standardních kontejnerů.",
    "Místnost pro Moduly/Dílna: Prostor pro instalaci a základní údržbu vylepšení."
  ],
  loreEntry: {
    title: "Průzkumník Třídy 'Nomad'",
    entryText: "Průzkumník třídy Nomad je osvědčený, i když poněkud zastaralý model, oblíbený mezi nezávislými prospektory, pašeráky na částečný úvazek a cestovateli na okraji známého vesmíru.",
    originStoryHint: "Tento konkrétní model patřil kdysi známému, i když smolnému, průzkumníkovi artefaktů, který zmizel za záhadných okolností...",
    knownModifications_Common: ["Vylepšené senzory dlouhého dosahu", "Rozšířený nákladový prostor", "Nelegální maskovací zařízení nízké kvality"]
  },
  galaxyMapIcon: {
    assetUrl: "/assets/ships/nomad_map_icon.png",
    sizePx: { width: 8, length: 16 }
  }
};

const ShipDetailsScreen = () => {
  const navigate = useNavigate();
  const [shipConfig] = useState<PlayerShipConfig_Nomad>(nomadShipConfig);

  return (
    <div className="h-screen w-screen overflow-hidden bg-space-dark text-space-ui-text font-pixel-mono relative">
      <div className="absolute top-4 left-4 z-10">
        <MenuButton 
          text="ZPĚT NA MAPU" 
          onClick={() => navigate('/galaxy-map')}
          className="w-48"
        />
      </div>

      <div className="flex h-full">
        {/* Ship visualization */}
        <div className="w-1/2 h-full flex items-center justify-center">
          <div className="relative">
            <img 
              src={shipConfig.baseSpriteAsset} 
              alt="Player Ship Nomad"
              className="max-w-full max-h-80vh"
            />
          </div>
        </div>
        
        {/* Ship details */}
        <div className="w-1/2 h-full p-8 overflow-y-auto">
          <h1 className="text-2xl mb-6 text-space-buttons-glow font-bold">
            {shipConfig.className} - {shipConfig.role}
          </h1>

          <div className="mb-6">
            <h2 className="text-xl mb-2 border-b border-space-buttons-border">Technické Specifikace</h2>
            <ul className="space-y-2">
              <li>Manévrovatelnost: {shipConfig.functionalStats.mobility.turnRate_degPerSec}°/s</li>
              <li>Max. rychlost: {shipConfig.functionalStats.mobility.maxSpeed_unitsPerSec} j/s</li>
              <li>Zrychlení: {shipConfig.functionalStats.mobility.acceleration_unitsPerSec2} j/s²</li>
              <li>Integrita trupu: {shipConfig.functionalStats.hullPoints_Base}</li>
              <li>Štíty: {shipConfig.functionalStats.shieldPoints_Base} (regenerace {shipConfig.functionalStats.shieldRegenRate_PerSec_Base}/s)</li>
              <li>Nákladový prostor: {shipConfig.functionalStats.cargoCapacity_BaseUnits} jednotek</li>
            </ul>
          </div>
          
          <div className="mb-6">
            <h2 className="text-xl mb-2 border-b border-space-buttons-border">Vnitřní Uspořádání</h2>
            <ul className="list-disc pl-5 space-y-1">
              {shipConfig.internalLayout_Conceptual.map((section, index) => (
                <li key={index}>{section}</li>
              ))}
            </ul>
          </div>
          
          <div className="mb-6">
            <h2 className="text-xl mb-2 border-b border-space-buttons-border">Historie</h2>
            <p className="mb-3">{shipConfig.loreEntry.entryText}</p>
            <p className="italic text-space-ui-subtext">{shipConfig.loreEntry.originStoryHint}</p>
          </div>
          
          <div>
            <h2 className="text-xl mb-2 border-b border-space-buttons-border">Známé Modifikace</h2>
            <ul className="list-disc pl-5">
              {shipConfig.loreEntry.knownModifications_Common.map((mod, index) => (
                <li key={index}>{mod}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      
      <VersionInfo />
    </div>
  );
};

export default ShipDetailsScreen;
