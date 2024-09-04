import React from 'react';
import styled from 'styled-components';
import _ from 'underscore';

import { factionsInGame, playerFactionsAndColors } from './events';
import { Stars } from './stars';
import { StatsContainer, StatsTitle } from './stats';
import { useEvents } from './useEvents';
import { hexColor } from './util';

const TechPage: React.FC = () => {
    const { events } = useEvents();

    const factions = factionsInGame(events);
    const factionsAndColors = playerFactionsAndColors(events);

    const factionRows = _.chunk(_.sortBy(factions), 3);

    return (
        <StyledTechPage>
            <Stars />
            <TechsResearchedTable>
                <Scoreboard>
                    <StatsTitle>Technologies researched</StatsTitle>
                    <StatsContainer>
                        <TechsResearchedGrid>
                            {factionRows.map((r, index) => (
                                <TechsResearchedRow key={index}>
                                    {r.map((f) => (
                                        <FactionTitle
                                            key={f}
                                            $color={hexColor(
                                                factionsAndColors[f]
                                            )}
                                        >
                                            {f}
                                        </FactionTitle>
                                    ))}
                                </TechsResearchedRow>
                            ))}
                        </TechsResearchedGrid>
                    </StatsContainer>
                </Scoreboard>
            </TechsResearchedTable>
        </StyledTechPage>
    );
};

const TechsResearchedTable = styled.div`
    display: flex;
    flex-direction: row;
    margin: 4rem;

    > * {
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

const Scoreboard = styled.section`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    font-size: 2.25rem;

    > :nth-child(2) {
        flex: 1 1 0;
    }
`;

const TechsResearchedGrid = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1 1 0;

    > * {
        flex: 1 1 0;
    }
`;

const TechsResearchedRow = styled.div`
    display: flex;
    flex-direction: row;

    > * {
        flex: 1 1 0;
    }
`;

type FactionTitleProps = {
    $color: string;
};

const FactionTitle = styled.h1<FactionTitleProps>`
    color: ${(props) => props.$color};
`;

export { TechPage };
