import agendaCardBack from './assets/agendaCards/agenda-card-back.webp';
import antiIntellectualRevolution from './assets/agendaCards/anti-intellectual-revolution.webp';
import archivedSecret from './assets/agendaCards/archived-secret.webp';
import armedForcesStandardization from './assets/agendaCards/armed-forces-standardization.webp';
import armsReduction from './assets/agendaCards/arms-reduction.webp';
import articlesOfWar from './assets/agendaCards/articles-of-war.webp';
import checksAndBalances from './assets/agendaCards/checks-and-balances.webp';
import clandestineOperations from './assets/agendaCards/clandestine-operations.webp';
import classifiedDocumentLeaks from './assets/agendaCards/classified-document-leaks.webp';
import colonialRedistribution from './assets/agendaCards/colonial-redistribution.webp';
import committeeFormation from './assets/agendaCards/committee-formation.webp';
import compensatedDisarmament from './assets/agendaCards/compensated-disarmament.webp';
import conventionsOfWar from './assets/agendaCards/conventions-of-war.webp';
import covertLegislation from './assets/agendaCards/covert-legislation.webp';
import economicEquality from './assets/agendaCards/economic-equality.webp';
import enforcedTravelBan from './assets/agendaCards/enforced-travel-ban.webp';
import executiveSanctions from './assets/agendaCards/executive-sanctions.webp';
import fleetRegulations from './assets/agendaCards/fleet-regulations.webp';
import galacticCrisisPact from './assets/agendaCards/galactic-crisis-pact.webp';
import homelandDefenseAct from './assets/agendaCards/homeland-defense-act.webp';
import imperialArbiter from './assets/agendaCards/imperial-arbiter.webp';
import incentiveProgram from './assets/agendaCards/incentive-program.webp';
import ixthianArtifact from './assets/agendaCards/ixthian-artifact.webp';
import judicialAbolishment from './assets/agendaCards/judicial-abolishment.webp';
import ministerOfAntiquities from './assets/agendaCards/minister-of-antiquities.webp';
import ministerOfCommerce from './assets/agendaCards/minister-of-commerce.webp';
import ministerOfExploration from './assets/agendaCards/minister-of-exploration.webp';
import ministerOfIndustry from './assets/agendaCards/minister-of-industry.webp';
import ministerOfPeace from './assets/agendaCards/minister-of-peace.webp';
import ministerOfPolicy from './assets/agendaCards/minister-of-policy.webp';
import ministerOfSciences from './assets/agendaCards/minister-of-sciences.webp';
import ministerOfWar from './assets/agendaCards/minister-of-war.webp';
import miscountDisclosed from './assets/agendaCards/miscount-disclosed.webp';
import mutiny from './assets/agendaCards/mutiny.webp';
import newConstitution from './assets/agendaCards/new-constitution.webp';
import nexusSovereignty from './assets/agendaCards/nexus-sovereignty.webp';
import politicalCensure from './assets/agendaCards/political-censure.webp';
import prophecyOfIxth from './assets/agendaCards/prophecy-of-ixth.webp';
import publicExecution from './assets/agendaCards/public-execution.webp';
import publicizeWeaponSchematics from './assets/agendaCards/publicize-weapon-schematics.webp';
import rearmamentAgreement from './assets/agendaCards/rearmament-agreement.webp';
import regulatedConscription from './assets/agendaCards/regulated-conscription.webp';
import representativeGovernment from './assets/agendaCards/representative-government.webp';
import researchGrantReallocation from './assets/agendaCards/research-grant-reallocation.webp';
import searchWarrant from './assets/agendaCards/search-warrant.webp';
import seedsOfAnEmpire from './assets/agendaCards/seed-of-an-empire.webp';
import sharedResearch from './assets/agendaCards/shared-research.webp';
import swordsToPlowshares from './assets/agendaCards/swords-to-plowshares.webp';
import unconventionalMeasures from './assets/agendaCards/unconventional-measures.webp';
import wormholeReconstruction from './assets/agendaCards/wormhole-reconstruction.webp';
import wormholeResearch from './assets/agendaCards/wormhole-research.webp';

