
import React from 'react';
import { useInventory } from "@/contexts/InventoryContext";
import { Progress } from "@/components/ui/progress";
import { Package } from "lucide-react";

const CargoCapacityIndicator = () => {
  const { inventory } = useInventory();
  
  const { totalCapacity, usedCapacity } = inventory.cargoHold;
  const usagePercentage = Math.round((usedCapacity / totalCapacity) * 100);
  
  // Determine color based on capacity usage
  const getCapacityColor = () => {
    if (usagePercentage >= 90) return "text-red-500";
    if (usagePercentage >= 75) return "text-yellow-400";
    return "text-space-ui-text";
  };
  
  return (
    <div className="bg-space-dark bg-opacity-80 border border-space-buttons-border rounded-lg p-3">
      <div className="flex items-center gap-3">
        <div className="flex items-center">
          <Package size={18} className="mr-2" />
          <span className="text-sm font-pixel">Kapacita nákladu:</span>
        </div>
        
        <div className="flex-1 mx-4">
          <Progress value={usagePercentage} className="h-2" />
        </div>
        
        <div className={`text-sm font-pixel ${getCapacityColor()}`}>
          {usedCapacity.toFixed(1)} / {totalCapacity.toFixed(1)} jednotek ({usagePercentage}%)
        </div>
      </div>
    </div>
  );
};

export default CargoCapacityIndicator;
