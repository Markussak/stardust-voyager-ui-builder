
import React from 'react';
import ProgressBar from './ProgressBar';

// Placeholder values - in a real implementation these would come from a game state
const statusData = {
  hull: { current: 85, max: 100 },
  shields: { current: 70, max: 100 },
  energy: { current: 90, max: 100 },
  fuel: { current: 45, max: 100 }
};

const StatusBars = () => {
  return (
    <div className="bg-opacity-70 bg-space-dark p-3 rounded-lg">
      <ProgressBar
        id="hull-bar"
        value={statusData.hull.current}
        max={statusData.hull.max}
        label="Hull"
        fillColor="#ff3366"
        warningThreshold={50}
        criticalThreshold={25}
      />
      
      <ProgressBar
        id="shields-bar"
        value={statusData.shields.current}
        max={statusData.shields.max}
        label="Shields"
        fillColor="#3388ff"
        warningThreshold={40}
        criticalThreshold={20}
      />
      
      <ProgressBar
        id="energy-bar"
        value={statusData.energy.current}
        max={statusData.energy.max}
        label="Energy"
        fillColor="#00ccff"
        warningThreshold={30}
        criticalThreshold={15}
      />
      
      <ProgressBar
        id="fuel-bar"
        value={statusData.fuel.current}
        max={statusData.fuel.max}
        label="Fuel"
        fillColor="#3388ff"
        warningThreshold={30}
        criticalThreshold={15}
      />
    </div>
  );
};

export default StatusBars;
