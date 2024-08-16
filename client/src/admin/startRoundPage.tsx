import React from 'react';

import { Event } from '../events';
import { AdminPageProps } from './adminPageProps';
import { Button, PageTitle } from './components';

type Props = {
    currentRoundNumber: number;
};

const StartRoundPage: React.FC<Props & AdminPageProps> = (props) => {
    const { currentRoundNumber, publishNewEvents } = props;

    const publishRoundStartedEvent = async () => {
        const newEvent: Event = {
            type: 'RoundStarted',
            time: new Date().getTime(),
        };

        await publishNewEvents([newEvent]);
    };

    return (
        <>
            <PageTitle {...props} title={'Start round'} />
            <Button onClick={publishRoundStartedEvent}>
                {`Start Round ${currentRoundNumber}`}
            </Button>
        </>
    );
};

export { StartRoundPage };
