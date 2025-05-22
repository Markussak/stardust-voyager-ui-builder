
import { LoreTemplate, LoreSubjectType, DynamicEventTriggerType } from '../types/events';

// Sample lore templates in Czech
export const sampleLoreTemplates: LoreTemplate[] = [
    // Ancient ruins template
    {
        templateId: "ancient_ruins_discovery",
        subjectType: LoreSubjectType.AncientCivilization_ArchitecturalStyle,
        textStructure_KeyElements_cz: ["Objev", "Architektonický styl", "Teorie o funkci", "Kultovní význam"],
        textParagraphTemplates_cz: [
            {
                paragraphKey: "discovery",
                variants: [
                    "Na planetě {planetName} byly objeveny pozůstatky prastaré architektury. První průzkumníci narazili na tyto ruiny při {discoveryCircumstance}.",
                    "Rozsáhlý komplex ruin byl odhalen na {planetLocation} planety {planetName}. Průzkumný tým {factionName} je objevil při {discoveryCircumstance}."
                ]
            },
            {
                paragraphKey: "architecture_style",
                variants: [
                    "Stavby vykazují {architectureFeature} design s použitím materiálů připomínajících {materialDescription}. Zdá se, že jejich tvůrci měli vyspělé znalosti {ancientKnowledge}.",
                    "Architektura kombinuje nezvyklé {architectureFeature} prvky s precizně opracovaným {materialDescription}. Struktury jsou orientovány podle {orientationPattern}, což naznačuje pokročilou znalost {ancientKnowledge}."
                ]
            },
            {
                paragraphKey: "function_theory",
                variants: [
                    "Xenoarcheologové se domnívají, že komplex mohl sloužit jako {ancientPurpose}. Nalezené artefakty naznačují, že obyvatelé byli {ancientCivilizationTrait} společností.",
                    "Analýza uspořádání ruin ukazuje, že místo pravděpodobně fungovalo jako {ancientPurpose}. Rozmístění místností a chodeb odpovídá potřebám {ancientCivilizationTrait} civilizace."
                ]
            },
            {
                paragraphKey: "cultural_significance",
                variants: [
                    "Některé symboly vyryté do zdí připomínají {symbolDescription}. Místní {localSpecies} o ruinách mluví s {localAttitude} a tradují legendu o {localLegend}.",
                    "V centrální síni se nachází intrikátní mozaika zobrazující {symbolDescription}. Podle legendy {localLegend}, což místní {localSpecies} považují za {localAttitude} znamení."
                ]
            }
        ],
        placeholders: [
            {
                key: "{planetName}",
                sourceType: 'Context_CurrentPlanet',
                sourceDataKey: "name"
            },
            {
                key: "{planetLocation}",
                sourceType: 'Random_FromList',
                randomList_Key: "planet_locations_cz"
            },
            {
                key: "{factionName}",
                sourceType: 'Context_RandomKnownFaction',
                sourceDataKey: "name"
            },
            {
                key: "{discoveryCircumstance}",
                sourceType: 'Random_FromList',
                randomList_Key: "discovery_circumstances_cz"
            },
            {
                key: "{architectureFeature}",
                sourceType: 'Random_FromList',
                randomList_Key: "architecture_features_cz"
            },
            {
                key: "{materialDescription}",
                sourceType: 'Random_FromList',
                randomList_Key: "material_descriptions_cz"
            },
            {
                key: "{ancientKnowledge}",
                sourceType: 'Random_FromList',
                randomList_Key: "ancient_knowledge_domains_cz"
            },
            {
                key: "{orientationPattern}",
                sourceType: 'Random_FromList',
                randomList_Key: "orientation_patterns_cz"
            },
            {
                key: "{ancientPurpose}",
                sourceType: 'Random_FromList',
                randomList_Key: "ancient_building_purposes_cz"
            },
            {
                key: "{ancientCivilizationTrait}",
                sourceType: 'Random_FromList',
                randomList_Key: "civilization_traits_cz"
            },
            {
                key: "{symbolDescription}",
                sourceType: 'Random_FromList',
                randomList_Key: "symbol_descriptions_cz"
            },
            {
                key: "{localSpecies}",
                sourceType: 'Context_CurrentPlanet',
                sourceDataKey: "dominant_species"
            },
            {
                key: "{localAttitude}",
                sourceType: 'Random_FromList',
                randomList_Key: "local_attitudes_cz"
            },
            {
                key: "{localLegend}",
                sourceType: 'Random_FromList',
                randomList_Key: "local_legends_cz"
            }
        ],
        unlockCondition_CodexEntry_Trigger: DynamicEventTriggerType.AnomalyDiscovery,
        unlockCondition_Parameters: { 
            anomalyType: "AncientRuins" 
        },
        visualStyle_InCodex: 'AncientTablet_StoneTexture',
        associatedIllustration_Tag: "ancient_ruins"
    },
    // Derelict ship log template
    {
        templateId: "derelict_ship_log",
        subjectType: LoreSubjectType.DerelictShip_PersonalLog_FinalEntry,
        textStructure_KeyElements_cz: ["Identifikace lodi", "Poslední zpráva", "Poslední okamžiky", "Nález"],
        textParagraphTemplates_cz: [
            {
                paragraphKey: "ship_identification",
                variants: [
                    "[Lodní deník: {shipName}]\nIdentifikace: {shipRegistry}\nKapitán: {captainName}\nDatum: {date}",
                    "[Záznam z osobního datapadu]\nNalezeno na palubě lodi: {shipName}\nPoslední známý vlastník: {captainName}\nPoslední aktualizace: {date}"
                ]
            },
            {
                paragraphKey: "last_message",
                variants: [
                    "Pokud někdo nalezne tento záznam, vězte, že jsme {lastAction} když {disasterEvent}. Naše systémy {systemStatus} a my jsme {crewState}.",
                    "Toto je poslední zpráva lodi {shipName}. {disasterEvent} nás zastihlo při {lastAction}. {systemStatus}, posádka {crewState}."
                ]
            },
            {
                paragraphKey: "final_moments",
                variants: [
                    "Poslední rozkazy byly {lastOrders}. Pokusili jsme se {escapeAttempt}, ale {failureReason}. Naše poslední naděje je {lastHope}.",
                    "{lastOrders} - to byl poslední pokyn, než {disruption}. {escapeAttempt} se ukázal jako nemožný kvůli {failureReason}. Pokud to čtete, {lastHope} se asi nevyplnilo."
                ]
            },
            {
                paragraphKey: "discovery",
                variants: [
                    "Zpráva končí. Průzkumný tým na místě nalezl {discovery}. Analýza dat ukazuje, že k incidentu došlo před přibližně {timeElapsed}.",
                    "Více informací není k dispozici. Skenování lodi odhalilo {discovery}. Od katastrofy uplynulo odhadem {timeElapsed}."
                ]
            }
        ],
        placeholders: [
            {
                key: "{shipName}",
                sourceType: 'Random_FromList',
                randomList_Key: "ship_names_cz"
            },
            {
                key: "{shipRegistry}",
                sourceType: 'Random_FromList',
                randomList_Key: "ship_registries_cz"
            },
            {
                key: "{captainName}",
                sourceType: 'Random_FromList',
                randomList_Key: "captain_names_cz"
            },
            {
                key: "{date}",
                sourceType: 'Random_FromList',
                randomList_Key: "future_date_formats_cz"
            },
            {
                key: "{lastAction}",
                sourceType: 'Random_FromList',
                randomList_Key: "ship_last_actions_cz"
            },
            {
                key: "{disasterEvent}",
                sourceType: 'Random_FromList',
                randomList_Key: "ship_disaster_events_cz"
            },
            {
                key: "{systemStatus}",
                sourceType: 'Random_FromList',
                randomList_Key: "ship_system_status_cz"
            },
            {
                key: "{crewState}",
                sourceType: 'Random_FromList',
                randomList_Key: "crew_states_cz"
            },
            {
                key: "{lastOrders}",
                sourceType: 'Random_FromList',
                randomList_Key: "captain_last_orders_cz"
            },
            {
                key: "{escapeAttempt}",
                sourceType: 'Random_FromList',
                randomList_Key: "escape_attempts_cz"
            },
            {
                key: "{failureReason}",
                sourceType: 'Random_FromList',
                randomList_Key: "escape_failure_reasons_cz"
            },
            {
                key: "{lastHope}",
                sourceType: 'Random_FromList',
                randomList_Key: "last_hopes_cz"
            },
            {
                key: "{disruption}",
                sourceType: 'Random_FromList',
                randomList_Key: "disruption_events_cz"
            },
            {
                key: "{discovery}",
                sourceType: 'Random_FromList',
                randomList_Key: "ship_discoveries_cz"
            },
            {
                key: "{timeElapsed}",
                sourceType: 'Random_FromList',
                randomList_Key: "time_periods_cz"
            }
        ],
        unlockCondition_CodexEntry_Trigger: DynamicEventTriggerType.AnomalyDiscovery,
        unlockCondition_Parameters: { 
            anomalyType: "DerelictShip" 
        },
        visualStyle_InCodex: 'DataLog_DigitalScreen',
        associatedIllustration_Tag: "derelict_ship"
    }
];

