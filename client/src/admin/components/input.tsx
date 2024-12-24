import styled from 'styled-components';

const inputFontSize = '2.25rem';

const NumberInput = styled.input.attrs(() => ({ type: 'number' }))`
    min-width: 0;
    font-size: ${inputFontSize};
`;

const TextInput = styled.input.attrs(() => ({ type: 'text' }))`
    min-width: 0;
    font-size: ${inputFontSize};
`;

export { NumberInput, TextInput };
