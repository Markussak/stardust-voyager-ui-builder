
import React, { createContext, useContext, useState } from 'react';
import { toast } from 'sonner';
import { 
    ProceduralLoreContextType, 
    LoreTemplate, 
    GeneratedLoreFragment,
    ProceduralLoreGenerationConfig,
    LorePlaceholder
} from '../types/events';
import { sampleLoreTemplates, sampleRandomWordLists } from '../data/loreTempates';
import { useGame } from './GameContext';
import { useCodex } from './CodexContext';

// Configuration for the procedural lore generation system
const defaultLoreGenerationConfig: ProceduralLoreGenerationConfig = {
    id: "MainProceduralLoreGenerator",
    generationTrigger_Events: [
        "NewSystemDiscovered", 
        "PlanetScanned_HighDetail", 
        "FactionFirstContact_Minor", 
        "AnomalyInvestigated_NonCritical", 
        "DerelictExplored_DataCoreFound"
    ],
    loreTemplateDatabase_Path: "assets/data/lore_templates/procedural_lore_cz.json",
    maxLoreFragments_PerSubjectType_InCodex_PerPlaythrough: 5,
    integration_With_CodexScreen_Id: "KnowledgeLibraryScreen",
    soundEffect_NewLoreFragment_Discovered: "sfx/ui/codex_new_lore_uncovered_subtle_chime.wav",
    randomWordLists_ForPlaceholders_Path: "assets/data/lore_templates/random_word_lists_cz.json"
};

// Create context with default values
const ProceduralLoreContext = createContext<ProceduralLoreContextType>({
    generatedLoreFragments: [],
    recentlyGeneratedLoreIds: [],
    generateLoreForContext: () => null,
    markLoreFragmentAsRead: () => {},
    config: defaultLoreGenerationConfig
});

export const useProceduralLore = () => {
    const context = useContext(ProceduralLoreContext);
    if (!context) {
        throw new Error('useProceduralLore must be used within a ProceduralLoreProvider');
    }
    return context;
};

