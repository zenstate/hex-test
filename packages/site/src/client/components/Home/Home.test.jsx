import React from 'react';
import { cleanup, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Home from './index';

jest.mock('../PhotoList', () => () => (<div data-testid='PhotoList' />));

describe('Home Component', () => {
    beforeEach(() => {
        cleanup();
        jest.clearAllMocks();
    })
    it('renders the header', () => {
        const { getByText } = render(<Home />);

        expect(getByText('Flickr Photo Stream')).toBeInTheDocument();
    });

    it('renders the PhotoList Component', () => {
        const { getByTestId } = render(<Home />);

        expect(getByTestId('PhotoList')).toBeInTheDocument();
    });
});