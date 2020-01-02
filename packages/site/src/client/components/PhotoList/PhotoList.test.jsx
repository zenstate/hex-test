import React from 'react';
import { cleanup, render, act, fireEvent } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import fs from 'fs';
import axios from 'axios';
import PhotoList from './index';

import '@testing-library/jest-dom/extend-expect';

const sampleFeedData = {
    stat: 'ok',
    photos: {
        page: 1,
        pages: 10,
        perpage: 100,
        total: 1000,
        photo: [{
            farm: 66,
            height_sq: 75,
            id: "49203955909",
            isfamily: 0,
            isfriend: 0,
            ispublic: 1,
            owner: "184148999@N06",
            ownername: "muiryearbook2020",
            pathalias: null,
            secret: "e8dbe992ae",
            server: "65535",
            title: "Mpyd",
            url_m: "https://live.staticflickr.com/65535/49203955908_e8dbe992ae_s.jpg",
            width_sq: 75,
            tags: "",
        }, {
            description: {
                _content: "We are going into a bit more special direction"
            },
            farm: 66,
            height_sq: 75,
            id: "49203957738",
            isfamily: 0,
            isfriend: 0,
            ispublic: 1,
            owner: "36927891@N05",
            ownername: "\"Orion Pax\"",
            pathalias: "orion_pax",
            secret: "cf68a4ef85",
            server: "65535",
            title: "Autobot Trainbot Yukikaze",
            url_m: "https://live.staticflickr.com/65535/49203957738_cf68a4ef85_s.jpg",
            width_sq: 75,
            tags: "",
        }],
    },
};

describe('Home Component', () => {
    let mock;
    beforeEach(() => {
        mock = new MockAdapter(axios);
        cleanup();
    })

    it('should call the flickr public stream', async () => {
        mock.onGet('https://www.flickr.com/services/rest/')
            .reply(200, sampleFeedData);
        let utils;
        await act(async () => {
            utils = await render(<PhotoList />);
        })
        expect(utils.queryAllByTestId('Photo')).toHaveLength(2);

    });

    it('should not render photos without a medium photo quality', async () => {
        mock.onGet('https://www.flickr.com/services/rest/')
            .reply(200, {
                stat: 'ok',
                photos: {
                    page: 1,
                    pages: 10,
                    perpage: 100,
                    total: 1000,
                    photo: [{
                        farm: 66,
                        height_sq: 75,
                        id: "49203955908",
                        isfamily: 0,
                        isfriend: 0,
                        ispublic: 1,
                        owner: "184148999@N06",
                        ownername: "muiryearbook2020",
                        pathalias: null,
                        secret: "e8dbe992ae",
                        server: "65535",
                        title: "Mpyd",
                        width_sq: 75,
                    }]
                }
            });
        let utils;
        await act(async () => {
            utils = await render(<PhotoList />);
        });

        expect(utils.queryAllByTestId('Photo')).toHaveLength(0);
    });

    it('should show a loading screen while the resources are being loaded', () => {
        mock = new MockAdapter(axios, {
            delayResponse: 2000,
        });
        mock.onGet('https://www.flickr.com/services/rest/')
            .reply(200, sampleFeedData);

        const { getByRole } = render(<PhotoList />);

        expect(getByRole('status')).toBeInTheDocument();

    });

    it('should show an error message with the option to try again if the api is not returng a 200 code', async () => {
        mock.onGet('https://www.flickr.com/services/rest/')
            .reply(503);

        let utils;
        await act(async () => {
            utils = await render(<PhotoList />);
        });

        expect(utils.queryByRole('status')).not.toBeInTheDocument();
        expect(utils.getByTestId('PhotoList__Error')).toBeInTheDocument();
        expect(utils.getByTestId('PhotoList__RetryLink')).toBeInTheDocument();
    });

    it('should attempt to reload the photo stream on clicking reload', async () => {
        mock.onGet('https://www.flickr.com/services/rest/')
            .replyOnce(503)
            .onGet('https://www.flickr.com/services/rest/')
            .reply(200, sampleFeedData);

        let utils;
        await act(async () => {
            utils = await render(<PhotoList />);
        });
        expect(mock.history.get).toHaveLength(1);
        await act(async () => {
            await fireEvent.click(utils.getByTestId('PhotoList__RetryLink'));
        });
        expect(mock.history.get).toHaveLength(2);

    });
});
