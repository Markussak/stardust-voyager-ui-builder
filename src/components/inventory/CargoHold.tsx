
import React from 'react';
import { useInventory } from "@/contexts/InventoryContext";
import InventorySlotComponent from './InventorySlot';

const CargoHold = () => {
  const { inventory } = useInventory();
  
  // Calculate grid dimensions (6 columns, 4 rows)
  const columns = 6;
  const rows = Math.ceil(inventory.cargoHold.slots.length / columns);

  return (
    <div className="flex-1 flex flex-col">
      <div 
        className="flex-1 grid gap-2"
        style={{
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          gridTemplateRows: `repeat(${rows}, 1fr)`
        }}
      >
        {inventory.cargoHold.slots.map((slot) => (
          <InventorySlotComponent 
            key={slot.slotId} 
            slot={slot} 
            className="aspect-square"
          />
        ))}
      </div>
    </div>
  );
};

export default CargoHold;
