
import Assets from '../../assets/game';

const CockpitOverlay = () => {
  return (
    <div className="absolute inset-0 pointer-events-none z-10">
      {/* Bottom cockpit edge with controls */}
      <div className="absolute bottom-0 left-0 right-0 h-[100px] bg-no-repeat bg-bottom bg-contain"
           style={{ backgroundImage: `url(${Assets.backgrounds.cockpitEdge})` }}>
        {/* Control lights */}
        <div className="absolute bottom-[40px] left-[30%] w-[8px] h-[8px] bg-red-500 rounded-full animate-blink"></div>
        <div className="absolute bottom-[60px] left-[40%] w-[6px] h-[6px] bg-green-400 rounded-full animate-controls-blink"></div>
        <div className="absolute bottom-[45px] left-[60%] w-[10px] h-[10px] bg-blue-400 rounded-full animate-pulse-glow"></div>
        <div className="absolute bottom-[55px] left-[70%] w-[7px] h-[7px] bg-yellow-400 rounded-full animate-blink" 
             style={{animationDelay: '0.5s'}}></div>
      </div>
    </div>
  );
};

export default CockpitOverlay;
