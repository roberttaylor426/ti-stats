import _ from 'underscore';

import bentor from './assets/factionSheets/bentor.webp';
import cabal from './assets/factionSheets/cabal.webp';
import dihmon from './assets/factionSheets/dih.webp';
import ghoti from './assets/factionSheets/ghoti.webp';
import glimmer from './assets/factionSheets/glimmer.webp';
import berserkers from './assets/factionSheets/kjal.webp';
import l1z1x from './assets/factionSheets/l1z1x.webp';
import rohdna from './assets/factionSheets/rohdna.webp';
import tnelis from './assets/factionSheets/tnelis.webp';
import { PlanetName } from './planets';
import {
    arborecSystemTile,
    argentFlightSystemTile,
    augursOfIllyxumSystemTile,
    baronyOfLetnevSystemTile,
    bentorConglomerateSystemTile,
    berserkersOfKjalengardSystemTile,
    celdauriTradeConfederationSystemTile,
    cheiranHordesSystemTile,
    clanOfSaarSystemTile,
    dihMohnFlotillaSystemTile,
    edynMandateSystemTile,
    embersOfMuattSystemTile,
    emiratesOfHacanSystemTile,
    empyreanSystemTile,
    federationOfSolSystemTile,
    florzenProfiteersSystemTile,
    freeSystemsCompactSystemTile,
    gheminaRaidersSystemTile,
    ghostsOfCreussSystemTile,
    ghotiWayferersSystemTile,
    gledgeUnionSystemTile,
    glimmerOfMortheusSystemTile,
    isSystemWithPlanetsTile,
    kolleccSocietySystemTile,
    kortaliTribunalSystemTile,
    kyroSodalitySystemTile,
    l1z1xMindnetSystemTile,
    lanefirRemnantsSystemTile,
    liZhoDynastySystemTile,
    ltokkKhraskSystemTile,
    mahactGeneSorcerorsSystemTile,
    mentakCoalitionSystemTile,
    mirvedaProtectorateSystemTile,
    monksOfKolumeSystemTile,
    mykoMentoriSystemTile,
    naaluCollectiveSystemTile,
    naazRohkaAllianceSystemTile,
    nekroVirusSystemTile,
    nivynStarOfKingsSystemTile,
    nokarSellshipsSystemTile,
    nomadSystemTile,
    olradinLeagueSystemTile,
    rohDhnaMechatronicsSystemTile,
    saardakkNorrSystemTile,
    savagesOfCymiaeSystemTile,
    shipwrightsOfArkSystemTile,
    SystemTile,
    SystemTileNumber,
    titansOfUlSystemTile,
    tnelisSyndicateSystemTile,
    universitiesOfJolNarSystemTile,
    vadenBankingClansSystemTile,
    vaylerianScourgeSystemTile,
    veldyrSovereigntySystemTile,
    vuilraithCabalSystemTile,
    winnuSystemTile,
    xxchaKingdomSystemTile,
    yinBrotherhoodSystemTile,
    yssarilTribesSystemTile,
    zealotsOfRhodunSystemTile,
    zelianPurifierSystemTile,
} from './systemTiles';
import {
    aiDevelopmentAlgorithm,
    antimassDeflectors,
    bioStims,
    darkEnergyTap,
    daxciveAnimators,
    gravitonLaserSystem,
    gravityDrive,
    magenDefenseGrid,
    neuralMotivator,
    plasmaScoring,
    predictiveIntelligence,
    psychoArchaeology,
    sarweenTools,
    scanlinkDroneNetwork,
    selfAssemblyRoutines,
    slingRelay,
    Technology,
} from './technologies';

