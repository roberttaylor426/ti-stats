import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import _, { identity } from 'underscore';

import {
    currentPlayerTurnInActionPhase,
    Event,
    factionsInGame,
    isPlanetDestroyedEvent,
    isPlanetEnhancedEvent,
    latestPlanetControlledEventsByPlanet,
    latestPlanetlessSystemControlledEventsBySystem,
    MapTilesSelectedEvent,
    playerSelectedStrategyCardEventFromLastStrategyPhase,
    strategyCardPlayedByPlayerOnPreviousTurnThisRound,
    strategyCardPlayedByPlayerThisTurn,
    systemTileNumbersInPlay,
    technologiesResearchedByFaction,
} from '../events';
import { Faction, shortName } from '../factions';
import { PlanetName, planets } from '../planets';
import { StrategyCard } from '../strategyCards';
import {
    isPlanetlessSystemTileNumber,
    isSystemWithPlanetsTile,
    PlanetlessSystemTileNumber,
    systemTileDescription,
    systemTiles,
} from '../systemTiles';
import { technologies, Technology } from '../technologies';
import { AdminPageProps } from './adminPageProps';
import { Button } from './components/button';
import { NumberInput } from './components/input';
import { InputsColumn } from './components/inputsColumn';
import { InputsRow } from './components/inputsRow';
import { PageTitle } from './components/pageTitle';
import { Select } from './components/select';
import { VpScoringContainer } from './components/vpScoringContainer';

type Props = {
    activePlayerInActionPhase: Faction;
    mapTilesSelectedEvent: MapTilesSelectedEvent;
};