export const ProceduralLoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { isGameStarted } = useGame();
    const { selectEntry } = useCodex();
    const [config] = useState<ProceduralLoreGenerationConfig>(defaultLoreGenerationConfig);
    const [generatedLoreFragments, setGeneratedLoreFragments] = useState<GeneratedLoreFragment[]>([]);
    const [recentlyGeneratedLoreIds, setRecentlyGeneratedLoreIds] = useState<string[]>([]);
    
    // For demo, we'll use the sample templates and word lists directly
    const [loreTemplates] = useState<LoreTemplate[]>(sampleLoreTemplates);
    const [randomWordLists] = useState<{[key: string]: string[]}>(sampleRandomWordLists);

    // Generate lore based on a game event and context data
    const generateLoreForContext = (triggerEvent: string, contextData: any): GeneratedLoreFragment | null => {
        if (!isGameStarted || !config.generationTrigger_Events.includes(triggerEvent)) {
            return null;
        }
        
        // Find eligible templates for this trigger event
        const eligibleTemplates = loreTemplates.filter(template => {
            // Check if this template matches the trigger event
            if (template.unlockCondition_CodexEntry_Trigger === triggerEvent) {
                // Check if we've reached the limit for this subject type
                const existingOfThisType = generatedLoreFragments.filter(
                    fragment => fragment.subjectType === template.subjectType
                ).length;
                
                return existingOfThisType < config.maxLoreFragments_PerSubjectType_InCodex_PerPlaythrough;
            }
            return false;
        });
        
        if (eligibleTemplates.length === 0) {
            console.log(`No eligible templates for trigger event: ${triggerEvent}`);
            return null;
        }
        
        // Select a template (could be random or weighted based on context)
        const selectedTemplate = eligibleTemplates[Math.floor(Math.random() * eligibleTemplates.length)];
        
        // Generate content from template
        const generatedContent = generateContentFromTemplate(selectedTemplate, contextData);
        if (!generatedContent) {
            return null;
        }
        
        // Create a title
        const title = generateTitleFromContent(selectedTemplate, generatedContent);
        
        // Create the lore fragment
        const loreFragment: GeneratedLoreFragment = {
            id: `lore_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
            templateId: selectedTemplate.templateId,
            subjectType: selectedTemplate.subjectType,
            title,
            content: generatedContent,
            generationTimestamp: Date.now(),
            isRead: false,
            visualStyle: selectedTemplate.visualStyle_InCodex,
            illustrationUrl: selectedTemplate.associatedIllustration_Tag ? 
                `assets/images/codex/${selectedTemplate.associatedIllustration_Tag}_illustration.png` : 
                undefined,
            relatedEntityId: contextData.entityId
        };
        
        // Add to generated fragments
        setGeneratedLoreFragments(prev => [...prev, loreFragment]);
        setRecentlyGeneratedLoreIds(prev => [...prev, loreFragment.id]);
        
        // Notify player
        toast.info(`Nový záznam v Knižnici Znalostí: ${title}`, {
            duration: 5000,
            action: {
                label: "Zobrazit",
                onClick: () => {
                    // This would open the codex to this entry in a full implementation
                    selectEntry(loreFragment.id);
                }
            }
        });
        
        return loreFragment;
    };
    
    // Helper function to generate content from a template
    const generateContentFromTemplate = (template: LoreTemplate, contextData: any): string[] | null => {
        try {
            const content: string[] = [];
            
            // For each paragraph template in the structure
            template.textParagraphTemplates_cz.forEach(paragraphTemplate => {
                // Select a random variant for this paragraph
                const variant = paragraphTemplate.variants[
                    Math.floor(Math.random() * paragraphTemplate.variants.length)
                ];
                
                // Fill in the placeholders
                let filledParagraph = variant;
                template.placeholders.forEach(placeholder => {
                    const value = resolveValueForPlaceholder(placeholder, contextData);
                    filledParagraph = filledParagraph.replace(
                        new RegExp(placeholder.key, 'g'), 
                        value
                    );
                });
                
                content.push(filledParagraph);
            });
            
            return content;
        } catch (error) {
            console.error("Error generating content from template:", error);
            return null;
        }
    };
    
    // Helper function to resolve a value for a placeholder
    const resolveValueForPlaceholder = (placeholder: LorePlaceholder, contextData: any): string => {
        switch (placeholder.sourceType) {
            case 'Context_CurrentSystem':
            case 'Context_CurrentPlanet':
                if (contextData && contextData[placeholder.sourceDataKey || '']) {
                    return contextData[placeholder.sourceDataKey || ''];
                }
                return `[${placeholder.key}]`; // Fallback if data is missing
                
            case 'Context_RandomKnownFaction':
                if (contextData && contextData.knownFactions && 
                    contextData.knownFactions.length > 0 && 
                    placeholder.sourceDataKey) {
                    
                    const faction = contextData.knownFactions[
                        Math.floor(Math.random() * contextData.knownFactions.length)
                    ];
                    return faction[placeholder.sourceDataKey] || `[${placeholder.key}]`;
                }
                return "neznámá frakce"; // Default fallback
                
            case 'Context_SpecificItem':
                if (contextData && contextData.items && 
                    contextData.items[placeholder.sourceDataKey || '']) {
                    
                    return contextData.items[placeholder.sourceDataKey || ''];
                }
                return `[${placeholder.key}]`;
                
            case 'Random_FromList':
                if (placeholder.randomList_Key && 
                    randomWordLists[placeholder.randomList_Key] && 
                    randomWordLists[placeholder.randomList_Key].length > 0) {
                    
                    const list = randomWordLists[placeholder.randomList_Key];
                    return list[Math.floor(Math.random() * list.length)];
                }
                return `[${placeholder.key}]`;
                
            default:
                return `[${placeholder.key}]`;
        }
    };
    
    // Helper function to generate a title from content
    const generateTitleFromContent = (template: LoreTemplate, content: string[]): string => {
        // Different strategies could be used here
        
        // Example 1: Use a key phrase from the first paragraph
        const firstPara = content[0];
        const potentialTitleWords = firstPara
            .split(' ')
            .filter(word => word.length > 4)
            .slice(0, 10);
        
        if (potentialTitleWords.length >= 3) {
            return `${potentialTitleWords[0]} ${potentialTitleWords[1]} ${potentialTitleWords[2]}...`;
        }
        
        // Example 2: Use the subject type as a basis
        switch(template.subjectType) {
            case 'DerelictShip_PersonalLog_FinalEntry':
                return `Poslední záznam: ${getSubjectName(content[0])}`;
            case 'AncientCivilization_ArchitecturalStyle':
                return `Prastaré ruiny na ${getLocationName(content[0])}`;
            default:
                return `${template.textStructure_KeyElements_cz[0]}: ${getSubjectName(content[0])}`;
        }
    };
    
    // Helper to extract a subject name from content
    const getSubjectName = (content: string): string => {
        // Simple extraction based on patterns like [Name: VALUE]
        const nameMatch = content.match(/\[\w+:\s([^\]]+)\]/);
        if (nameMatch && nameMatch[1]) {
            return nameMatch[1];
        }
        
        // Extract first sentence
        const firstSentence = content.split('.')[0];
        
        // Return a substring
        return firstSentence.substring(0, 20) + "...";
    };
    
    // Helper to extract a location name from content
    const getLocationName = (content: string): string => {
        // Look for planet names
        const planetMatch = content.match(/planetě\s+([A-Z][a-z]+)/);
        if (planetMatch && planetMatch[1]) {
            return planetMatch[1];
        }
        
        // Fallback
        return "Neznámé místo";
    };

    // Mark a lore fragment as read
    const markLoreFragmentAsRead = (fragmentId: string) => {
        setGeneratedLoreFragments(prev => 
            prev.map(fragment => fragment.id === fragmentId ? { ...fragment, isRead: true } : fragment)
        );
        
        // Remove from recently generated ids after marking as read
        setRecentlyGeneratedLoreIds(prev => prev.filter(id => id !== fragmentId));
    };

    const value = {
        generatedLoreFragments,
        recentlyGeneratedLoreIds,
        generateLoreForContext,
        markLoreFragmentAsRead,
        config
    };

    return (
        <ProceduralLoreContext.Provider value={value}>
            {children}
        </ProceduralLoreContext.Provider>
    );
};
