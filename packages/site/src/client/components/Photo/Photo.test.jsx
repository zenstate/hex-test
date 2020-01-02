import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import Photo from './index';

import '@testing-library/jest-dom/extend-expect';

const props = {
    photoUrl: 'https://example.com/foo.jpg',
    photoLink: 'https://example.com/images/foo',
    title: 'My Holiday Snap',
    authorName: 'Jane Doe',
    authorLink: 'https://example.com/jdoe',
    description: 'Here we go',
    tags: 'foo, bar, baz',
}
describe('Photo Component', () => {

    beforeEach(() => {
        cleanup();
        jest.clearAllMocks();
    });

    it('renders the photo with valid accessiblity descriptions', () => {
        const { getByTestId } = render(<Photo {...props} />);
        expect(getByTestId('Photo__Image')).toHaveStyle(`background-image: url(https://example.com/foo.jpg)`);
    });

    it('renders the description', () => {
        const { getByTestId } = render(<Photo {...props} />);
        expect(getByTestId('Photo__Description')).toHaveTextContent(props.description);
    });

    it('removes any html from the string', () => {
        const htmlDescription = '<a href="http://bad.example.com/">Go Here</a>';
        const { getByTestId } = render(<Photo {...props} description={htmlDescription} />);
        expect(getByTestId('Photo__Description')).toContainHTML('Go Here');
    });

    it('allows the user to click on the photo and go to its page on flickr', () => {
        const { getByTestId } = render(<Photo {...props} />);
        expect(
            getByTestId('Photo__Image').getAttribute("href")
        ).toEqual(props.photoLink);
    })

    it('renders a title containing links to the author and photo flickr pages', () => {
        const { getByTestId } = render(<Photo {...props} />);
        expect(getByTestId('Photo__Title')).toHaveTextContent('My Holiday Snap by Jane Doe');
        expect(getByTestId('Photo__AuthorLink')).toHaveAttribute('href', props.authorLink);
        expect(getByTestId('Photo__PhotoLink')).toHaveAttribute('href', props.photoLink);

    });

    it('renders a title containing links to the author and photo flickr pages if the photo is untitled', () => {
        const { getByTestId } = render(<Photo {...props} title={undefined} />);
        expect(getByTestId('Photo__Title')).toHaveTextContent('Untitled by Jane Doe');
        expect(getByTestId('Photo__AuthorLink')).toHaveAttribute('href', props.authorLink);
        expect(getByTestId('Photo__PhotoLink')).toHaveAttribute('href', props.photoLink);

    });
})