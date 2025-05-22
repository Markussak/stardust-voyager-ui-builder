
import { CrewSystemConfig, CrewSkillId, CrewPersonalityTrait } from '@/types/crew';

export const crewSystemConfig: CrewSystemConfig = {
    maxPlayerShipCrew_DependsOnShipClass: true,
    playerCharacter_IsPartOfCrew: true,
    
    crewRoles: [
        {
            roleId: "pilot",
            displayNameKey: "crew.role.pilot",
            defaultDisplayName: "Pilot",
            primarySkills: [CrewSkillId.Piloting],
            shipStation_Associated: "bridge_pilot",
            descriptionKey: "crew.role.pilot.desc",
            defaultDescription: "Odpovídá za pilotáž a manévrování s lodí. Zkušení piloti zlepšují rychlost, zrychlení a manévrovatelnost vašeho plavidla.",
            iconUrl: "assets/images/icons/crew/role_pilot.png"
        },
        {
            roleId: "gunner",
            displayNameKey: "crew.role.gunner",
            defaultDisplayName: "Střelec",
            primarySkills: [CrewSkillId.Gunnery],
            shipStation_Associated: "weapons_control",
            descriptionKey: "crew.role.gunner.desc",
            defaultDescription: "Obsluhuje zbraňové systémy lodi. Zkušení střelci zvyšují přesnost zbraní a rychlost nabíjení.",
            iconUrl: "assets/images/icons/crew/role_gunner.png"
        },
        {
            roleId: "engineer",
            displayNameKey: "crew.role.engineer",
            defaultDisplayName: "Inženýr",
            primarySkills: [CrewSkillId.Engineering, CrewSkillId.Crafting_Fabrication],
            shipStation_Associated: "engine_room",
            descriptionKey: "crew.role.engineer.desc",
            defaultDescription: "Stará se o údržbu a opravy lodi. Zkušení inženýři zvyšují výkon motorů a umožňují rychlejší a efektivnější opravy.",
            iconUrl: "assets/images/icons/crew/role_engineer.png"
        },
        {
            roleId: "science_officer",
            displayNameKey: "crew.role.science",
            defaultDisplayName: "Vědecký důstojník",
            primarySkills: [CrewSkillId.Science_Scanning],
            shipStation_Associated: "science_lab",
            descriptionKey: "crew.role.science.desc",
            defaultDescription: "Provádí skenování a analýzu. Zkušení vědečtí důstojníci zlepšují dosah a přesnost senzorů a umožňují získat více informací z průzkumu.",
            iconUrl: "assets/images/icons/crew/role_science.png"
        },
        {
            roleId: "medic",
            displayNameKey: "crew.role.medic",
            defaultDisplayName: "Lékař",
            primarySkills: [CrewSkillId.Medical],
            shipStation_Associated: "med_bay",
            descriptionKey: "crew.role.medic.desc",
            defaultDescription: "Stará se o zdraví posádky. Zkušení lékaři rychleji léčí zranění a nemoci a mohou předcházet zdravotním problémům.",
            iconUrl: "assets/images/icons/crew/role_medic.png"
        },
        {
            roleId: "comms_officer",
            displayNameKey: "crew.role.comms",
            defaultDisplayName: "Komunikační důstojník",
            primarySkills: [CrewSkillId.Communications_Diplomacy],
            shipStation_Associated: "comms_center",
            descriptionKey: "crew.role.comms.desc",
            defaultDescription: "Odpovídá za komunikaci s jinými loděmi a frakcemi. Zkušení komunikační důstojníci mohou zlepšit diplomatické vztahy a obchodní podmínky.",
            iconUrl: "assets/images/icons/crew/role_comms.png"
        },
        {
            roleId: "security_officer",
            displayNameKey: "crew.role.security",
            defaultDisplayName: "Bezpečnostní důstojník",
            primarySkills: [CrewSkillId.Security_Combat],
            shipStation_Associated: "security_deck",
            descriptionKey: "crew.role.security.desc",
            defaultDescription: "Zajišťuje bezpečnost lodi a je expert na boj zblízka. Zkušení bezpečnostní důstojníci zlepšují obranu proti nepřátelům na palubě a během pozemních misí.",
            iconUrl: "assets/images/icons/crew/role_security.png"
        },
        {
            roleId: "mining_specialist",
            displayNameKey: "crew.role.mining",
            defaultDisplayName: "Těžební specialista",
            primarySkills: [CrewSkillId.Mining_Operations],
            shipStation_Associated: "mining_bay",
            descriptionKey: "crew.role.mining.desc",
            defaultDescription: "Expert na těžbu surovin. Zkušení těžební specialisté zvyšují efektivitu těžby a snižují poškození těžebních zařízení.",
            iconUrl: "assets/images/icons/crew/role_mining.png"
        }
    ],
    
    recruitmentLocations: [
        {
            locationType: 'SpaceStation_Bar',
            candidatePool_SizeRange: [2, 4],
            candidateQuality_FactorRange: [0.6, 0.9],
            refreshTimer_GameDays: 5
        },
        {
            locationType: 'SpaceStation_RecruitmentAgency',
            candidatePool_SizeRange: [4, 8],
            candidateQuality_FactorRange: [0.7, 1.0],
            refreshTimer_GameDays: 3
        }
    ],
    
    crewMorale_System: {
        baseMorale_Default: 70,
        factors_Positive: [
            { eventKey: "SuccessfulMission", moraleChange: 5, description: "Úspěšná mise" },
            { eventKey: "HighPay", moraleChange: 10, description: "Zvýšení platu" },
            { eventKey: "GoodFood", moraleChange: 3, description: "Kvalitní jídlo" },
            { eventKey: "Rest", moraleChange: 5, description: "Odpočinek" },
            { eventKey: "Promotion", moraleChange: 8, description: "Povýšení" }
        ],
        factors_Negative: [
            { eventKey: "FailedMission", moraleChange: -5, description: "Neúspěšná mise" },
            { eventKey: "LowPay", moraleChange: -8, description: "Nízký plat" },
            { eventKey: "ShipDamaged", moraleChange: -5, description: "Poškození lodi" },
            { eventKey: "CrewConflict", moraleChange: -3, description: "Konflikt s posádkou" },
            { eventKey: "PlayerCruelty", moraleChange: -10, description: "Špatné zacházení" }
        ],
        lowMoraleThreshold_Warning: 40,
        lowMoraleThreshold_NegativeEvents: 20,
        mutiny_Mechanics: {
            triggerMoraleLevel: 10,
            chancePerCycle_AtLowMorale: 0.02,
            outcomePossibilities: [
                "AttemptToTakeOverShip", 
                "DemandHigherPay", 
                "SabotageSystems", 
                "DesertAtNextStation"
            ]
        }
    },
    
    crewNeeds_System: {
        supplies_FoodWaterAir_ConsumptionPerCrewPerDay: 1,
        supplies_ItemId_Generic: "ITEM_CREW_SUPPLIES",
        lowSupplies_MoralePenalty: -5,
        rest_RequiredAfter_LongDurationMission_Hours: 48,
        fatigue_PerformancePenaltyFactor: 0.2
    },
    
    crewLevelUp_System: {
        xpGain_Events: [
            { eventKey: "CombatVictory", xpAmount: 20, skillAppliedTo: CrewSkillId.Gunnery },
            { eventKey: "AnomalyScanned", xpAmount: 15, skillAppliedTo: CrewSkillId.Science_Scanning },
            { eventKey: "QuestCompleted", xpAmount: 30, skillAppliedTo: 'AllActive' },
            { eventKey: "ShipRepaired", xpAmount: 15, skillAppliedTo: CrewSkillId.Engineering },
            { eventKey: "DiplomaticSuccess", xpAmount: 20, skillAppliedTo: CrewSkillId.Communications_Diplomacy },
            { eventKey: "CrewHealed", xpAmount: 10, skillAppliedTo: CrewSkillId.Medical }
        ],
        skillPoints_PerLevelUp: 1,
        newTrait_OnLevelUp_Chance: 0.1
    },
    
    crewInteractions_And_Events: {
        conflictChance_BasedOnTraits_And_Morale: 0.03,
        conflictResolution_PlayerChoice: true,
        personalQuest_TriggerConditions: [
            "HighLoyalty", 
            "SpecificLocationVisited", 
            "PlayerDialogueChoice"
        ]
    }
};

