
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { StarSystem, StarType } from '../../types/galaxy';

interface SystemTooltipProps {
  system: StarSystem;
  children?: React.ReactNode;
}

const SystemTooltip = ({ system, children }: SystemTooltipProps) => {
  // Mapování typů hvězd na čitelné názvy
  const starTypeNames: Record<StarType, string> = {
    [StarType.M_RedDwarf]: "Červený trpaslík (M)",
    [StarType.G_YellowMainSequence]: "Žlutá hvězda hlavní posloupnosti (G)",
    [StarType.A_White]: "Bílá hvězda (A)",
    [StarType.O_BlueGiant]: "Modrý obr (O)",
    [StarType.NeutronStar]: "Neutronová hvězda",
    [StarType.BlackHole]: "Černá díra",
    [StarType.BinarySystem]: "Binární systém",
    [StarType.TrinarySystem]: "Trojhvězdný systém"
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        {children ? children : <div className="absolute inset-0 cursor-pointer" />}
      </TooltipTrigger>
      <TooltipContent className="bg-space-dark border border-space-border p-3 rounded text-space-ui-text">
        <div className="space-y-1">
          <h3 className="text-lg font-pixel-mono">{system.name}</h3>
          <div className="text-sm font-pixel-mono opacity-80">
            <div>Typ hvězdy: {starTypeNames[system.starType]}</div>
            <div>Planet: {system.planets}</div>
            {system.explored ? 
              <div className="text-space-ui-highlight">Prozkoumaný systém</div> :
              <div className="text-yellow-500">Neprozkoumaný systém</div>
            }
            {system.controllingFaction && 
              <div>Kontrolující frakce: {system.controllingFaction}</div>
            }
            {system.anomalyPresent && 
              <div className="text-amber-400">Detekována anomálie</div>
            }
            {system.resources && system.resources.length > 0 &&
              <div>Zdroje: {system.resources.join(', ')}</div>
            }
          </div>
        </div>
      </TooltipContent>
    </Tooltip>
  );
};

export default SystemTooltip;
