
const VersionInfo = () => {
  const version = "0.1.0 Alpha";
  
  return (
    <div className="fixed bottom-2 right-2 text-space-ui-version font-pixel-mono text-xs flex items-center">
      <span>v{version}</span>
      <span className="ml-4">Lovable.dev</span>
    </div>
  );
};

export default VersionInfo;
