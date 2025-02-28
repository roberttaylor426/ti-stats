import React from 'react';
import _ from 'underscore';

import {
    currentRoundNumber,
    Event,
    hasMecatolRexBeenCaptured,
} from '../events';
import { AdminPageProps } from './adminPageProps';
import { Button } from './components/button';
import { PageTitle } from './components/pageTitle';
import { VpScoringContainer } from './components/vpScoringContainer';

const StatusPhasePage: React.FC<AdminPageProps> = (props) => {
    const { events, publishNewEvents } = props;

    const lastEvent = _.last(events);
    const statusPhaseStage: StatusPhaseStage =
        lastEvent?.type === 'PlayerFinishedTurn'
            ? 'score objectives'
            : lastEvent?.type === 'ObjectivesScoredDuringStatusPhase'
              ? 'reveal public objectives'
              : lastEvent?.type === 'PublicObjectivesRevealedDuringStatusPhase'
                ? 'draw action cards'
                : lastEvent?.type === 'ActionCardsDrawnDuringStatusPhase'
                  ? 'remove command tokens'
                  : lastEvent?.type === 'CommandTokensRemovedDuringStatusPhase'
                    ? 'gain and redistribute command tokens'
                    : lastEvent?.type ===
                        'CommandTokensGainedAndRedistributedDuringStatusPhase'
                      ? 'ready cards'
                      : lastEvent?.type === 'CardsReadiedDuringStatusPhase'
                        ? 'repair units'
                        : 'return strategy cards';

    const publishObjectivesScoredEvent = async () => {
        const newEvent: Event = {
            type: 'ObjectivesScoredDuringStatusPhase',
            time: new Date().getTime(),
        };

        await publishNewEvents([newEvent]);
    };

    const publishPublicObjectivesRevealedEvent = async () => {
        const newEvent: Event = {
            type: 'PublicObjectivesRevealedDuringStatusPhase',
            time: new Date().getTime(),
        };

        await publishNewEvents([newEvent]);
    };

    const publishActionCardsDrawnEvent = async () => {
        const newEvent: Event = {
            type: 'ActionCardsDrawnDuringStatusPhase',
            time: new Date().getTime(),
        };

        await publishNewEvents([newEvent]);
    };

    const publishCommandTokensRemovedEvent = async () => {
        const newEvent: Event = {
            type: 'CommandTokensRemovedDuringStatusPhase',
            time: new Date().getTime(),
        };

        await publishNewEvents([newEvent]);
    };

    const publishCommandTokensGainedAndRedistributedEvent = async () => {
        const newEvent: Event = {
            type: 'CommandTokensGainedAndRedistributedDuringStatusPhase',
            time: new Date().getTime(),
        };

        await publishNewEvents([newEvent]);
    };

    const publishCardsReadiedEvent = async () => {
        const newEvent: Event = {
            type: 'CardsReadiedDuringStatusPhase',
            time: new Date().getTime(),
        };

        await publishNewEvents([newEvent]);
    };

    const publishUnitsRepairedEvent = async () => {
        const newEvent: Event = {
            type: 'UnitsRepairedDuringStatusPhase',
            time: new Date().getTime(),
        };

        await publishNewEvents([newEvent]);
    };

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
            <PageTitle {...props} title={'Status phase'} />
            {statusPhaseStage === 'score objectives' ? (
                <>
                    <VpScoringContainer {...props} />
                    <Button onClick={publishObjectivesScoredEvent}>
                        {'Objectives scored'}
                    </Button>
                </>
            ) : statusPhaseStage === 'reveal public objectives' ? (
                <>
                    <span>Reveal public objectives</span>
                    <Button onClick={publishPublicObjectivesRevealedEvent}>
                        {'Public objectives revealed'}
                    </Button>
                </>
            ) : statusPhaseStage === 'draw action cards' ? (
                <>
                    <span>Draw action cards</span>
                    <Button onClick={publishActionCardsDrawnEvent}>
                        {'Action cards drawn'}
                    </Button>
                </>
            ) : statusPhaseStage === 'remove command tokens' ? (
                <>
                    <span>Remove command tokens</span>
                    <Button onClick={publishCommandTokensRemovedEvent}>
                        {'Command tokens removed'}
                    </Button>
                </>
            ) : statusPhaseStage === 'gain and redistribute command tokens' ? (
                <>
                    <span>Gain and redistribute command tokens</span>
                    <Button
                        onClick={
                            publishCommandTokensGainedAndRedistributedEvent
                        }
                    >
                        {'Command tokens gained'}
                    </Button>
                </>
            ) : statusPhaseStage === 'ready cards' ? (
                <>
                    <span>Ready cards</span>
                    <Button onClick={publishCardsReadiedEvent}>
                        {'Cards readied'}
                    </Button>
                </>
            ) : statusPhaseStage === 'repair units' ? (
                <>
                    <span>Repair units</span>
                    <Button onClick={publishUnitsRepairedEvent}>
                        {'Units repaired'}
                    </Button>
                </>
            ) : (
                <>
                    <span>Return strategy cards</span>
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
            )}
        </>
    );
};

type StatusPhaseStage =
    | 'score objectives'
    | 'reveal public objectives'
    | 'draw action cards'
    | 'remove command tokens'
    | 'gain and redistribute command tokens'
    | 'ready cards'
    | 'repair units'
    | 'return strategy cards';

export { StatusPhasePage };
