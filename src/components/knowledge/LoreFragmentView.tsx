
import React from 'react';
import { useProceduralLore } from '@/contexts/ProceduralLoreContext';
import { GeneratedLoreFragment } from '@/types/events';

interface LoreFragmentViewProps {
    fragmentId: string;
}

const LoreFragmentView: React.FC<LoreFragmentViewProps> = ({ fragmentId }) => {
    const { generatedLoreFragments, markLoreFragmentAsRead } = useProceduralLore();
    
    // Find the fragment with this ID
    const fragment = generatedLoreFragments.find(f => f.id === fragmentId);
    
    if (!fragment) {
        return (
            <div className="flex flex-col justify-center items-center h-[400px] text-space-ui-subtext">
                <p className="font-pixel text-center mb-4">Fragment nelze načíst</p>
            </div>
        );
    }
    
    // Mark as read when viewed
    React.useEffect(() => {
        if (!fragment.isRead) {
            markLoreFragmentAsRead(fragmentId);
        }
    }, [fragmentId, fragment.isRead, markLoreFragmentAsRead]);
    
    // Apply visual style class based on fragment type
    const getStyleClass = (style?: string): string => {
        switch(style) {
            case 'AncientTablet_StoneTexture':
                return 'font-serif border-2 border-amber-900/30 bg-stone-900/20 text-amber-200/90';
            case 'DataLog_DigitalScreen':
                return 'font-mono border border-blue-800/30 bg-blue-950/20 text-blue-200/90';
            case 'HandwrittenNote_Scratched':
                return 'font-handwritten border border-zinc-700/30 bg-zinc-900/20 text-zinc-300/90';
            default:
                return 'text-space-ui-text';
        }
    };
    
    const styleClass = getStyleClass(fragment.visualStyle);
    
    return (
        <div>
            <h1 className="font-pixel text-2xl text-space-ui-text mb-4">{fragment.title}</h1>
            
            {fragment.illustrationUrl && (
                <div className="mb-6">
                    <div className="w-full h-[250px] max-h-[250px] rounded-md mb-1 bg-gray-800 flex items-center justify-center">
                        {/* In a real game, this would be the actual illustration: */}
                        {/* <img src={fragment.illustrationUrl} alt={fragment.title} className="w-full h-auto max-h-[250px] object-cover rounded-md mb-1" /> */}
                        <p className="text-space-ui-subtext text-sm">[Ilustrace: {fragment.subjectType}]</p>
                    </div>
                </div>
            )}
            
            <div className={`space-y-4 p-6 rounded-md ${styleClass}`}>
                {fragment.content.map((paragraph, index) => (
                    <p key={index} className="leading-relaxed">{paragraph}</p>
                ))}
            </div>
            
            <div className="mt-6 text-xs text-space-ui-subtext">
                Záznam vytvořen: {new Date(fragment.generationTimestamp).toLocaleString()}
            </div>
        </div>
    );
};

export default LoreFragmentView;
