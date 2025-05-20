
import React from 'react';
import { useShipMovement } from '../../contexts/ShipMovementContext';
import { Button } from '../ui/button';

const ShipMovementControls: React.FC = () => {
  const { 
    currentMovementState,
    setFlightAssist,
    initiateWarpCharge,
    cancelWarpCharge
  } = useShipMovement();
  
  const {
    thrusting,
    braking,
    strafingLeft,
    strafingRight,
    boosting,
    rotatingLeft,
    rotatingRight,
    flightAssistActive,
    chargingWarp,
    inWarp,
    velocity
  } = currentMovementState;

  const speed = Math.sqrt(velocity.x * velocity.x + velocity.y * velocity.y);
  
  return (
    <div className="fixed bottom-20 right-5 p-4 bg-space-dark/90 rounded-lg border border-space-border w-64 text-space-ui-text">
      <h3 className="text-sm font-pixel mb-2 text-space-ui-text">Ship Movement Controls</h3>
      
      <div className="space-y-1 text-xs">
        <div className="flex justify-between">
          <span>Speed:</span>
          <span className="text-cyan-400">{speed.toFixed(2)} u/s</span>
        </div>
        
        <div className="flex justify-between">
          <span>Thrust:</span>
          <span className={thrusting ? "text-green-400" : "text-red-400"}>
            {thrusting ? "ACTIVE" : "IDLE"}
          </span>
        </div>
        
        <div className="flex justify-between">
          <span>Braking:</span>
          <span className={braking ? "text-yellow-400" : "text-gray-400"}>
            {braking ? "ACTIVE" : "INACTIVE"}
          </span>
        </div>
        
        <div className="flex justify-between">
          <span>Boosting:</span>
          <span className={boosting ? "text-blue-400" : "text-gray-400"}>
            {boosting ? "ACTIVE" : "INACTIVE"}
          </span>
        </div>
        
        <div className="flex justify-between">
          <span>Rotation:</span>
          <span>
            {rotatingLeft ? "LEFT" : rotatingRight ? "RIGHT" : "NONE"}
          </span>
        </div>
        
        <div className="flex justify-between">
          <span>Strafe:</span>
          <span>
            {strafingLeft ? "LEFT" : strafingRight ? "RIGHT" : "NONE"}
          </span>
        </div>
        
        <div className="flex justify-between">
          <span>Flight Assist:</span>
          <Button 
            size="sm" 
            variant={flightAssistActive ? "default" : "destructive"}
            className="py-0 h-6 text-xs"
            onClick={() => setFlightAssist(!flightAssistActive)}
          >
            {flightAssistActive ? "ON" : "OFF"}
          </Button>
        </div>
        
        <div className="flex justify-between">
          <span>Warp Drive:</span>
          {chargingWarp ? (
            <Button 
              size="sm" 
              variant="destructive" 
              className="py-0 h-6 text-xs"
              onClick={() => cancelWarpCharge()}
            >
              CANCEL
            </Button>
          ) : inWarp ? (
            <span className="text-purple-400">ACTIVE</span>
          ) : (
            <Button 
              size="sm" 
              variant="outline" 
              className="py-0 h-6 text-xs"
              onClick={() => initiateWarpCharge()}
            >
              ENGAGE
            </Button>
          )}
        </div>
      </div>
      
      <div className="mt-4 text-xs bg-space-dark/60 p-2 rounded">
        <p className="mb-1 text-space-ui-subtext">Controls:</p>
        <ul className="space-y-1 text-space-ui-subtext">
          <li>W - Thrust Forward</li>
          <li>S - Brake</li>
          <li>A/D - Rotate Left/Right</li>
          <li>Q/E - Strafe Left/Right</li>
          <li>Shift - Boost</li>
          <li>X - Toggle Flight Assist</li>
          <li>J - Engage Warp</li>
          <li>ESC - Cancel Warp</li>
        </ul>
      </div>
    </div>
  );
};

export default ShipMovementControls;
