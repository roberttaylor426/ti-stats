import React from 'react';

import { Event } from '../events';
import { AdminPageProps } from './adminPageProps';
import { Button, PageTitle } from './components';

type Props = {
    currentRoundNumber: number;
};

const AgendaPhasePage: React.FC<Props & AdminPageProps> = (props) => {
    const { currentRoundNumber, publishNewEvents } = props;

    const publishRoundEndedEvent = async () => {
        const newEvent: Event = {
            type: 'RoundEnded',
            time: new Date().getTime(),
        };

        await publishNewEvents([newEvent]);
    };

    return (
        <>
            <PageTitle {...props} title={'End round'} />
            <Button onClick={publishRoundEndedEvent}>
                {`End Round ${currentRoundNumber}`}
            </Button>
        </>
    );
};

export { AgendaPhasePage };
