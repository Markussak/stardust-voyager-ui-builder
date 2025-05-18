
import React from 'react';

const MiniMap = () => {
  return (
    <div className="relative w-36 h-36 rounded-full bg-black bg-opacity-70 border border-space-dark overflow-hidden pointer-events-auto">
      {/* Grid background */}
      <div className="absolute inset-0 opacity-30 bg-grid-pattern"></div>
      
      {/* Central indicator for player */}
      <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-green-400 transform -translate-x-1/2 -translate-y-1/2 rotate-45"></div>
      
      {/* Scanning line effect */}
      <div className="absolute top-1/2 left-1/2 w-full origin-center h-0.5 bg-blue-400 bg-opacity-40 animate-spin transform -translate-y-1/2" style={{ animationDuration: '4s' }}></div>
      
      {/* Sample objects - in a real implementation these would be dynamically positioned */}
      <div className="absolute top-1/4 left-2/3 w-1.5 h-1.5 rounded-full bg-blue-500"></div>
      <div className="absolute top-3/4 left-1/4 w-1.5 h-1.5 rounded-full bg-yellow-300"></div>
      
      {/* Range indicator */}
      <div className="absolute top-1/2 left-1/2 w-3/4 h-3/4 rounded-full border border-dashed border-blue-400 border-opacity-40 transform -translate-x-1/2 -translate-y-1/2"></div>
    </div>
  );
};

export default MiniMap;