const PlayerTurnPage: React.FC<Props & AdminPageProps> = (props) => {
    const {
        activePlayerInActionPhase,
        events,
        mapTilesSelectedEvent,
        publishNewEvents,
    } = props;

    const pageTitleRef = useRef<HTMLDivElement>(null);
    const scrollToTop = () => {
        pageTitleRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const [selectedPlanetToControl, setSelectedPlanetToControl] =
        useState<PlanetName>();

    const [
        selectedPlanetlessSystemToControl,
        setSelectedPlanetlessSystemToControl,
    ] = useState<PlanetlessSystemTileNumber>();

    const [selectedPlanetToEnhance, setSelectedPlanetToEnhance] =
        useState<PlanetName>();
    const [resourcesToEnhance, setResourcesToEnhance] = useState(0);
    const [influenceToEnhance, setInfluenceToEnhance] = useState(0);

    const [techToResearch, setTechToResearch] = useState<Technology>();
    const [factionToResearchTech, setFactionToResearchTech] =
        useState<Faction>();

    const [planetToDestroy, setPlanetToDestroy] = useState<PlanetName>();

    const publishPlanetControlledEvent = async (p: PlanetName, f: Faction) => {
        const newEvent: Event = {
            type: 'PlanetControlled',
            time: new Date().getTime(),
            planet: p,
            faction: f,
        };

        await publishNewEvents([newEvent]);
    };

    const publishPlanetlessSystemControlledEvent = async (
        stn: PlanetlessSystemTileNumber,
        f: Faction | undefined
    ) => {
        const newEvent: Event = {
            type: 'PlanetlessSystemControlled',
            time: new Date().getTime(),
            tileNumber: stn,
            faction: f,
        };

        await publishNewEvents([newEvent]);
    };

    const publishPlanetEnhancedEvent = async (
        p: PlanetName,
        extraResources: number,
        extraInfluence: number
    ) => {
        const newEvent: Event = {
            type: 'PlanetEnhanced',
            time: new Date().getTime(),
            planet: p,
            extraResources,
            extraInfluence,
        };

        await publishNewEvents([newEvent]);
    };

    const publishPlayerResearchedTechnologyEvent = async (
        t: Technology,
        f: Faction
    ) => {
        const newEvent: Event = {
            type: 'PlayerResearchedTechnology',
            time: new Date().getTime(),
            technology: t,
            faction: f,
        };

        await publishNewEvents([newEvent]);
    };

    const publishPlayerPlayedStrategyCardEvent = async (
        sc: StrategyCard,
        f: Faction
    ) => {
        const newEvent: Event = {
            type: 'PlayerPlayedStrategyCard',
            time: new Date().getTime(),
            strategyCard: sc,
            faction: f,
        };

        await publishNewEvents([newEvent]);
    };

    const publishTurnFinishedEvent = async (f: Faction, pass: boolean) => {
        const newEvent: Event = {
            type: 'PlayerFinishedTurn',
            time: new Date().getTime(),
            faction: f,
            pass,
        };

        await publishNewEvents([newEvent]);
    };

    const publishPlanetDestroyedEvent = async (
        p: PlanetName
    ): Promise<boolean> => {
        const newEvent: Event = {
            type: 'PlanetDestroyed',
            time: new Date().getTime(),
            planet: p,
        };

        return await publishNewEvents([newEvent]);
    };

    const planetsOnTheBoard: PlanetName[] = systemTileNumbersInPlay(events)
        .flatMap(
            (stn) =>
                systemTiles
                    .filter(isSystemWithPlanetsTile)
                    .find((t) => t.tileNumber === stn)?.planets || []
        )
        .filter(
            (p) =>
                !events
                    .filter(isPlanetDestroyedEvent)
                    .some((dp) => dp.planet === p)
        );

    const planetlessSystemTilesOnTheBoard: PlanetlessSystemTileNumber[] =
        systemTileNumbersInPlay(events).filter(isPlanetlessSystemTileNumber);

    const factionCurrentlyControllingPlanet = (p: PlanetName) =>
        latestPlanetControlledEventsByPlanet(events).find((e) => e.planet === p)
            ?.faction;

    const planetNameWithControllingFaction = (p: PlanetName) => {
        const faction = factionCurrentlyControllingPlanet(p);
        return `${p}${faction ? ` (${shortName(faction)})` : ''}`;
    };

    const factionCurrentlyControllingPlanetlessSystemTile = (
        stn: PlanetlessSystemTileNumber
    ): Faction | undefined =>
        latestPlanetlessSystemControlledEventsBySystem(events).find(
            (e) => e.tileNumber === stn
        )?.faction;

    const planetlessSystemTileWithControllingFaction = (
        stn: PlanetlessSystemTileNumber
    ) => {
        const faction = factionCurrentlyControllingPlanetlessSystemTile(stn);
        return `${systemTileDescription(stn)}${faction ? ` (${shortName(faction)})` : ''}`;
    };

    const planetResourcesAndInfluence = (p: PlanetName) => ({
        resources:
            planets[p].resources +
            events
                .filter(isPlanetEnhancedEvent)
                .filter((e) => e.planet === p)
                .reduce((acc, n) => acc + n.extraResources, 0),
        influence:
            planets[p].influence +
            events
                .filter(isPlanetEnhancedEvent)
                .filter((e) => e.planet === p)
                .reduce((acc, n) => acc + n.extraInfluence, 0),
    });

    const planetNameWithResourcesAndInfluence = (p: PlanetName) =>
        `${p} (${planetResourcesAndInfluence(p).resources}R, ${planetResourcesAndInfluence(p).influence}I)`;

    const techsAvailableToResearch = (
        f: Faction | undefined,
        events: Event[]
    ): Technology[] =>
        f
            ? _.sortBy(
                  technologies
                      .filter((t) => t.faction === f || !t.faction)
                      .filter(
                          (t) =>
                              !technologiesResearchedByFaction(f, events).some(
                                  (trbf) => t.name === trbf.name
                              )
                      ),
                  (t) => t.name
              )
            : [];

    const strategyCardSelectedByActivePlayerInActionPhase =
        playerSelectedStrategyCardEventFromLastStrategyPhase(events).find(
            (e) => e.faction === activePlayerInActionPhase
        )?.strategyCard;

    return (
        <StyledPlayerTurnPage>
            <div ref={pageTitleRef}>
                <PageTitle
                    {...props}
                    title={`${currentPlayerTurnInActionPhase(events)} turn`}
                />
            </div>
            <InputsRow>
                <Select
                    onChange={(e) =>
                        setSelectedPlanetToControl(e.target.value as PlanetName)
                    }
                >
                    <option value={''}>--Planet--</option>
                    {_.sortBy(planetsOnTheBoard, identity).map((p) => (
                        <option key={p} value={p}>
                            {planetNameWithControllingFaction(p)}
                        </option>
                    ))}
                </Select>
                <Button
                    onClick={async () => {
                        if (selectedPlanetToControl) {
                            await publishPlanetControlledEvent(
                                selectedPlanetToControl,
                                activePlayerInActionPhase
                            );
                        }
                    }}
                >
                    Take control
                </Button>
            </InputsRow>
            <InputsRow>
                <Select
                    onChange={(e) =>
                        setSelectedPlanetlessSystemToControl(
                            Number.parseInt(
                                e.target.value
                            ) as PlanetlessSystemTileNumber
                        )
                    }
                >
                    <option value={''}>--Planetless system--</option>
                    <option
                        value={''}
                        disabled
                    >{`Index 1: ${systemTileDescription(mapTilesSelectedEvent.selections[0])}`}</option>
                    {_.sortBy(planetlessSystemTilesOnTheBoard, (stn) =>
                        tileIndexOnBoard(stn, mapTilesSelectedEvent)
                    ).map((stn) => (
                        <option key={stn} value={stn}>
                            {`#${tileIndexOnBoard(stn, mapTilesSelectedEvent)}: ${planetlessSystemTileWithControllingFaction(
                                stn
                            )}`}
                        </option>
                    ))}
                </Select>
                <Button
                    onClick={async () => {
                        if (selectedPlanetlessSystemToControl) {
                            await publishPlanetlessSystemControlledEvent(
                                selectedPlanetlessSystemToControl,
                                activePlayerInActionPhase
                            );
                        }
                    }}
                >
                    Take control
                </Button>
                <Button
                    disabled={
                        !selectedPlanetlessSystemToControl ||
                        factionCurrentlyControllingPlanetlessSystemTile(
                            selectedPlanetlessSystemToControl
                        ) !== activePlayerInActionPhase
                    }
                    onClick={async () => {
                        if (selectedPlanetlessSystemToControl) {
                            await publishPlanetlessSystemControlledEvent(
                                selectedPlanetlessSystemToControl,
                                undefined
                            );
                        }
                    }}
                >
                    Lose control
                </Button>
            </InputsRow>
            <InputsColumn>
                <Select
                    onChange={(e) =>
                        setSelectedPlanetToEnhance(e.target.value as PlanetName)
                    }
                >
                    <option value={''}>--Planet--</option>
                    {_.sortBy(planetsOnTheBoard, identity).map((p) => (
                        <option key={p} value={p}>
                            {planetNameWithResourcesAndInfluence(p)}
                        </option>
                    ))}
                </Select>
                <InputsRow>
                    <NumberInput
                        placeholder={'Resources'}
                        onChange={(e) =>
                            setResourcesToEnhance(
                                Number.parseInt(e.target.value)
                            )
                        }
                    />
                    <NumberInput
                        placeholder={'Influence'}
                        onChange={(e) =>
                            setInfluenceToEnhance(
                                Number.parseInt(e.target.value)
                            )
                        }
                    />
                </InputsRow>
                <Button
                    onClick={async () => {
                        if (selectedPlanetToEnhance) {
                            await publishPlanetEnhancedEvent(
                                selectedPlanetToEnhance,
                                resourcesToEnhance,
                                influenceToEnhance
                            );
                        }
                    }}
                >
                    Enhance
                </Button>
            </InputsColumn>
            <InputsRow>
                <Select
                    onChange={(e) =>
                        setFactionToResearchTech(e.target.value as Faction)
                    }
                >
                    <option value={''}>--Faction--</option>
                    {_.sortBy(factionsInGame(events)).map((f) => (
                        <option key={f} value={f}>
                            {f}
                        </option>
                    ))}
                </Select>
                <Select
                    onChange={(e) =>
                        setTechToResearch(
                            technologies.find((t) => e.target.value === t.name)
                        )
                    }
                >
                    <option value={''}>--Tech--</option>
                    {_.sortBy(
                        techsAvailableToResearch(factionToResearchTech, events)
                    ).map(({ name }) => (
                        <option key={name} value={name}>
                            {name}
                        </option>
                    ))}
                </Select>
                <Button
                    onClick={async () => {
                        if (factionToResearchTech && techToResearch) {
                            await publishPlayerResearchedTechnologyEvent(
                                techToResearch,
                                factionToResearchTech
                            );

                            if (
                                techToResearch.name === 'I.I.H.Q Modernization'
                            ) {
                                await publishPlanetControlledEvent(
                                    'Custodia Vigilia',
                                    factionToResearchTech
                                );
                            }
                        }
                    }}
                >
                    Research
                </Button>
            </InputsRow>
            <VpScoringContainer
                defaultFaction={activePlayerInActionPhase}
                {...props}
            />
            <InputsRow>
                <Select
                    onChange={(e) =>
                        setPlanetToDestroy(e.target.value as PlanetName)
                    }
                >
                    <option value={''}>--Planet--</option>
                    {_.sortBy(planetsOnTheBoard, identity).map((p) => (
                        <option key={p} value={p}>
                            {planetNameWithControllingFaction(p)}
                        </option>
                    ))}
                </Select>
                <Button
                    onClick={async () => {
                        if (planetToDestroy) {
                            await publishPlanetDestroyedEvent(planetToDestroy);
                        }
                    }}
                >
                    Destroy planet
                </Button>
            </InputsRow>
            {!strategyCardPlayedByPlayerOnPreviousTurnThisRound(
                events,
                activePlayerInActionPhase
            ) &&
                strategyCardSelectedByActivePlayerInActionPhase && (
                    <InputsColumn>
                        <Button
                            disabled={strategyCardPlayedByPlayerThisTurn(
                                events,
                                activePlayerInActionPhase
                            )}
                            onClick={() =>
                                publishPlayerPlayedStrategyCardEvent(
                                    strategyCardSelectedByActivePlayerInActionPhase,
                                    activePlayerInActionPhase
                                )
                            }
                        >
                            Play strategy card
                        </Button>
                    </InputsColumn>
                )}
            <InputsColumn>
                <Button
                    onClick={async () => {
                        await publishTurnFinishedEvent(
                            activePlayerInActionPhase,
                            false
                        );

                        scrollToTop();
                    }}
                >
                    Turn finished
                </Button>
            </InputsColumn>
            {strategyCardPlayedByPlayerOnPreviousTurnThisRound(
                events,
                activePlayerInActionPhase
            ) && (
                <InputsColumn>
                    <Button
                        onClick={async () => {
                            await publishTurnFinishedEvent(
                                activePlayerInActionPhase,
                                true
                            );

                            scrollToTop();
                        }}
                    >
                        Pass
                    </Button>
                </InputsColumn>
            )}
        </StyledPlayerTurnPage>
    );
};

const tileIndexOnBoard = (
    stn: PlanetlessSystemTileNumber,
    mapTilesSelectedEvent: MapTilesSelectedEvent
): number =>
    Number.parseInt(
        (Object.entries(mapTilesSelectedEvent.selections).find(
            ([_, v]) => v === stn
        ) || ['-1'])[0]
    ) + 1;

const StyledPlayerTurnPage = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4rem;
    height: 100%;
`;

export { PlayerTurnPage };
