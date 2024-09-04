import React from 'react';
import styled from 'styled-components';
import _ from 'underscore';

import { accentColor } from './colors';
import {
    factionsInGame,
    playerFactionsAndColors,
    technologiesResearchedByFaction,
} from './events';
import { hexPlayerColor } from './playerColors';
import { Stars } from './stars';
import { StatsContainer, StatsTitle, statsTitleCss } from './stats';
import { hexColorForTechnologyType } from './technologies';
import { useEvents } from './useEvents';

const TechPage: React.FC = () => {
    const { events } = useEvents();

    const factions = factionsInGame(events);
    const factionsAndColors = playerFactionsAndColors(events);

    const factionRows = _.chunk(_.sortBy(factions), 3);

    return (
        <StyledTechPage>
            <Stars />
            <TechsResearchedTable>
                <StatsTitle>Technologies researched</StatsTitle>
                <TechsResearchedGrid>
                    {factionRows.map((r, index) => (
                        <TechsResearchedRow key={index}>
                            {r.map((f) => (
                                <FactionTechs key={f}>
                                    <FactionTitle
                                        $color={hexPlayerColor(
                                            factionsAndColors[f]
                                        )}
                                    >
                                        {f}
                                    </FactionTitle>
                                    <StatsContainer>
                                        {technologiesResearchedByFaction(
                                            f,
                                            events
                                        ).map((t) => (
                                            <TechResearched
                                                key={t.name}
                                                $color={hexColorForTechnologyType(
                                                    t.type
                                                )}
                                            >
                                                {t.name}
                                            </TechResearched>
                                        ))}
                                    </StatsContainer>
                                </FactionTechs>
                            ))}
                        </TechsResearchedRow>
                    ))}
                </TechsResearchedGrid>
            </TechsResearchedTable>
        </StyledTechPage>
    );
};

const TechsResearchedTable = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2rem;
    margin: 4rem;
    font-size: 2.25rem;

    > :nth-child(2) {
        flex: 1 1 0;
    }
`;

const StyledTechPage = styled.div`
    display: flex;
    flex-direction: column;

    > ${TechsResearchedTable} {
        flex: 1 1 0;
    }
`;

const TechsResearchedGrid = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2rem;
    flex: 1 1 0;

    > * {
        flex: 1 1 0;
    }
`;

const TechsResearchedRow = styled.div`
    display: flex;
    flex-direction: row;
    gap: 2rem;

    > * {
        flex: 1 1 0;
    }
`;

const FactionTechs = styled.div`
    display: flex;
    flex-direction: column;

    > :nth-child(2) {
        flex: 1 1 0;
    }
`;

type FactionTitleProps = {
    $color: string;
};

const FactionTitle = styled.h4<FactionTitleProps>`
    ${statsTitleCss};
    background-color: ${accentColor}33;
    color: ${(props) => props.$color};
`;

type TechResearchedProps = {
    $color: string;
};

const TechResearched = styled.h4<TechResearchedProps>`
    color: ${(props) => props.$color};
`;

export { TechPage };