// Sample random word lists for lore generation in Czech
export const sampleRandomWordLists: {[key: string]: string[]} = {
    "planet_locations_cz": [
        "severním pólu", 
        "jižní polokouli", 
        "rovníkovém pásu", 
        "centrálním kontinentu", 
        "pobřeží hlavního oceánu", 
        "hlubokém údolí", 
        "vysoké náhorní plošině", 
        "odvrácené straně"
    ],
    "discovery_circumstances_cz": [
        "mapování geologických anomálií", 
        "rutinním průzkumu oblasti", 
        "instalaci těžební stanice", 
        "útěku před místní bouří", 
        "sledování podivných energetických signálů", 
        "hledání vhodného místa pro kolonii", 
        "záchranné misi po havárii"
    ],
    "architecture_features_cz": [
        "geometricky dokonalý", 
        "organicky zakřivený", 
        "paradoxně uspořádaný", 
        "nemožně vyvážený", 
        "spirálovitě stoupající", 
        "symetricky propojený", 
        "matematicky precizní"
    ],
    "material_descriptions_cz": [
        "krystalickou látku neznámého původu", 
        "metalický kompozit odolný vůči erozi", 
        "porézní kámen s luminiscenčními vlastnostmi", 
        "materiál měnící barvu v závislosti na teplotě", 
        "slitinu lehčí než voda, ale pevnější než ocel", 
        "na dotek chladný materiál vyzařující slabou energii"
    ],
    "ship_names_cz": [
        "Vesmírný poutník", 
        "Hvězdný průzkumník", 
        "Posel úsvitu", 
        "Noční stín", 
        "Strážce horizontu", 
        "Vzdálený sen", 
        "Odvážný", 
        "Mlžná pláň"
    ],
    "ship_registries_cz": [
        "SC-31942", 
        "KE-76021", 
        "NEZ-113", 
        "TR-88750", 
        "EC-42098", 
        "MF-60137", 
        "SX-95273"
    ]
    // More lists would be added here...
};
