
import { NexusFragmentData, NexusFragmentId } from '../types/nexus';

export const nexusFragments: NexusFragmentData[] = [
  {
    fragmentId: NexusFragmentId.Fragment_Alpha_Mind,
    fragmentNameKey: "fragment.alpha.name",
    defaultFragmentName: "Fragment Nexusu Alpha: Mysl",
    iconAsset: "/assets/images/items/nexus_fragments/fragment_alpha_mind_icon.png",
    visualDescription_InWorld_Key: "fragment.alpha.visual",
    defaultVisualDescription_InWorld: "Pulzující křišťál se složitou, neustále se měnící vnitřní strukturou, která připomíná neurální síť. Při pohledu do něj cítíte jemné chvění ve své vlastní mysli.",
    associatedNexusAbility: {
      abilityId: "nexus_ability_psionic_blast",
      abilityNameKey: "ability.nexus.psionic_blast.name",
      defaultAbilityName: "Psionický Výboj",
      descriptionKey: "ability.nexus.psionic_blast.desc",
      defaultDescription: "Vypustí vlnu mentální energie, která dočasně ochromí systémy nepřátelské lodi.",
      visualEffect_AssetPath: "/assets/images/fx/nexus_abilities/psionic_blast_effect.png",
      soundEffect_OnUse: "sfx/nexus/abilities/psionic_blast_release.wav",
      gameplayEffect_Description: "Ochromí cíl na 5 sekund.",
      cooldown_Seconds: 60,
      energy_Cost: 35
    },
    lore_CodexEntryId: "codex.nexus.fragment_alpha",
    discoveryMission_Id: "nexus_quest_01_investigate_signal"
  },
  {
    fragmentId: NexusFragmentId.Fragment_Beta_Matter,
    fragmentNameKey: "fragment.beta.name",
    defaultFragmentName: "Fragment Nexusu Beta: Hmota",
    iconAsset: "/assets/images/items/nexus_fragments/fragment_beta_matter_icon.png",
    visualDescription_InWorld_Key: "fragment.beta.visual",
    defaultVisualDescription_InWorld: "Těžký, tmavý kámen s jemně špičatým povrchem, který se zdánlivě samovolně přeskupuje. Materiál neodpovídá žádnému známému prvku a zdá se, že občas ignoruje zákony fyziky.",
    associatedNexusAbility: {
      abilityId: "nexus_ability_matter_conversion",
      abilityNameKey: "ability.nexus.matter_conversion.name",
      defaultAbilityName: "Transmutace Hmoty",
      descriptionKey: "ability.nexus.matter_conversion.desc",
      defaultDescription: "Přemění část odpadního materiálu ve vybrané běžné suroviny.",
      visualEffect_AssetPath: "/assets/images/fx/nexus_abilities/matter_conversion_effect.png",
      soundEffect_OnUse: "sfx/nexus/abilities/matter_conversion_process.wav",
      gameplayEffect_Description: "Vytvoří 1-3 jednotky běžné suroviny z odpadu.",
      cooldown_Seconds: 300,
      energy_Cost: 50
    },
    lore_CodexEntryId: "codex.nexus.fragment_beta",
    discoveryMission_Id: "nexus_quest_03_ancient_ruins_alpha"
  },
  {
    fragmentId: NexusFragmentId.Fragment_Gamma_Energy,
    fragmentNameKey: "fragment.gamma.name",
    defaultFragmentName: "Fragment Nexusu Gamma: Energie",
    iconAsset: "/assets/images/items/nexus_fragments/fragment_gamma_energy_icon.png",
    visualDescription_InWorld_Key: "fragment.gamma.visual",
    defaultVisualDescription_InWorld: "Zářící krystal s nepřetržitými výboji energie uvnitř i vně. Zdá se, že generuje vlastní energetické pole, které interaguje s vaším lodním systémem.",
    associatedNexusAbility: {
      abilityId: "nexus_ability_energy_overcharge",
      abilityNameKey: "ability.nexus.energy_overcharge.name",
      defaultAbilityName: "Energetické Přetížení",
      descriptionKey: "ability.nexus.energy_overcharge.desc",
      defaultDescription: "Dočasně masivně zvýší výkon zbraní a štítů za cenu poškození vlastních systémů.",
      visualEffect_AssetPath: "/assets/images/fx/nexus_abilities/energy_overcharge_effect.png",
      soundEffect_OnUse: "sfx/nexus/abilities/energy_overcharge_activation.wav",
      gameplayEffect_Description: "+50% poškození zbraní, +75% síla štítů na 15 sekund, poté krátkodobý výpadek energie.",
      cooldown_Seconds: 180,
      energy_Cost: 65
    },
    lore_CodexEntryId: "codex.nexus.fragment_gamma",
    discoveryMission_Id: "nexus_quest_04_krall_interference"
  },
  {
    fragmentId: NexusFragmentId.Fragment_Delta_Time,
    fragmentNameKey: "fragment.delta.name",
    defaultFragmentName: "Fragment Nexusu Delta: Čas",
    iconAsset: "/assets/images/items/nexus_fragments/fragment_delta_time_icon.png",
    visualDescription_InWorld_Key: "fragment.delta.visual",
    defaultVisualDescription_InWorld: "Mlhavý, průsvitný objekt s pohyblivým vnitřkem, kde se události odehrávají současně dopředu i dozadu. Čas v jeho okolí plyne nerovnoměrně.",
    associatedNexusAbility: {
      abilityId: "nexus_ability_time_dilation",
      abilityNameKey: "ability.nexus.time_dilation.name",
      defaultAbilityName: "Časová Dilatace",
      descriptionKey: "ability.nexus.time_dilation.desc",
      defaultDescription: "Vytvoří lokální bublinu s pozměněným plynutím času, zpomalující nepřátelské jednotky a projektily.",
      visualEffect_AssetPath: "/assets/images/fx/nexus_abilities/time_dilation_field.png",
      soundEffect_OnUse: "sfx/nexus/abilities/time_dilation_activate.wav",
      gameplayEffect_Description: "Zpomalí vše v okruhu 300 jednotek o 50% na 10 sekund.",
      cooldown_Seconds: 240,
      energy_Cost: 80
    },
    lore_CodexEntryId: "codex.nexus.fragment_delta",
    discoveryMission_Id: "nexus_quest_05_whispers_of_the_ancients"
  },
  {
    fragmentId: NexusFragmentId.Fragment_Epsilon_Space,
    fragmentNameKey: "fragment.epsilon.name",
    defaultFragmentName: "Fragment Nexusu Epsilon: Prostor",
    iconAsset: "/assets/images/items/nexus_fragments/fragment_epsilon_space_icon.png",
    visualDescription_InWorld_Key: "fragment.epsilon.visual",
    defaultVisualDescription_InWorld: "Objekt, který vypadá větší uvnitř než zvenku. Jeho povrch se zdá být opakovaně přeložený a pokřivený, jako by byl částečně v jiné dimenzi.",
    associatedNexusAbility: {
      abilityId: "nexus_ability_spatial_fold",
      abilityNameKey: "ability.nexus.spatial_fold.name",
      defaultAbilityName: "Prostorový Záhyb",
      descriptionKey: "ability.nexus.spatial_fold.desc",
      defaultDescription: "Vytvoří krátkodobý tunel prostorem, umožňující okamžitý přesun na krátkou vzdálenost.",
      visualEffect_AssetPath: "/assets/images/fx/nexus_abilities/spatial_fold_tunnel.png",
      soundEffect_OnUse: "sfx/nexus/abilities/spatial_fold_warp.wav",
      gameplayEffect_Description: "Teleportuje loď až o 2000 jednotek v libovolném směru.",
      cooldown_Seconds: 120,
      energy_Cost: 60
    },
    lore_CodexEntryId: "codex.nexus.fragment_epsilon",
    discoveryMission_Id: "nexus_quest_06_guardians_warning"
  },
  {
    fragmentId: NexusFragmentId.Fragment_Zeta_Life,
    fragmentNameKey: "fragment.zeta.name",
    defaultFragmentName: "Fragment Nexusu Zeta: Život",
    iconAsset: "/assets/images/items/nexus_fragments/fragment_zeta_life_icon.png",
    visualDescription_InWorld_Key: "fragment.zeta.visual",
    defaultVisualDescription_InWorld: "Pulzující, organicky vyhlížející objekt s žilkami, který jako by dýchal. Poškozené části se rychle regenerují a občas na jeho povrchu vznikají a zanikají mikroskopické bioformy.",
    associatedNexusAbility: {
      abilityId: "nexus_ability_regenerative_matrix",
      abilityNameKey: "ability.nexus.regenerative_matrix.name",
      defaultAbilityName: "Regenerační Matrix",
      descriptionKey: "ability.nexus.regenerative_matrix.desc",
      defaultDescription: "Aktivuje organické samoopravu lodního trupu a regeneraci posádky.",
      visualEffect_AssetPath: "/assets/images/fx/nexus_abilities/regeneration_field.png",
      soundEffect_OnUse: "sfx/nexus/abilities/regeneration_activate.wav",
      gameplayEffect_Description: "Obnoví 5% poškození lodi každou sekundu po dobu 10 sekund a zrychlí léčení zraněných členů posádky.",
      cooldown_Seconds: 200,
      energy_Cost: 55
    },
    lore_CodexEntryId: "codex.nexus.fragment_zeta",
    discoveryMission_Id: "nexus_quest_07_living_ruins"
  },
  {
    fragmentId: NexusFragmentId.Fragment_Omega_Void,
    fragmentNameKey: "fragment.omega.name",
    defaultFragmentName: "Fragment Nexusu Omega: Prázdnota",
    iconAsset: "/assets/images/items/nexus_fragments/fragment_omega_void_icon.png",
    visualDescription_InWorld_Key: "fragment.omega.visual",
    defaultVisualDescription_InWorld: "Temný, absolutně černý objekt, který jako by pohlcoval světlo i zvuk z okolí. Vyvolává silné pocity prázdnoty a neklidu. Těžké ho plně vnímat smysly.",
    associatedNexusAbility: {
      abilityId: "nexus_ability_void_rift",
      abilityNameKey: "ability.nexus.void_rift.name",
      defaultAbilityName: "Trhlina do Prázdnoty",
      descriptionKey: "ability.nexus.void_rift.desc",
      defaultDescription: "Vytvoří nestabilní průrvu do prázdnoty, která pohlcuje nepřátelské projektily a způsobuje poškození blízkým lodím.",
      visualEffect_AssetPath: "/assets/images/fx/nexus_abilities/void_rift_anomaly.png",
      soundEffect_OnUse: "sfx/nexus/abilities/void_rift_open.wav",
      gameplayEffect_Description: "Vytvoří černou díru přitahující a poškozující nepřátelské lodě a pohlcující projektily po dobu 8 sekund.",
      cooldown_Seconds: 300,
      energy_Cost: 100
    },
    lore_CodexEntryId: "codex.nexus.fragment_omega",
    discoveryMission_Id: "nexus_quest_final_prepare_for_choice"
  }
];
