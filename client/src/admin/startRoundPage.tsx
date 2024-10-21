import React, { useState } from 'react';
import styled from 'styled-components';
import _, { identity } from 'underscore';

import { Event, factionsInGame, isSpeakerAssignedEvent } from '../events';
import { Faction } from '../factions';
import { AdminPageProps } from './adminPageProps';
import { Button, PageTitle, Select } from './components';

type Props = {
    currentRoundNumber: number;
};

const StartRoundPage: React.FC<Props & AdminPageProps> = (props) => {
    const { currentRoundNumber, events, publishNewEvents } = props;
    const [assignedSpeaker, setAssignedSpeaker] = useState<Faction>();

    const publishSpeakerAssignedEvent = async (f: Faction) => {
        const newEvent: Event = {
            type: 'SpeakerAssigned',
            time: new Date().getTime(),
            faction: f,
        };

        await publishNewEvents([newEvent]);
    };

    const publishRoundStartedEvent = async () => {
        const newEvent: Event = {
            type: 'RoundStarted',
            time: new Date().getTime(),
        };

        await publishNewEvents([newEvent]);
    };

    return (
        <StyledStartRoundPage>
            <PageTitle {...props} title={'Start round'} />
            <SpeakerAssignmentRow>
                <Select
                    defaultValue={
                        _.last(events.filter(isSpeakerAssignedEvent))?.faction
                    }
                    onChange={(e) =>
                        setAssignedSpeaker(e.target.value as Faction)
                    }
                >
                    <option value={''}>--Faction--</option>
                    {_.sortBy(factionsInGame(events), identity).map((ac) => (
                        <option key={ac} value={ac}>
                            {ac}
                        </option>
                    ))}
                </Select>
                <Button
                    onClick={async () => {
                        if (assignedSpeaker) {
                            await publishSpeakerAssignedEvent(assignedSpeaker);
                        }
                    }}
                >
                    Assign speaker
                </Button>
            </SpeakerAssignmentRow>
            <Button
                onClick={publishRoundStartedEvent}
                disabled={events.filter(isSpeakerAssignedEvent).length === 0}
            >
                {`Start Round ${currentRoundNumber}`}
            </Button>
        </StyledStartRoundPage>
    );
};

const StyledStartRoundPage = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4rem;
    height: 100%;
`;

const SpeakerAssignmentRow = styled.div`
    display: flex;
    flex-wrap: wrap;
    column-gap: 2rem;
    row-gap: 1rem;

    > * {
        flex: 1 1 0;
    }
`;

export { StartRoundPage };
