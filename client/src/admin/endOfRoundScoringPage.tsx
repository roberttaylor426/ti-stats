import React from 'react';

import {
    currentRoundNumber,
    Event,
    hasMecatolRexBeenCaptured,
} from '../events';
import { AdminPageProps } from './adminPageProps';
import { Button } from './components/button';
import { PageTitle } from './components/pageTitle';
import { VpScoringContainer } from './components/vpScoringContainer';

const EndOfRoundScoringPage: React.FC<AdminPageProps> = (props) => {
    const { events, publishNewEvents } = props;

    const publishRoundEndedEvent = async () => {
        const newEvent: Event = {
            type: 'RoundEnded',
            time: new Date().getTime(),
        };

        await publishNewEvents([newEvent]);
    };

    const publishAgendaPhaseStartedEvent = async () => {
        const newEvent: Event = {
            type: 'AgendaPhaseStarted',
            time: new Date().getTime(),
        };

        await publishNewEvents([newEvent]);
    };

    return (
        <>
            <PageTitle {...props} title={'End of round scoring'} />
            <VpScoringContainer {...props} />
            {hasMecatolRexBeenCaptured(events) ? (
                <Button onClick={publishAgendaPhaseStartedEvent}>
                    {`Start Agenda Phase`}
                </Button>
            ) : (
                <Button onClick={publishRoundEndedEvent}>
                    {`End Round ${currentRoundNumber(events)}`}
                </Button>
            )}
        </>
    );
};

export { EndOfRoundScoringPage };