const factionsWithFixedHomeworlds = [
    'Sardakk N’orr',
    'The Arborec',
    'The Argent Flight',
    'The Barony of Letnev',
    'The Clan of Saar',
    'The Embers of Muaat',
    'The Emirates of Hacan',
    'The Empyrean',
    'The Federation of Sol',
    'The Ghosts of Creuss',
    'The L1Z1X Mindnet',
    'The Mahact Gene-Sorcerers',
    'The Mentak Coalition',
    'The Naalu Collective',
    'The Naaz-Rokha Alliance',
    'The Nekro Virus',
    'The Nomad',
    'The Titans of Ul',
    'The Universities of Jol-Nar',
    "The Vuil'Raith Cabal",
    'The Winnu',
    'The Xxcha Kingdom',
    'The Yin Brotherhood',
    'The Yssaril Tribes',
    'The Shipwrights of Ark',
    'The Celdauri Trade Confederation',
    'The Savages of Cymiae',
    'The Dih-Mohn Flotilla',
    'The Florzen Profiteers',
    'The Free Systems Compact',
    'The Ghemina Raiders',
    'The Augurs of Illyxum',
    'The Kollecc Society',
    'The Kortali Tribunal',
    'The Li-Zho Dynasty',
    "The L'tokk Khrask",
    'The Mirveda Protectorate',
    'The Glimmer of Mortheus',
    'The Myko-Mentori',
    'The Nivyn Star of Kings',
    'The Olradin League',
    'The Zealots of Rhodun',
    "Roh'Dhna Mechatronics",
    'The Tnelis Syndicate',
    'The Vaden Banking Clans',
    'The Vaylerian Scourge',
    'The Veldyr Sovereignty',
    'The Zelian Purifier',
    'The Bentor Conglomerate',
    'The Cheiran Hordes',
    'The Edyn Mandate',
    'The Ghoti Wayfarers',
    'The GLEdge Union',
    'The Berserkers of Kjalengard',
    'The Monks of Kolume',
    'The Kyro Sodality',
    'The Lanefir Remnants',
    'The Nokar Sellships',
] as const;

type FactionWithFixedHomeworlds = (typeof factionsWithFixedHomeworlds)[number];

const factionsWithDynamicHomeworlds = ['The Council Keleres'] as const;

type FactionWithDynamicHomeworlds =
    (typeof factionsWithDynamicHomeworlds)[number];

type Faction = FactionWithFixedHomeworlds | FactionWithDynamicHomeworlds;

const isFactionWithDynamicHomeworlds = (
    f: string
): f is FactionWithDynamicHomeworlds =>
    factionsWithDynamicHomeworlds.some((fwdh) => fwdh === f);

const factions = _.sortBy([
    ...factionsWithFixedHomeworlds,
    ...factionsWithDynamicHomeworlds,
]);

const shortName = (f: Faction): string => f.replace('The ', '');