// Sample predefined crew members for initial game or quest rewards
export const uniqueCrewMembers = [
    {
        crewMemberId: "crew_unique_jax_ryker",
        name: "Jax 'Wrench' Ryker",
        callsign: "Wrench",
        raceId: "Human_TerranDescendants",
        portraitUrl: "assets/images/factions/portraits/player_crew/jax_ryker_mechanic.png",
        age: 35,
        genderOrEquivalent: "male",
        backgroundStory_Key: "crew.jax_ryker.story", 
        defaultBackgroundStory: "Bývalý lodní mechanik z nákladní lodi, který viděl až příliš mnoho poruch uprostřed ničeho. Má zlaté ruce, ale je trochu cynický.",
        skills: [
            { 
                skillId: CrewSkillId.Engineering, 
                level: 3, 
                experiencePoints: 120, 
                xpToNextLevel: 300,
                descriptionKey_Template: "skill.engineering.level{level}.desc",
                defaultDescription_Template: "Úroveň {level}: Zvyšuje rychlost oprav o {10*level}% a efektivitu motorů o {5*level}%."
            },
            { 
                skillId: CrewSkillId.Mining_Operations, 
                level: 1, 
                experiencePoints: 0, 
                xpToNextLevel: 100,
                descriptionKey_Template: "skill.mining.level{level}.desc",
                defaultDescription_Template: "Úroveň {level}: Zvyšuje výtěžnost těžby o {8*level}% a snižuje poškození těžebního laseru o {4*level}%."
            }
        ],
        personalityTraits: [
            CrewPersonalityTrait.Skilled_Mechanic_Natural, 
            CrewPersonalityTrait.Pessimist, 
            CrewPersonalityTrait.Loyal
        ],
        currentMorale: 70,
        moraleTrend: "Stable" as const,
        loyaltyToPlayer: 60,
        salary_CreditsPerCycle: 150,
        personalQuest_ChainId: "quest_jax_ryker_find_rare_tools"
    },
    {
        crewMemberId: "crew_unique_dr_elena_valenti",
        name: "Dr. Elena Valenti",
        raceId: "Human_TerranDescendants",
        portraitUrl: "assets/images/factions/portraits/player_crew/elena_valenti_scientist.png",
        age: 42,
        genderOrEquivalent: "female",
        backgroundStory_Key: "crew.elena_valenti.story", 
        defaultBackgroundStory: "Renomovaná xenobioložka, která opustila akademickou kariéru kvůli omezeným možnostem výzkumu. Hledá nové formy života a je ochotná riskovat pro vědecký průlom.",
        skills: [
            { 
                skillId: CrewSkillId.Science_Scanning, 
                level: 4, 
                experiencePoints: 220, 
                xpToNextLevel: 400,
                descriptionKey_Template: "skill.science.level{level}.desc",
                defaultDescription_Template: "Úroveň {level}: Zvyšuje dosah senzorů o {8*level}% a přesnost skenování o {10*level}%."
            },
            { 
                skillId: CrewSkillId.Medical, 
                level: 2, 
                experiencePoints: 50, 
                xpToNextLevel: 200,
                descriptionKey_Template: "skill.medical.level{level}.desc",
                defaultDescription_Template: "Úroveň {level}: Urychluje léčení zranění o {15*level}% a umožňuje léčit vážnější zranění."
            }
        ],
        personalityTraits: [
            CrewPersonalityTrait.Brave, 
            CrewPersonalityTrait.Tech_Savvy,
            CrewPersonalityTrait.Hot_Headed
        ],
        currentMorale: 75,
        moraleTrend: "Improving" as const,
        loyaltyToPlayer: 50,
        salary_CreditsPerCycle: 200,
        personalQuest_ChainId: "quest_elena_valenti_rare_specimen"
    }
];

