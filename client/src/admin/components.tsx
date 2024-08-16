import React from 'react';
import styled from 'styled-components';

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

const Button = styled.button`
    font-size: 2.25rem;
`;

const Select = styled.select`
    font-size: 2.25rem;
`;

export { Button, PageTitle, Select };