const superShortName = (f: Faction): string => {
    switch (f) {
        case 'Sardakk N’orr':
            return 'Sardakk';
        case 'The Arborec':
            return 'Arborec';
        case 'The Argent Flight':
            return 'Argent';
        case 'The Barony of Letnev':
            return 'Barony';
        case 'The Clan of Saar':
            return 'Saar';
        case 'The Embers of Muaat':
            return 'Muatt';
        case 'The Emirates of Hacan':
            return 'Hacan';
        case 'The Empyrean':
            return 'Empyrean';
        case 'The Federation of Sol':
            return 'Sol';
        case 'The Ghosts of Creuss':
            return 'Ghosts';
        case 'The L1Z1X Mindnet':
            return 'L1Z1X';
        case 'The Mahact Gene-Sorcerers':
            return 'Mahact';
        case 'The Mentak Coalition':
            return 'Mentak';
        case 'The Naalu Collective':
            return 'Naalu';
        case 'The Naaz-Rokha Alliance':
            return 'Naaz-Rokha';
        case 'The Nekro Virus':
            return 'Nekro';
        case 'The Nomad':
            return 'Nomad';
        case 'The Titans of Ul':
            return 'Titans';
        case 'The Universities of Jol-Nar':
            return 'Jol-Nar';
        case "The Vuil'Raith Cabal":
            return "Vuil'Raith";
        case 'The Winnu':
            return 'Winnu';
        case 'The Xxcha Kingdom':
            return 'Xxcha';
        case 'The Yin Brotherhood':
            return 'Yin';
        case 'The Yssaril Tribes':
            return 'Yssaril';
        case 'The Shipwrights of Ark':
            return 'Shipwrights';
        case 'The Celdauri Trade Confederation':
            return 'Celdauri';
        case 'The Savages of Cymiae':
            return 'Savages';
        case 'The Dih-Mohn Flotilla':
            return 'Dih-Mohn';
        case 'The Florzen Profiteers':
            return 'Florzen';
        case 'The Free Systems Compact':
            return 'Compact';
        case 'The Ghemina Raiders':
            return 'Ghemina';
        case 'The Augurs of Illyxum':
            return 'Augurs';
        case 'The Kollecc Society':
            return 'Kollecc';
        case 'The Kortali Tribunal':
            return 'Kortali';
        case 'The Li-Zho Dynasty':
            return 'Li-Zho';
        case "The L'tokk Khrask":
            return "L'tokk";
        case 'The Mirveda Protectorate':
            return 'Mirveda';
        case 'The Glimmer of Mortheus':
            return 'Glimmer';
        case 'The Myko-Mentori':
            return 'Myko-Mentori';
        case 'The Nivyn Star of Kings':
            return 'Nivyn';
        case 'The Olradin League':
            return 'Olradin';
        case 'The Zealots of Rhodun':
            return 'Zealots';
        case "Roh'Dhna Mechatronics":
            return "Roh'Dhna";
        case 'The Tnelis Syndicate':
            return 'Tnelis';
        case 'The Vaden Banking Clans':
            return 'Vaden';
        case 'The Vaylerian Scourge':
            return 'Vaylerian';
        case 'The Veldyr Sovereignty':
            return 'Veldyr';
        case 'The Zelian Purifier':
            return 'Zelian';
        case 'The Bentor Conglomerate':
            return 'Bentor';
        case 'The Cheiran Hordes':
            return 'Cheiran';
        case 'The Edyn Mandate':
            return 'Edyn';
        case 'The Ghoti Wayfarers':
            return 'Ghoti';
        case 'The GLEdge Union':
            return 'GLEdge';
        case 'The Berserkers of Kjalengard':
            return 'Berserkers';
        case 'The Monks of Kolume':
            return 'Monks';
        case 'The Kyro Sodality':
            return 'Kyro';
        case 'The Lanefir Remnants':
            return 'Lanefir';
        case 'The Nokar Sellships':
            return 'Nokar';
        case 'The Council Keleres':
            return 'Keleres';
    }
};

const factionSystemTile = (fs: FactionSelection): SystemTile =>
    isFactionSelectionWithCustomHomeworlds(fs)
        ? factionWithFixedHomeworldsSystemTile(fs.homeworldsOf)
        : factionWithFixedHomeworldsSystemTile(fs);

const factionSystemTileNumber = (fs: FactionSelection): SystemTileNumber =>
    factionSystemTile(fs).tileNumber;

