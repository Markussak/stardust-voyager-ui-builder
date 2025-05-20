
import { MissionData, MissionStatus, MissionType } from '../types/missions';

export const sampleMissions: MissionData[] = [
  {
    missionId: "nexus_01_first_signal",
    missionTitleKey: "mission.nexus_01.title",
    defaultMissionTitle: "Záhadný Signál",
    missionType: MissionType.MainStory_Nexus,
    status: MissionStatus.Active_TrackedByPlayer,
    missionGiver_DisplayNameKey: "mission.giver.unknown_source",
    defaultMissionGiver_DisplayName: "Neznámy Zdroj",
    briefingDialog_Key: "dialog.nexus_01.briefing",
    defaultBriefingDialog: "Zachytili jsme neznámý signál z systému Kepler-186f. Zdá se, že obsahuje informace o starověké technologii. Prozkoumej anomálii a zjisti, co se děje.",
    fullDescription_Lore_Key: "codex.entry.nexus_01_signal.desc",
    defaultFullDescription_Lore: "Při rutinním sledování okolní vesmíru váš palubní počítač zachytil signál nečekaného původu. Analýza ukazuje, že jde o matematicky přesnou strukturu, která nemohla vzniknout přirozenými procesy. Zpráva se zdá být pozvánkou... nebo varováním.",
    objectives: [
      {
        objectiveId: "obj1_investigate_anomaly",
        descriptionKey: "mission.nexus_01.obj1",
        defaultDescription: "Preskúmaj anomáliu v systéme Kepler-186f.",
        status: "InProgress",
        targetLocation_SystemId: "Kepler-186f",
        targetLocation_CelestialBodyId: "Kepler-186f_Anomaly_Alpha",
        showOnMap_Button_Enabled: true
      },
      {
        objectiveId: "obj2_recover_artefact",
        descriptionKey: "mission.nexus_01.obj2",
        defaultDescription: "Získaj neznámy artefakt.",
        status: "Pending",
        targetItem_Id: "artefact_nexus_fragment_00",
        isHiddenUntilPreviousCompleted: true,
        showOnMap_Button_Enabled: false
      }
    ],
    rewards_OnFinalCompletion: [
      {
        type: "ExperiencePoints_Player",
        quantity: 500,
        descriptionKey: "rewards.xp",
        defaultDescription: "500 XP",
        iconAsset: "assets/images/icons/rewards/xp_icon.png"
      },
      {
        type: "Item_Specific",
        itemId_Or_LootTableKey: "artefact_nexus_fragment_00",
        quantity: 1,
        descriptionKey: "rewards.item.nexus_fragment",
        defaultDescription: "Prvý Fragment Nexusu",
        iconAsset: "assets/images/items/icons/quest/nexus_fragment_small.png"
      },
      {
        type: "Unlock_CodexEntry",
        codexEntryId_ToUnlock: "codex.entry.nexus_introduction",
        descriptionKey: "rewards.codex",
        defaultDescription: "Nový záznam v Kódexe: Nexus",
        iconAsset: "assets/images/icons/rewards/codex_unlock_icon.png"
      }
    ],
    suggestedPlayerLevel_Or_ShipTier: 1,
    chainQuest_NextMissionId: "nexus_02_seeking_answers"
  },
  {
    missionId: "sc_01_patrol_border",
    missionTitleKey: "mission.sc_01.title",
    defaultMissionTitle: "Hraniční Hlídka",
    missionType: MissionType.FactionStory_Major,
    status: MissionStatus.Active_InProgress,
    missionGiver_NPC_Id_Or_FactionId: "solar_confederacy",
    missionGiver_DisplayNameKey: "faction.solar_confederacy.admiral",
    defaultMissionGiver_DisplayName: "Admirál Chen",
    missionGiver_PortraitAsset: "assets/images/portraits/sc_admiral_chen.png",
    briefingDialog_Key: "dialog.sc_01.briefing",
    defaultBriefingDialog: "Potřebujeme prověřit naši hraniční oblast kvůli rostoucí aktivitě Krallského Impéria. Proveďte rutinní kontrolu v těchto souřadnicích.",
    objectives: [
      {
        objectiveId: "obj1_patrol_alpha",
        descriptionKey: "mission.sc_01.obj1",
        defaultDescription: "Navštiv kontrolní bod Alpha.",
        status: "Completed",
        targetLocation_SystemId: "SC_Border_01",
        targetLocation_Coordinates: { x: 250, y: 120 },
        showOnMap_Button_Enabled: true
      },
      {
        objectiveId: "obj2_patrol_beta",
        descriptionKey: "mission.sc_01.obj2",
        defaultDescription: "Navštiv kontrolní bod Beta.",
        status: "InProgress",
        targetLocation_SystemId: "SC_Border_02",
        targetLocation_Coordinates: { x: 275, y: 150 },
        showOnMap_Button_Enabled: true
      },
      {
        objectiveId: "obj3_patrol_gamma",
        descriptionKey: "mission.sc_01.obj3",
        defaultDescription: "Navštiv kontrolní bod Gamma.",
        status: "Pending",
        targetLocation_SystemId: "SC_Border_03",
        targetLocation_Coordinates: { x: 300, y: 180 },
        showOnMap_Button_Enabled: true
      }
    ],
    rewards_OnFinalCompletion: [
      {
        type: "Credits",
        quantity: 1000,
        descriptionKey: "rewards.credits",
        defaultDescription: "1000 Kreditů",
        iconAsset: "assets/images/icons/rewards/credits_icon.png"
      },
      {
        type: "ReputationChange_Faction",
        factionId_ForReputation: "solar_confederacy",
        reputationChangeAmount: 50,
        descriptionKey: "rewards.reputation.sc",
        defaultDescription: "+50 Reputace se Solární Konfederací",
        iconAsset: "assets/images/icons/rewards/reputation_sc_icon.png"
      }
    ],
    suggestedPlayerLevel_Or_ShipTier: 2,
    timeLimit_GameDays: 3
  },
  {
    missionId: "bounty_pirate_leader",
    missionTitleKey: "mission.bounty_pirate.title",
    defaultMissionTitle: "Odstranění Pirátského Kapitána",
    missionType: MissionType.BountyHunt,
    status: MissionStatus.Available_NotAccepted,
    missionGiver_DisplayNameKey: "mission.giver.bounty_board",
    defaultMissionGiver_DisplayName: "Tabule Odměn",
    defaultBriefingDialog: "Pirátský kapitán 'Rudý Hak' terorizuje obchodní cesty v Siriu. Jeho dopadení je odměňováno Obchodním syndikátem.",
    objectives: [
      {
        objectiveId: "obj1_find_pirate",
        descriptionKey: "mission.bounty_pirate.obj1",
        defaultDescription: "Najdi a poraz pirátského kapitána v systému Sirius.",
        status: "Pending",
        targetLocation_SystemId: "Sirius",
        targetNPC_Id: "pirate_captain_red_hak",
        showOnMap_Button_Enabled: true
      },
      {
        objectiveId: "obj2_collect_proof",
        descriptionKey: "mission.bounty_pirate.obj2",
        defaultDescription: "Získej důkaz o odstranění (pirátská vlaječka).",
        status: "Pending",
        targetItem_Id: "pirate_red_flag",
        isHiddenUntilPreviousCompleted: true,
        showOnMap_Button_Enabled: false
      },
      {
        objectiveId: "obj3_return_for_reward",
        descriptionKey: "mission.bounty_pirate.obj3",
        defaultDescription: "Vrať se pro odměnu na stanici Alpha Prime.",
        status: "Pending",
        targetLocation_SystemId: "Alpha_Centauri",
        targetLocation_CelestialBodyId: "Alpha_Prime_Station",
        isHiddenUntilPreviousCompleted: true,
        showOnMap_Button_Enabled: true
      }
    ],
    rewards_OnFinalCompletion: [
      {
        type: "Credits",
        quantity: 5000,
        descriptionKey: "rewards.credits",
        defaultDescription: "5000 Kreditů",
        iconAsset: "assets/images/icons/rewards/credits_icon.png"
      },
      {
        type: "Item_Specific",
        itemId_Or_LootTableKey: "weapon_ion_disruptor_mk2",
        quantity: 1,
        descriptionKey: "rewards.item.weapon",
        defaultDescription: "Iontový Rozrušovač Mk2",
        iconAsset: "assets/images/items/icons/weapon_ion_disruptor.png"
      }
    ],
    suggestedPlayerLevel_Or_ShipTier: 3
  },
  {
    missionId: "explore_nebula_01",
    missionTitleKey: "mission.explore_nebula.title",
    defaultMissionTitle: "Tajemství Mlhoviny",
    missionType: MissionType.Exploration_Survey,
    status: MissionStatus.Completed_Success,
    defaultFullDescription_Lore: "Mlhovina Orel skrývá neobvyklé energetické signatury, které by mohly být způsobeny novými přírodními fenomény nebo dokonce pozůstatky prastaré civilizace.",
    objectives: [
      {
        objectiveId: "obj1_scan_nebula",
        descriptionKey: "mission.explore_nebula.obj1",
        defaultDescription: "Prozkoumej vnější okraje mlhoviny Orel.",
        status: "Completed",
        targetLocation_SystemId: "Eagle_Nebula_Outer",
        showOnMap_Button_Enabled: false
      },
      {
        objectiveId: "obj2_collect_samples",
        descriptionKey: "mission.explore_nebula.obj2",
        defaultDescription: "Seber vzorky plynů z mlhoviny (0/3).",
        status: "Completed",
        targetItem_Id: "nebula_gas_sample",
        quantityRequired: 3,
        quantityCurrent: 3,
        showOnMap_Button_Enabled: false
      },
      {
        objectiveId: "obj3_find_artifact",
        descriptionKey: "mission.explore_nebula.obj3",
        defaultDescription: "Lokalizuj zdroj energetické anomálie.",
        status: "Completed",
        isOptional: true,
        targetLocation_SystemId: "Eagle_Nebula_Core",
        targetLocation_Coordinates: { x: 450, y: 320 },
        showOnMap_Button_Enabled: false
      }
    ],
    rewards_OnFinalCompletion: [
      {
        type: "ResearchPoints_SpecificType",
        researchPointType: "RP_Xenobiology",
        quantity: 100,
        descriptionKey: "rewards.rp.xenobiology",
        defaultDescription: "100 Výzkumných Bodů (Xenobiologie)",
        iconAsset: "assets/images/icons/rewards/research_xeno_icon.png"
      },
      {
        type: "Unlock_CodexEntry",
        codexEntryId_ToUnlock: "codex.entry.eagle_nebula",
        descriptionKey: "rewards.codex",
        defaultDescription: "Nový záznam v Kodexu: Mlhovina Orel",
        iconAsset: "assets/images/icons/rewards/codex_unlock_icon.png"
      }
    ]
  }
];
