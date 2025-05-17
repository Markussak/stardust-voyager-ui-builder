
const GameLogo = () => {
  return (
    <div className="relative">
      {/* Logo container with shimmer effect */}
      <div className="relative flex flex-col items-center justify-center mb-8 z-20">
        <h1 className="font-pixel text-4xl md:text-5xl text-space-ui-text relative shimmer-effect animate-shimmer">
          <span className="relative z-10">STAR DUST VOYAGER</span>
          {/* Glow effect */}
          <span className="absolute inset-0 blur-[2px] text-space-controls animate-pulse-glow z-0"></span>
        </h1>
        <h2 className="font-pixel text-space-ui-subtext text-xl mt-3 relative">
          GALAXY WANDERER
          {/* Scanline */}
          <div className="scanline absolute left-0 w-full animate-scanline"></div>
        </h2>
      </div>
    </div>
  );
};

export default GameLogo;