const factionWithFixedHomeworldsSystemTile = (
    f: FactionWithFixedHomeworlds
): SystemTile => {
    switch (f) {
        case 'Sardakk N’orr':
            return saardakkNorrSystemTile;
        case 'The Arborec':
            return arborecSystemTile;
        case 'The Argent Flight':
            return argentFlightSystemTile;
        case 'The Barony of Letnev':
            return baronyOfLetnevSystemTile;
        case 'The Clan of Saar':
            return clanOfSaarSystemTile;
        case 'The Embers of Muaat':
            return embersOfMuattSystemTile;
        case 'The Emirates of Hacan':
            return emiratesOfHacanSystemTile;
        case 'The Empyrean':
            return empyreanSystemTile;
        case 'The Federation of Sol':
            return federationOfSolSystemTile;
        case 'The Ghosts of Creuss':
            return ghostsOfCreussSystemTile;
        case 'The L1Z1X Mindnet':
            return l1z1xMindnetSystemTile;
        case 'The Mahact Gene-Sorcerers':
            return mahactGeneSorcerorsSystemTile;
        case 'The Mentak Coalition':
            return mentakCoalitionSystemTile;
        case 'The Naalu Collective':
            return naaluCollectiveSystemTile;
        case 'The Naaz-Rokha Alliance':
            return naazRohkaAllianceSystemTile;
        case 'The Nekro Virus':
            return nekroVirusSystemTile;
        case 'The Nomad':
            return nomadSystemTile;
        case 'The Titans of Ul':
            return titansOfUlSystemTile;
        case 'The Universities of Jol-Nar':
            return universitiesOfJolNarSystemTile;
        case "The Vuil'Raith Cabal":
            return vuilraithCabalSystemTile;
        case 'The Winnu':
            return winnuSystemTile;
        case 'The Xxcha Kingdom':
            return xxchaKingdomSystemTile;
        case 'The Yin Brotherhood':
            return yinBrotherhoodSystemTile;
        case 'The Yssaril Tribes':
            return yssarilTribesSystemTile;
        case 'The Shipwrights of Ark':
            return shipwrightsOfArkSystemTile;
        case 'The Celdauri Trade Confederation':
            return celdauriTradeConfederationSystemTile;
        case 'The Savages of Cymiae':
            return savagesOfCymiaeSystemTile;
        case 'The Dih-Mohn Flotilla':
            return dihMohnFlotillaSystemTile;
        case 'The Florzen Profiteers':
            return florzenProfiteersSystemTile;
        case 'The Free Systems Compact':
            return freeSystemsCompactSystemTile;
        case 'The Ghemina Raiders':
            return gheminaRaidersSystemTile;
        case 'The Augurs of Illyxum':
            return augursOfIllyxumSystemTile;
        case 'The Kollecc Society':
            return kolleccSocietySystemTile;
        case 'The Kortali Tribunal':
            return kortaliTribunalSystemTile;
        case 'The Li-Zho Dynasty':
            return liZhoDynastySystemTile;
        case "The L'tokk Khrask":
            return ltokkKhraskSystemTile;
        case 'The Mirveda Protectorate':
            return mirvedaProtectorateSystemTile;
        case 'The Glimmer of Mortheus':
            return glimmerOfMortheusSystemTile;
        case 'The Myko-Mentori':
            return mykoMentoriSystemTile;
        case 'The Nivyn Star of Kings':
            return nivynStarOfKingsSystemTile;
        case 'The Olradin League':
            return olradinLeagueSystemTile;
        case 'The Zealots of Rhodun':
            return zealotsOfRhodunSystemTile;
        case "Roh'Dhna Mechatronics":
            return rohDhnaMechatronicsSystemTile;
        case 'The Tnelis Syndicate':
            return tnelisSyndicateSystemTile;
        case 'The Vaden Banking Clans':
            return vadenBankingClansSystemTile;
        case 'The Vaylerian Scourge':
            return vaylerianScourgeSystemTile;
        case 'The Veldyr Sovereignty':
            return veldyrSovereigntySystemTile;
        case 'The Zelian Purifier':
            return zelianPurifierSystemTile;
        case 'The Bentor Conglomerate':
            return bentorConglomerateSystemTile;
        case 'The Cheiran Hordes':
            return cheiranHordesSystemTile;
        case 'The Edyn Mandate':
            return edynMandateSystemTile;
        case 'The Ghoti Wayfarers':
            return ghotiWayferersSystemTile;
        case 'The GLEdge Union':
            return gledgeUnionSystemTile;
        case 'The Berserkers of Kjalengard':
            return berserkersOfKjalengardSystemTile;
        case 'The Monks of Kolume':
            return monksOfKolumeSystemTile;
        case 'The Kyro Sodality':
            return kyroSodalitySystemTile;
        case 'The Lanefir Remnants':
            return lanefirRemnantsSystemTile;
        case 'The Nokar Sellships':
            return nokarSellshipsSystemTile;
    }
};