const agendaCards = [
    'Anti-Intellectual Revolution',
    'Archived Secret',
    'Armed Forces Standardization',
    'Arms Reduction',
    'Articles of War',
    'Checks and Balances',
    'Clandestine Operations',
    'Classified Document Leaks',
    'Colonial Redistribution',
    'Committee Formation',
    'Compensated Disarmament',
    'Conventions of War',
    'Covert Legislation',
    'Economic Equality',
    'Enforced Travel Ban',
    'Executive Sanctions',
    'Fleet Regulations',
    'Galactic Crisis Pact',
    'Homeland Defense Act',
    'Imperial Arbiter',
    'Incentive Program',
    'Ixthian Artifact',
    'Judicial Abolishment',
    'Minister of Antiquities',
    'Minister of Commerce',
    'Minister of Exploration',
    'Minister of Industry',
    'Minister of Peace',
    'Minister of Policy',
    'Minister of Sciences',
    'Minister of War',
    'Miscount Disclosed',
    'Mutiny',
    'New Constitution',
    'Nexus Sovereignty',
    'Political Censure',
    'Prophecy of Ixth',
    'Public Execution',
    'Publicize Weapon Schematics',
    'Rearmament Agreement',
    'Regulated Conscription',
    'Representative Government',
    'Research Grant Reallocation',
    'Search Warrant',
    'Seed of an Empire',
    'Shared Research',
    'Swords to Plowshares',
    'Unconventional Measures',
    'Wormhole Reconstruction',
    'Wormhole Research',
] as const;

type AgendaCard = (typeof agendaCards)[number];

const agendaCardFaces: Record<AgendaCard, string> = {
    'Anti-Intellectual Revolution': antiIntellectualRevolution,
    'Archived Secret': archivedSecret,
    'Armed Forces Standardization': armedForcesStandardization,
    'Arms Reduction': armsReduction,
    'Articles of War': articlesOfWar,
    'Checks and Balances': checksAndBalances,
    'Clandestine Operations': clandestineOperations,
    'Classified Document Leaks': classifiedDocumentLeaks,
    'Colonial Redistribution': colonialRedistribution,
    'Committee Formation': committeeFormation,
    'Compensated Disarmament': compensatedDisarmament,
    'Conventions of War': conventionsOfWar,
    'Covert Legislation': covertLegislation,
    'Economic Equality': economicEquality,
    'Enforced Travel Ban': enforcedTravelBan,
    'Executive Sanctions': executiveSanctions,
    'Fleet Regulations': fleetRegulations,
    'Galactic Crisis Pact': galacticCrisisPact,
    'Homeland Defense Act': homelandDefenseAct,
    'Imperial Arbiter': imperialArbiter,
    'Incentive Program': incentiveProgram,
    'Ixthian Artifact': ixthianArtifact,
    'Judicial Abolishment': judicialAbolishment,
    'Minister of Antiquities': ministerOfAntiquities,
    'Minister of Commerce': ministerOfCommerce,
    'Minister of Exploration': ministerOfExploration,
    'Minister of Industry': ministerOfIndustry,
    'Minister of Peace': ministerOfPeace,
    'Minister of Policy': ministerOfPolicy,
    'Minister of Sciences': ministerOfSciences,
    'Minister of War': ministerOfWar,
    'Miscount Disclosed': miscountDisclosed,
    Mutiny: mutiny,
    'New Constitution': newConstitution,
    'Nexus Sovereignty': nexusSovereignty,
    'Political Censure': politicalCensure,
    'Prophecy of Ixth': prophecyOfIxth,
    'Public Execution': publicExecution,
    'Publicize Weapon Schematics': publicizeWeaponSchematics,
    'Rearmament Agreement': rearmamentAgreement,
    'Regulated Conscription': regulatedConscription,
    'Representative Government': representativeGovernment,
    'Research Grant Reallocation': researchGrantReallocation,
    'Search Warrant': searchWarrant,
    'Seed of an Empire': seedsOfAnEmpire,
    'Shared Research': sharedResearch,
    'Swords to Plowshares': swordsToPlowshares,
    'Unconventional Measures': unconventionalMeasures,
    'Wormhole Reconstruction': wormholeReconstruction,
    'Wormhole Research': wormholeResearch,
};

export { AgendaCard, agendaCardBack, agendaCardFaces, agendaCards };
