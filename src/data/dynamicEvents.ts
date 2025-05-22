
import { DynamicEventDefinition, DynamicEventType, DynamicEventTriggerType } from '../types/events';

// Sample dynamic events data in Czech
export const sampleDynamicEvents: DynamicEventDefinition[] = [
    // Economic boom event
    {
        eventId: "economic_boom_alpha_sector",
        eventType: DynamicEventType.Economic_Boom_Sector,
        eventNameKey: "event.econ_boom.alpha.name", 
        defaultEventName: "Ekonomický Rozkvět v Sektoru Alfa",
        eventDescriptionKey_Short: "event.econ_boom.alpha.desc_short", 
        defaultEventDescription_Short: "Sektor Alfa zažívá nebývalý ekonomický růst díky nově otevřeným obchodním trasám. Ceny luxusního zboží stoupají, zatímco průmyslové komponenty jsou levnější.",
        triggerConditions: [
            { 
                type: DynamicEventTriggerType.TimeElapsed_Random, 
                parameters: { minTime_Days: 50, maxTime_Days: 150 }, 
                probabilityFactor: 0.1 
            }
        ],
        duration_GameTurns_Or_SpecificCondition: 720, // 30 herních dnů
        impacts: [
            { 
                target: 'Sector', 
                targetId: "SECTOR_ALPHA", 
                effectType: 'EconomicShift_ResourcePrice', 
                parameters: { 
                    resourceCategoryId: "LuxuryGoods", 
                    priceMultiplierChange: 0.25
                }, 
                descriptionKey_Impact: "impact.econ_boom.luxury_price_up", 
                defaultDescription_Impact: "Ceny luxusního zboží v Sektoru Alfa vzrostly." 
            },
            { 
                target: 'Sector', 
                targetId: "SECTOR_ALPHA", 
                effectType: 'EconomicShift_ResourcePrice', 
                parameters: { 
                    resourceCategoryId: "IndustrialComponents", 
                    priceMultiplierChange: -0.15
                }, 
                descriptionKey_Impact: "impact.econ_boom.industrial_price_down", 
                defaultDescription_Impact: "Ceny průmyslových komponent v Sektoru Alfa klesly." 
            },
            { 
                target: 'Player', 
                effectType: 'OfferQuestToPlayer', 
                parameters: { 
                    missionId_Template: "mission_boom_delivery_alpha_{random_id}", 
                    missionType: "SideQuest_Delivery_Trade", 
                    rewardMultiplier: 1.2 
                } 
            }
        ],
        visualCue_GalaxyMap_IconAsset: "assets/images/icons/events/map_icon_economic_boom_positive.png",
        soundEffect_Notification_MajorEvent: "sfx/events/economic_boom_positive_fanfare_short.wav",
        codexEntry_ToUnlock_Id: "codex.event.alpha_sector_boom_history"
    },
    
    // War declaration event
    {
        eventId: "war_solcon_krall_start",
        eventType: DynamicEventType.GalacticWar_Start,
        eventNameKey: "event.war.solcon_krall.name", 
        defaultEventName: "VÁLEČNÝ STAV: Solární Konfederace vs. Krallské Impérium",
        eventDescriptionKey_Short: "event.war.solcon_krall.desc_short", 
        defaultEventDescription_Short: "Krallské Impérium vyhlásilo válku Solární Konfederaci po měsících napětí. Vojenské jednotky obou stran jsou mobilizovány po celé galaxii.",
        eventDescriptionKey_Detailed_Codex: "event.war.solcon_krall.desc_detailed", 
        defaultEventDescription_Detailed_Codex: "Po měsících diplomatických sporů o hraniční systémy a údajné narušení svrchovanosti vyhlásil Krallský Imperátor Zax'Thal formální válečný stav Solární Konfederaci. První útok byl veden proti stanici Epsilon Outpost, přičemž bylo nasazeno přes 50 válečných lodí. Prezidentka Konfederace Garcia oznámila úplnou mobilizaci obranných flotil a vyzvala spojence k podpoře. Analytici očekávají dlouhý a nákladný konflikt.",
        triggerConditions: [
            { 
                type: DynamicEventTriggerType.TimeElapsed_Random, 
                parameters: { minTime_Days: 60, maxTime_Days: 180 }, 
                probabilityFactor: 0.08 
            },
            { 
                type: DynamicEventTriggerType.PlayerAction_ReputationChange, 
                parameters: { 
                    factionId: "KrallEmpire", 
                    reputationThreshold_Below: -50, 
                    playerInvolvement_Required: false 
                }, 
                probabilityFactor: 0.3 
            }
        ],
        duration_GameTurns_Or_SpecificCondition: "TreatySigned_war_sc_ke",
        impacts: [
            { 
                target: 'Faction', 
                targetId: "SolarConfederacy", 
                effectType: 'InitiateWar_BetweenFactions', 
                parameters: { 
                    targetFactionId: "KrallEmpire", 
                    intensity: "FullScale" 
                }, 
                descriptionKey_Impact: "impact.war.factions.started", 
                defaultDescription_Impact: "Vztahy mezi Solární Konfederací a Krallským Impériem se změnily na 'Válečný stav'." 
            },
            { 
                target: 'System', 
                targetId: "SYSTEM_EPSILON_BORDER", 
                effectType: 'SpawnUnits_Hostile', 
                parameters: { 
                    factionId: "KrallEmpire", 
                    shipClassId: "krall_strike_fleet", 
                    count: 3 
                } 
            }
        ],
        playerInteraction_Options: [
            {
                choiceId: "support_solcon",
                choiceTextKey: "choice.war.support_solcon",
                defaultChoiceText: "Podpořit Solární Konfederaci",
                action_Effect_Impacts: [
                    {
                        target: 'Faction',
                        targetId: "SolarConfederacy",
                        effectType: 'ReputationChange',
                        parameters: { changeAmount: 25 },
                        descriptionKey_Impact: "impact.rep.solcon.increase",
                        defaultDescription_Impact: "Vaše reputace u Solární Konfederace se zvýšila."
                    },
                    {
                        target: 'Faction',
                        targetId: "KrallEmpire",
                        effectType: 'ReputationChange',
                        parameters: { changeAmount: -25 },
                        descriptionKey_Impact: "impact.rep.krall.decrease",
                        defaultDescription_Impact: "Vaše reputace u Krallského Impéria se snížila."
                    }
                ],
                soundEffect_OnChoice: "sfx/ui/choice_confirm_military_alert.wav"
            },
            {
                choiceId: "support_krall",
                choiceTextKey: "choice.war.support_krall",
                defaultChoiceText: "Podpořit Krallské Impérium",
                action_Effect_Impacts: [
                    {
                        target: 'Faction',
                        targetId: "KrallEmpire",
                        effectType: 'ReputationChange',
                        parameters: { changeAmount: 25 },
                        descriptionKey_Impact: "impact.rep.krall.increase",
                        defaultDescription_Impact: "Vaše reputace u Krallského Impéria se zvýšila."
                    },
                    {
                        target: 'Faction',
                        targetId: "SolarConfederacy",
                        effectType: 'ReputationChange',
                        parameters: { changeAmount: -25 },
                        descriptionKey_Impact: "impact.rep.solcon.decrease",
                        defaultDescription_Impact: "Vaše reputace u Solární Konfederace se snížila."
                    }
                ],
                soundEffect_OnChoice: "sfx/ui/choice_confirm_military_alert.wav"
            },
            {
                choiceId: "remain_neutral",
                choiceTextKey: "choice.war.remain_neutral",
                defaultChoiceText: "Zůstat neutrální",
                action_Effect_Impacts: [],
                soundEffect_OnChoice: "sfx/ui/choice_confirm_neutral_soft.wav"
            }
        ],
        visualCue_GalaxyMap_IconAsset: "assets/images/icons/events/map_icon_warzone.png",
        visualCue_SystemMap_Effect_AssetPath: "assets/effects/battle_animation_distant_flashes.fx",
        soundEffect_Notification_MajorEvent: "sfx/events/major_event_war_declaration_broadcast_alarm.wav",
        codexEntry_ToUnlock_Id: "codex.event.solcon_krall_war_beginning",
        isUnique_OneTimeEvent: false,
        weight_ForRandomSelection: 1.5
    },
    
    // Cosmic storm event
    {
        eventId: "cosmic_storm_beta_sector",
        eventType: DynamicEventType.NaturalDisaster_CosmicStorm_NavigationHazard,
        eventNameKey: "event.cosmic_storm.beta.name", 
        defaultEventName: "Kosmická bouře v Sektoru Beta",
        eventDescriptionKey_Short: "event.cosmic_storm.beta.desc_short", 
        defaultEventDescription_Short: "Silná kosmická bouře se formuje v Sektoru Beta. Navigace a štíty lodí jsou v oblasti narušeny. Doporučuje se zvýšená opatrnost.",
        triggerConditions: [
            { 
                type: DynamicEventTriggerType.TimeElapsed_Random, 
                parameters: { minTime_Days: 30, maxTime_Days: 90 }, 
                probabilityFactor: 0.12 
            }
        ],
        duration_GameTurns_Or_SpecificCondition: 240, // 10 herních dnů
        impacts: [
            { 
                target: 'Sector', 
                targetId: "SECTOR_BETA", 
                effectType: 'ChangeSystemSecurityLevel', 
                parameters: { 
                    securityLevelChange: -1, 
                    reason: "Kosmická bouře narušuje systémy a komunikaci" 
                }, 
                duration_TemporaryEffect_GameTurns: 240,
                descriptionKey_Impact: "impact.cosmic_storm.security_decreased", 
                defaultDescription_Impact: "Úroveň bezpečnosti v Sektoru Beta se dočasně snížila." 
            }
        ],
        visualCue_GalaxyMap_IconAsset: "assets/images/icons/events/map_icon_cosmic_storm_hazard.png",
        soundEffect_Notification_MajorEvent: "sfx/events/cosmic_storm_approaching_ominous_rumble.wav",
        codexEntry_ToUnlock_Id: "codex.event.cosmic_storm_phenomenon"
    }
];
