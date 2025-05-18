
import React from 'react';
import { Progress } from '@/components/ui/progress';

interface ProgressBarProps {
  id: string;
  value: number;
  max: number;
  label?: string;
  width?: number;
  height?: number;
  fillColor: string;
  warningThreshold?: number;
  criticalThreshold?: number;
  showValue?: boolean;
  icon?: string;
}

const ProgressBar = ({
  id,
  value,
  max,
  label,
  width = 150,
  height = 18,
  fillColor,
  warningThreshold = 30,
  criticalThreshold = 15,
  showValue = true,
  icon
}: ProgressBarProps) => {
  // Calculate the percentage
  const percentage = (value / max) * 100;
  
  // Determine the color based on thresholds
  const getColor = () => {
    if (percentage <= criticalThreshold) return '#FF0000'; // Critical - red
    if (percentage <= warningThreshold) return '#FFA500'; // Warning - orange
    return fillColor; // Normal
  };

  return (
    <div className="flex items-center mb-2 pointer-events-auto">
      {icon && (
        <div className="mr-2">
          <img src={icon} alt="" className="w-4 h-4 pixel-art" />
        </div>
      )}
      <div className="flex-1">
        {label && <div className="text-xs text-white mb-1">{label}</div>}
        <div className="relative" style={{ width: `${width}px` }}>
          <Progress 
            value={percentage} 
            className="h-4 bg-opacity-40 bg-black border border-space-dark" 
            indicatorClassName={`transition-all bg-[${getColor()}]`}
          />
          {showValue && (
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
              <span className="text-xs text-white">{`${Math.floor(value)}/${max}`}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
