import agendaCardBack from './assets/agendaCards/agenda-card-back.webp';
import antiIntellectualRevolution from './assets/agendaCards/anti-intellectual-revolution.webp';
import archivedSecret from './assets/agendaCards/archived-secret.webp';
import armedForcesStandardization from './assets/agendaCards/armed-forces-standardization.webp';
import armsReduction from './assets/agendaCards/arms-reduction.webp';
import committeeFormation from './assets/agendaCards/committee-formation.webp';
import conventionsOfWar from './assets/agendaCards/conventions-of-war.webp';
import covertLegislation from './assets/agendaCards/covert-legislation.webp';
import executiveSanctions from './assets/agendaCards/executive-sanctions.webp';
import fleetRegulations from './assets/agendaCards/fleet-regulations.webp';
import homelandDefenseAct from './assets/agendaCards/homeland-defense-act.webp';
import incentiveProgram from './assets/agendaCards/incentive-program.webp';
import ixthianArtifact from './assets/agendaCards/ixthian-artifact.webp';
import judicialAbolishment from './assets/agendaCards/judicial-abolishment.webp';
import ministerOfWar from './assets/agendaCards/minister-of-war.webp';
import miscountDisclosed from './assets/agendaCards/miscount-disclosed.webp';
import newConstitution from './assets/agendaCards/new-constitution.webp';
import prophecyOfIxth from './assets/agendaCards/prophecy-of-ixth.webp';
import regulatedConscription from './assets/agendaCards/regulated-conscription.webp';
import seedsOfAnEmpire from './assets/agendaCards/seed-of-an-empire.webp';

const agendaCards = [
    'Anti-Intellectual Revolution',
    'Archived Secret',
    'Armed Forces Standardization',
    'Arms Reduction',
    'Committee Formation',
    'Conventions of War',
    'Covert Legislation',
    'Executive Sanctions',
    'Fleet Regulations',
    'Homeland Defense Act',
    'Incentive Program',
    'Ixthian Artifact',
    'Judicial Abolishment',
    'Minister of War',
    'Miscount Disclosed',
    'New Constitution',
    'Prophecy of Ixth',
    'Regulated Conscription',
    'Seed of an Empire',
] as const;

type AgendaCard = (typeof agendaCards)[number];

const agendaCardFaces: Record<AgendaCard, string> = {
    'Anti-Intellectual Revolution': antiIntellectualRevolution,
    'Archived Secret': archivedSecret,
    'Armed Forces Standardization': armedForcesStandardization,
    'Arms Reduction': armsReduction,
    'Committee Formation': committeeFormation,
    'Conventions of War': conventionsOfWar,
    'Covert Legislation': covertLegislation,
    'Executive Sanctions': executiveSanctions,
    'Fleet Regulations': fleetRegulations,
    'Homeland Defense Act': homelandDefenseAct,
    'Incentive Program': incentiveProgram,
    'Ixthian Artifact': ixthianArtifact,
    'Judicial Abolishment': judicialAbolishment,
    'Minister of War': ministerOfWar,
    'Miscount Disclosed': miscountDisclosed,
    'New Constitution': newConstitution,
    'Prophecy of Ixth': prophecyOfIxth,
    'Regulated Conscription': regulatedConscription,
    'Seed of an Empire': seedsOfAnEmpire,
};

export { AgendaCard, agendaCardBack, agendaCardFaces, agendaCards };
