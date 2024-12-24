import React, { useState } from 'react';
import styled from 'styled-components';
import _, { identity } from 'underscore';

import { AgendaCard, agendaCards } from '../agendaCards';
import { Event } from '../events';
import { AdminPageProps } from './adminPageProps';
import { Button, PageTitle, Select } from './components';
import { VpScoringContainer } from './components/vpScoringContainer';

type Props = {
    currentRoundNumber: number;
};

const AgendaPhasePage: React.FC<Props & AdminPageProps> = (props) => {
    const { currentRoundNumber, publishNewEvents } = props;
    const [selectedAgendaCard, setSelectedAgendaCard] = useState<AgendaCard>();

    const publishAgendaCardRevealEvent = async (
        ac: AgendaCard
    ): Promise<boolean> => {
        const newEvent: Event = {
            type: 'AgendaCardRevealed',
            time: new Date().getTime(),
            card: ac,
        };

        return await publishNewEvents([newEvent]);
    };

    const publishRoundEndedEvent = async () => {
        const newEvent: Event = {
            type: 'RoundEnded',
            time: new Date().getTime(),
        };

        await publishNewEvents([newEvent]);
    };

    return (
        <StyledAgendaPhasePage>
            <PageTitle {...props} title={'Agenda phase'} />
            <AgendaCardRevealedRow>
                <Select
                    onChange={(e) =>
                        setSelectedAgendaCard(e.target.value as AgendaCard)
                    }
                >
                    <option value={''}>--Agenda card--</option>
                    {_.sortBy(agendaCards, identity).map((ac) => (
                        <option key={ac} value={ac}>
                            {ac}
                        </option>
                    ))}
                </Select>
                <Button
                    onClick={async () => {
                        if (selectedAgendaCard) {
                            await publishAgendaCardRevealEvent(
                                selectedAgendaCard
                            );
                        }
                    }}
                >
                    Reveal card
                </Button>
            </AgendaCardRevealedRow>
            <VpScoringContainer {...props} />
            <Button onClick={publishRoundEndedEvent}>
                {`End Round ${currentRoundNumber}`}
            </Button>
        </StyledAgendaPhasePage>
    );
};

const StyledAgendaPhasePage = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4rem;
    height: 100%;
`;

const AgendaCardRevealedRow = styled.div`
    display: flex;
    flex-wrap: wrap;
    column-gap: 2rem;
    row-gap: 1rem;

    > * {
        flex: 1 1 0;
    }
`;

export { AgendaPhasePage };