// Templates for generating random crew members
export const crewGenerationTemplates = {
    skillDistribution_Templates_ByRole: {
        "pilot": [
            { skillId: CrewSkillId.Piloting, levelRange: [2, 4] },
            { skillId: CrewSkillId.Gunnery, levelRange: [1, 2] }
        ],
        "gunner": [
            { skillId: CrewSkillId.Gunnery, levelRange: [2, 4] },
            { skillId: CrewSkillId.Security_Combat, levelRange: [1, 2] }
        ],
        "engineer": [
            { skillId: CrewSkillId.Engineering, levelRange: [2, 4] },
            { skillId: CrewSkillId.Crafting_Fabrication, levelRange: [1, 3] }
        ],
        "science_officer": [
            { skillId: CrewSkillId.Science_Scanning, levelRange: [2, 4] },
            { skillId: CrewSkillId.Medical, levelRange: [0, 2] }
        ],
        "medic": [
            { skillId: CrewSkillId.Medical, levelRange: [2, 4] },
            { skillId: CrewSkillId.Science_Scanning, levelRange: [0, 2] }
        ],
        "comms_officer": [
            { skillId: CrewSkillId.Communications_Diplomacy, levelRange: [2, 4] },
            { skillId: CrewSkillId.Piloting, levelRange: [0, 1] }
        ],
        "security_officer": [
            { skillId: CrewSkillId.Security_Combat, levelRange: [2, 4] },
            { skillId: CrewSkillId.Gunnery, levelRange: [1, 2] }
        ],
        "mining_specialist": [
            { skillId: CrewSkillId.Mining_Operations, levelRange: [2, 4] },
            { skillId: CrewSkillId.Engineering, levelRange: [0, 2] }
        ]
    },
    traitPool_Common: [
        CrewPersonalityTrait.Optimist,
        CrewPersonalityTrait.Pessimist,
        CrewPersonalityTrait.Calm_Under_Pressure,
        CrewPersonalityTrait.Brave,
        CrewPersonalityTrait.Cowardly
    ],
    traitPool_Rare: [
        CrewPersonalityTrait.Hot_Headed,
        CrewPersonalityTrait.Kleptomaniac,
        CrewPersonalityTrait.Xenophobe_Crew,
        CrewPersonalityTrait.Tech_Savvy,
        CrewPersonalityTrait.Skilled_Mechanic_Natural,
        CrewPersonalityTrait.Loyal,
        CrewPersonalityTrait.Greedy
    ],
    nameGenerators: {
        "Human_TerranDescendants": {
            male: [
                "James", "John", "Robert", "Michael", "William", "David", "Richard", "Joseph", "Thomas", "Charles",
                "Aleksandr", "Wei", "Hiroshi", "Raj", "Omar", "Pavel", "Matteo", "Diego", "Sven", "Liam"
            ],
            female: [
                "Mary", "Patricia", "Jennifer", "Linda", "Elizabeth", "Barbara", "Susan", "Jessica", "Sarah", "Karen",
                "Natasha", "Mei", "Yuki", "Priya", "Fatima", "Olga", "Sofia", "Isabella", "Ingrid", "Emily"
            ],
            surnames: [
                "Smith", "Johnson", "Williams", "Jones", "Brown", "Davis", "Miller", "Wilson", "Moore", "Taylor",
                "Ivanov", "Zhang", "Tanaka", "Patel", "Ahmed", "Petrov", "Rossi", "Garcia", "Andersson", "O'Neill"
            ]
        },
        // Add more races as needed with their own name patterns
    }
};
