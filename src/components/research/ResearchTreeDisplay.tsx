
import React, { useState, useRef, useEffect } from 'react';
import { useResearch } from '@/contexts/ResearchContext';
import ResearchNode from './ResearchNode';
import ResearchConnection from './ResearchConnection';

const ResearchTreeDisplay: React.FC = () => {
  const { 
    technologies, 
    researchState,
    updateViewPosition,
    updateZoomLevel
  } = useResearch();
  
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  
  // Apply category filter if active
  const visibleTechs = researchState.activeCategoryFilter
    ? technologies.filter(tech => tech.categoryKey === researchState.activeCategoryFilter)
    : technologies;
  
  // Get connections
  const connections = visibleTechs.flatMap(tech => 
    tech.prerequisites_TechIds
      .filter(prereqId => visibleTechs.some(t => t.techId === prereqId))
      .map(prereqId => ({
        from: prereqId,
        to: tech.techId
      }))
  );
  
  // Handle mouse down for dragging
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  };
  
  // Handle mouse move for dragging
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    
    const dx = e.clientX - dragStart.x;
    const dy = e.clientY - dragStart.y;
    
    updateViewPosition({
      x: researchState.viewPosition.x + dx,
      y: researchState.viewPosition.y + dy
    });
    
    setDragStart({ x: e.clientX, y: e.clientY });
  };
  
  // Handle mouse up to end dragging
  const handleMouseUp = () => {
    setIsDragging(false);
  };
  
  // Handle mouse leave to end dragging
  const handleMouseLeave = () => {
    setIsDragging(false);
  };
  
  // Handle wheel for zooming
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    const newZoom = Math.max(0.5, Math.min(2, researchState.zoomLevel + delta));
    
    updateZoomLevel(newZoom);
  };
  
  // Add and remove event listeners
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    const handleMouseUpGlobal = () => {
      setIsDragging(false);
    };
    
    document.addEventListener('mouseup', handleMouseUpGlobal);
    
    return () => {
      document.removeEventListener('mouseup', handleMouseUpGlobal);
    };
  }, []);
  
  return (
    <div 
      className="w-full h-full overflow-hidden bg-space-dark border border-space-buttons-border rounded-lg"
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      onWheel={handleWheel}
    >
      <div 
        className="relative w-full h-full"
        style={{ 
          transform: `translate(${researchState.viewPosition.x}px, ${researchState.viewPosition.y}px) scale(${researchState.zoomLevel})`,
          transformOrigin: 'center center',
          transition: isDragging ? 'none' : 'transform 0.3s ease'
        }}
      >
        {/* Draw connections first (below nodes) */}
        {connections.map((conn, index) => (
          <ResearchConnection 
            key={`${conn.from}-${conn.to}`}
            fromTechId={conn.from}
            toTechId={conn.to}
          />
        ))}
        
        {/* Draw nodes */}
        {visibleTechs.map(tech => (
          <ResearchNode
            key={tech.techId}
            techId={tech.techId}
          />
        ))}
      </div>
    </div>
  );
};

export default ResearchTreeDisplay;