const factionSheetImage = (f: Faction): string => {
    switch (f) {
        case 'Sardakk N’orr':
            return '';
        case 'The Arborec':
            return '';
        case 'The Argent Flight':
            return '';
        case 'The Barony of Letnev':
            return '';
        case 'The Clan of Saar':
            return '';
        case 'The Embers of Muaat':
            return '';
        case 'The Emirates of Hacan':
            return '';
        case 'The Empyrean':
            return '';
        case 'The Federation of Sol':
            return '';
        case 'The Ghosts of Creuss':
            return '';
        case 'The L1Z1X Mindnet':
            return l1z1x;
        case 'The Mahact Gene-Sorcerers':
            return '';
        case 'The Mentak Coalition':
            return '';
        case 'The Naalu Collective':
            return '';
        case 'The Naaz-Rokha Alliance':
            return '';
        case 'The Nekro Virus':
            return '';
        case 'The Nomad':
            return '';
        case 'The Titans of Ul':
            return '';
        case 'The Universities of Jol-Nar':
            return '';
        case "The Vuil'Raith Cabal":
            return cabal;
        case 'The Winnu':
            return '';
        case 'The Xxcha Kingdom':
            return '';
        case 'The Yin Brotherhood':
            return '';
        case 'The Yssaril Tribes':
            return '';
        case 'The Shipwrights of Ark':
            return '';
        case 'The Celdauri Trade Confederation':
            return '';
        case 'The Savages of Cymiae':
            return '';
        case 'The Dih-Mohn Flotilla':
            return dihmon;
        case 'The Florzen Profiteers':
            return '';
        case 'The Free Systems Compact':
            return '';
        case 'The Ghemina Raiders':
            return '';
        case 'The Augurs of Illyxum':
            return '';
        case 'The Kollecc Society':
            return '';
        case 'The Kortali Tribunal':
            return '';
        case 'The Li-Zho Dynasty':
            return '';
        case "The L'tokk Khrask":
            return '';
        case 'The Mirveda Protectorate':
            return '';
        case 'The Glimmer of Mortheus':
            return glimmer;
        case 'The Myko-Mentori':
            return '';
        case 'The Nivyn Star of Kings':
            return '';
        case 'The Olradin League':
            return '';
        case 'The Zealots of Rhodun':
            return '';
        case "Roh'Dhna Mechatronics":
            return rohdna;
        case 'The Tnelis Syndicate':
            return tnelis;
        case 'The Vaden Banking Clans':
            return '';
        case 'The Vaylerian Scourge':
            return '';
        case 'The Veldyr Sovereignty':
            return '';
        case 'The Zelian Purifier':
            return '';
        case 'The Bentor Conglomerate':
            return bentor;
        case 'The Cheiran Hordes':
            return '';
        case 'The Edyn Mandate':
            return '';
        case 'The Ghoti Wayfarers':
            return ghoti;
        case 'The GLEdge Union':
            return '';
        case 'The Berserkers of Kjalengard':
            return berserkers;
        case 'The Monks of Kolume':
            return '';
        case 'The Kyro Sodality':
            return '';
        case 'The Lanefir Remnants':
            return '';
        case 'The Nokar Sellships':
            return '';
        case 'The Council Keleres':
            return '';
    }
};

