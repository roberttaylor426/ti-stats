import React from 'react';
import styled from 'styled-components';

import { Button } from './button';

type PageTitleProps = {
    title: string;
    toggleUndoLastEventMode: () => void;
    buttonLabelOverride?: string;
};

const PageTitle: React.FC<PageTitleProps> = ({
    title,
    toggleUndoLastEventMode,
    buttonLabelOverride,
}) => (
    <StyledPageTitle>
        <span>{title}</span>
        <ButtonContainer>
            <Button onClick={toggleUndoLastEventMode}>
                {buttonLabelOverride || 'Undo last'}
            </Button>
        </ButtonContainer>
    </StyledPageTitle>
);

const StyledPageTitle = styled.div`
    display: flex;
    gap: 2rem;
    justify-content: space-between;
    flex-wrap: wrap;

    > * {
        flex-grow: 1;
    }
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: flex-end;
`;

export { PageTitle };
