
import { StarSystem } from '../../types/galaxy';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';

interface SystemTooltipProps {
  system: StarSystem;
}

const SystemTooltip = ({ system }: SystemTooltipProps) => {
  return (
    <Tooltip open={true}>
      <TooltipTrigger asChild>
        <div className="absolute" style={{ 
          left: 0,
          top: 0,
          opacity: 0, // Hidden trigger
          pointerEvents: 'none'
        }} />
      </TooltipTrigger>
      <TooltipContent 
        className="bg-space-dark border border-space-buttons-border text-space-ui-text font-pixel-mono py-2 px-3"
      >
        <div className="font-bold">{system.name}</div>
        <div className="text-xs">Hvězda: {system.starType.replace('_', ' ')}</div>
        <div className="text-xs">Planet: {system.planets}</div>
        <div className="text-xs">
          Status: {system.explored ? "Prozkoumaný" : "Neprozkoumaný"}
        </div>
        {system.anomalyPresent && (
          <div className="text-xs text-purple-400">Detekována anomálie</div>
        )}
      </TooltipContent>
    </Tooltip>
  );
};

export default SystemTooltip;