const factionQuote = (f: Faction): string => {
    switch (f) {
        case 'Sardakk N’orr':
            return '';
        case 'The Arborec':
            return '';
        case 'The Argent Flight':
            return '';
        case 'The Barony of Letnev':
            return '';
        case 'The Clan of Saar':
            return '';
        case 'The Embers of Muaat':
            return '';
        case 'The Emirates of Hacan':
            return '';
        case 'The Empyrean':
            return '';
        case 'The Federation of Sol':
            return '';
        case 'The Ghosts of Creuss':
            return '';
        case 'The L1Z1X Mindnet':
            return 'You do not know the meaning of time. You do not comprehend the infinite. Your ignorance is surpassed only by your irrelevance.';
        case 'The Mahact Gene-Sorcerers':
            return '';
        case 'The Mentak Coalition':
            return '';
        case 'The Naalu Collective':
            return '';
        case 'The Naaz-Rokha Alliance':
            return '';
        case 'The Nekro Virus':
            return '';
        case 'The Nomad':
            return '';
        case 'The Titans of Ul':
            return '';
        case 'The Universities of Jol-Nar':
            return '';
        case "The Vuil'Raith Cabal":
            return 'YOUR FORM IS FRAGILE AND WEAK. LET ME RELIEVE YOU OF YOUR HARDSHIPS.';
        case 'The Winnu':
            return '';
        case 'The Xxcha Kingdom':
            return '';
        case 'The Yin Brotherhood':
            return '';
        case 'The Yssaril Tribes':
            return '';
        case 'The Shipwrights of Ark':
            return '';
        case 'The Celdauri Trade Confederation':
            return '';
        case 'The Savages of Cymiae':
            return '';
        case 'The Dih-Mohn Flotilla':
            return 'We are exiles no longer!';
        case 'The Florzen Profiteers':
            return '';
        case 'The Free Systems Compact':
            return '';
        case 'The Ghemina Raiders':
            return '';
        case 'The Augurs of Illyxum':
            return '';
        case 'The Kollecc Society':
            return '';
        case 'The Kortali Tribunal':
            return '';
        case 'The Li-Zho Dynasty':
            return '';
        case "The L'tokk Khrask":
            return '';
        case 'The Mirveda Protectorate':
            return '';
        case 'The Glimmer of Mortheus':
            return 'You do not see. You will know.';
        case 'The Myko-Mentori':
            return '';
        case 'The Nivyn Star of Kings':
            return '';
        case 'The Olradin League':
            return '';
        case 'The Zealots of Rhodun':
            return '';
        case "Roh'Dhna Mechatronics":
            return 'Do not test our patience, valued customer, for it is with our constructions that your wars are fought.';
        case 'The Tnelis Syndicate':
            return 'Syndicate rules? Protect children, healers, and family. Always.';
        case 'The Vaden Banking Clans':
            return '';
        case 'The Vaylerian Scourge':
            return '';
        case 'The Veldyr Sovereignty':
            return '';
        case 'The Zelian Purifier':
            return '';
        case 'The Bentor Conglomerate':
            return "We will find what we seek. Don't make this difficult";
        case 'The Cheiran Hordes':
            return '';
        case 'The Edyn Mandate':
            return '';
        case 'The Ghoti Wayfarers':
            return 'You float through space, seeking to conquer its surface, but ignorant to what you disturbed in the deep.';
        case 'The GLEdge Union':
            return '';
        case 'The Berserkers of Kjalengard':
            return 'There is no glory in crushing the weak.';
        case 'The Monks of Kolume':
            return '';
        case 'The Kyro Sodality':
            return '';
        case 'The Lanefir Remnants':
            return '';
        case 'The Nokar Sellships':
            return '';
        case 'The Council Keleres':
            return '';
    }
};

type FactionSelectionWithCustomHomeworlds = {
    faction: FactionWithDynamicHomeworlds;
    homeworldsOf: FactionWithFixedHomeworlds;
};

type FactionSelection =
    | FactionWithFixedHomeworlds
    | FactionSelectionWithCustomHomeworlds;

const isFactionSelectionWithCustomHomeworlds = (
    fs: FactionSelection
): fs is FactionSelectionWithCustomHomeworlds =>
    !!(fs as FactionSelectionWithCustomHomeworlds).homeworldsOf;

const selectedFaction = (fs: FactionSelection): Faction =>
    isFactionSelectionWithCustomHomeworlds(fs) ? fs.faction : fs;

const homeworldsForFactionSelection = (fs: FactionSelection): PlanetName[] => {
    const systemTile = isFactionSelectionWithCustomHomeworlds(fs)
        ? factionWithFixedHomeworldsSystemTile(fs.homeworldsOf)
        : factionWithFixedHomeworldsSystemTile(fs);
    return isSystemWithPlanetsTile(systemTile) ? systemTile.planets : [];
};

