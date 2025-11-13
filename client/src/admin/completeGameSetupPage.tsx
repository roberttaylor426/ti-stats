import React, { useState } from 'react';
import styled from 'styled-components';
import _ from 'underscore';

import { Event, factionsInGame, techsAvailableToResearch } from '../events';
import { Faction, startingTechsForFaction } from '../factions';
import { technologies, Technology } from '../technologies';
import { notUndefined } from '../util';
import { AdminPageProps } from './adminPageProps';
import { Button } from './components/button';
import { InputsColumn } from './components/inputsColumn';
import { InputsRow } from './components/inputsRow';
import { InputTitle } from './components/inputTitle';
import { PageTitle } from './components/pageTitle';
import { Select } from './components/select';

const CompleteGameSetupPage: React.FC<AdminPageProps> = (props) => {
    const { events, publishNewEvents } = props;

    const factionsInGameThatNeedToPickStartingTech = factionsInGame(events)
        .map((f) => (startingTechsForFaction(f).length === 0 ? f : undefined))
        .filter(notUndefined);

    const [factionToResearchTech, setFactionToResearchTech] =
        useState<Faction>();
    const [techToResearch, setTechToResearch] = useState<Technology>();

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

    const publishGameSetupCompletedEvent = async () => {
        const newEvent: Event = {
            type: 'GameSetupCompleted',
            time: new Date().getTime(),
        };
        await publishNewEvents([newEvent]);
    };

    return (
        <StyledCompleteGameSetupPage>
            <PageTitle {...props} title={'Game setup'} />
            <ol>
                <li>Check faction starting components</li>
                <li>
                    Each player draws two secret objectives and chooses one to
                    keep. Shuffle the unchosen secret objectives back into the
                    secret objective deck without revealing them.
                </li>
                <li>The speaker reveals the first two stage I objectives.</li>
                {factionsInGameThatNeedToPickStartingTech.length > 0 && (
                    <li>Pick faction-specific starting techs.</li>
                )}
            </ol>
            {factionsInGameThatNeedToPickStartingTech.length > 0 && (
                <InputsColumn>
                    <InputTitle>Research tech</InputTitle>
                    <InputsRow>
                        <Select
                            onChange={(e) =>
                                setFactionToResearchTech(
                                    e.target.value as Faction
                                )
                            }
                        >
                            <option value={''}>--Faction--</option>
                            {_.sortBy(
                                factionsInGameThatNeedToPickStartingTech
                            ).map((f) => (
                                <option key={f} value={f}>
                                    {f}
                                </option>
                            ))}
                        </Select>
                        <Select
                            onChange={(e) =>
                                setTechToResearch(
                                    technologies.find(
                                        (t) => e.target.value === t.name
                                    )
                                )
                            }
                        >
                            <option value={''}>--Tech--</option>
                            {_.sortBy(
                                techsAvailableToResearch(
                                    factionToResearchTech,
                                    events
                                )
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
                                }
                            }}
                        >
                            Research
                        </Button>
                    </InputsRow>
                </InputsColumn>
            )}
            <Button onClick={publishGameSetupCompletedEvent}>
                {'Game setup completed'}
            </Button>
        </StyledCompleteGameSetupPage>
    );
};

const StyledCompleteGameSetupPage = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4rem;
    height: 100%;

    li {
        font-size: 1.5rem;
    }
`;

export { CompleteGameSetupPage };