const startingTechsForFaction = (f: Faction): Technology[] => {
    switch (f) {
        case 'Sardakk N’orr':
            return [];
        case 'The Arborec':
            return [magenDefenseGrid];
        case 'The Argent Flight':
            return [];
        case 'The Barony of Letnev':
            return [antimassDeflectors, plasmaScoring];
        case 'The Clan of Saar':
            return [antimassDeflectors];
        case 'The Embers of Muaat':
            return [plasmaScoring];
        case 'The Emirates of Hacan':
            return [antimassDeflectors, sarweenTools];
        case 'The Empyrean':
            return [darkEnergyTap];
        case 'The Federation of Sol':
            return [neuralMotivator, antimassDeflectors];
        case 'The Ghosts of Creuss':
            return [gravityDrive];
        case 'The L1Z1X Mindnet':
            return [neuralMotivator, plasmaScoring];
        case 'The Mahact Gene-Sorcerers':
            return [bioStims, predictiveIntelligence];
        case 'The Mentak Coalition':
            return [sarweenTools, plasmaScoring];
        case 'The Naalu Collective':
            return [neuralMotivator, sarweenTools];
        case 'The Naaz-Rokha Alliance':
            return [psychoArchaeology, aiDevelopmentAlgorithm];
        case 'The Nekro Virus':
            return [daxciveAnimators];
        case 'The Nomad':
            return [slingRelay];
        case 'The Titans of Ul':
            return [antimassDeflectors, scanlinkDroneNetwork];
        case 'The Universities of Jol-Nar':
            return [
                neuralMotivator,
                antimassDeflectors,
                sarweenTools,
                plasmaScoring,
            ];
        case "The Vuil'Raith Cabal":
            return [selfAssemblyRoutines];
        case 'The Winnu':
            return [];
        case 'The Xxcha Kingdom':
            return [gravitonLaserSystem];
        case 'The Yin Brotherhood':
            return [sarweenTools];
        case 'The Yssaril Tribes':
            return [neuralMotivator];
        case 'The Council Keleres':
            return [];
        case 'The Shipwrights of Ark':
            return [sarweenTools, aiDevelopmentAlgorithm];
        case 'The Celdauri Trade Confederation':
            return [];
        case 'The Savages of Cymiae':
            return [aiDevelopmentAlgorithm, neuralMotivator];
        case 'The Dih-Mohn Flotilla':
            return [darkEnergyTap, scanlinkDroneNetwork];
        case 'The Florzen Profiteers':
            return [scanlinkDroneNetwork, neuralMotivator];
        case 'The Free Systems Compact':
            return [psychoArchaeology];
        case 'The Ghemina Raiders':
            return [darkEnergyTap, psychoArchaeology];
        case 'The Augurs of Illyxum':
            return [scanlinkDroneNetwork, aiDevelopmentAlgorithm];
        case 'The Kollecc Society':
            return [scanlinkDroneNetwork];
        case 'The Kortali Tribunal':
            return [plasmaScoring, psychoArchaeology];
        case 'The Li-Zho Dynasty':
            return [psychoArchaeology, antimassDeflectors];
        case "The L'tokk Khrask":
            return [scanlinkDroneNetwork, plasmaScoring];
        case 'The Mirveda Protectorate':
            return [aiDevelopmentAlgorithm];
        case 'The Glimmer of Mortheus':
            return [darkEnergyTap];
        case 'The Myko-Mentori':
            return [predictiveIntelligence];
        case 'The Nivyn Star of Kings':
            return [darkEnergyTap, plasmaScoring];
        case 'The Olradin League':
            return [scanlinkDroneNetwork, psychoArchaeology];
        case 'The Zealots of Rhodun':
            return [bioStims];
        case "Roh'Dhna Mechatronics":
            return [sarweenTools, psychoArchaeology];
        case 'The Tnelis Syndicate':
            return [];
        case 'The Vaden Banking Clans':
            return [];
        case 'The Vaylerian Scourge':
            return [darkEnergyTap, neuralMotivator];
        case 'The Veldyr Sovereignty':
            return [darkEnergyTap, aiDevelopmentAlgorithm];
        case 'The Zelian Purifier':
            return [antimassDeflectors, aiDevelopmentAlgorithm];
        case 'The Bentor Conglomerate':
        case 'The Cheiran Hordes':
        case 'The Edyn Mandate':
        case 'The Ghoti Wayfarers':
        case 'The GLEdge Union':
        case 'The Berserkers of Kjalengard':
        case 'The Monks of Kolume':
        case 'The Kyro Sodality':
        case 'The Lanefir Remnants':
        case 'The Nokar Sellships':
            return [];
    }
};

const planetsOutsideOfGalaxy = (f: Faction): PlanetName[] => {
    switch (f) {
        case 'Sardakk N’orr':
        case 'The Arborec':
        case 'The Argent Flight':
        case 'The Barony of Letnev':
        case 'The Clan of Saar':
        case 'The Embers of Muaat':
        case 'The Emirates of Hacan':
        case 'The Empyrean':
        case 'The Federation of Sol':
        case 'The Ghosts of Creuss':
        case 'The L1Z1X Mindnet':
        case 'The Mahact Gene-Sorcerers':
        case 'The Mentak Coalition':
        case 'The Naalu Collective':
        case 'The Naaz-Rokha Alliance':
        case 'The Nekro Virus':
        case 'The Nomad':
        case 'The Titans of Ul':
        case 'The Universities of Jol-Nar':
        case "The Vuil'Raith Cabal":
        case 'The Winnu':
        case 'The Xxcha Kingdom':
        case 'The Yin Brotherhood':
        case 'The Yssaril Tribes':
        case 'The Shipwrights of Ark':
        case 'The Celdauri Trade Confederation':
        case 'The Savages of Cymiae':
        case 'The Dih-Mohn Flotilla':
        case 'The Florzen Profiteers':
        case 'The Free Systems Compact':
        case 'The Ghemina Raiders':
        case 'The Augurs of Illyxum':
        case 'The Kollecc Society':
        case 'The Kortali Tribunal':
        case 'The Li-Zho Dynasty':
        case "The L'tokk Khrask":
        case 'The Mirveda Protectorate':
        case 'The Glimmer of Mortheus':
        case 'The Myko-Mentori':
        case 'The Nivyn Star of Kings':
        case 'The Olradin League':
        case 'The Zealots of Rhodun':
        case "Roh'Dhna Mechatronics":
        case 'The Tnelis Syndicate':
        case 'The Vaden Banking Clans':
        case 'The Vaylerian Scourge':
        case 'The Veldyr Sovereignty':
        case 'The Zelian Purifier':
        case 'The Bentor Conglomerate':
        case 'The Cheiran Hordes':
        case 'The Edyn Mandate':
        case 'The GLEdge Union':
        case 'The Berserkers of Kjalengard':
        case 'The Monks of Kolume':
        case 'The Kyro Sodality':
        case 'The Lanefir Remnants':
        case 'The Nokar Sellships':
        case 'The Council Keleres':
            return [];
        case 'The Ghoti Wayfarers':
            return ['Ghoti'];
    }
};

export {
    Faction,
    factionQuote,
    factions,
    FactionSelection,
    factionSheetImage,
    factionsWithDynamicHomeworlds,
    factionsWithFixedHomeworlds,
    factionSystemTile,
    factionSystemTileNumber,
    FactionWithDynamicHomeworlds,
    FactionWithFixedHomeworlds,
    factionWithFixedHomeworldsSystemTile,
    homeworldsForFactionSelection,
    isFactionSelectionWithCustomHomeworlds,
    isFactionWithDynamicHomeworlds,
    planetsOutsideOfGalaxy,
    selectedFaction,
    shortName,
    startingTechsForFaction,
    superShortName,
};
