// import fetchJsonp from 'fetch-jsonp';
import axios from 'axios';
import { FLICKR_API_KEY } from '../../../../../config';

// Note I've ommitted unit tests for this function, it relies heavily on third party code
// and is better tested at an integration test level.
// const getPosts = (successCallback = () => { }, failureCallback = () => { }) => {
//     fetchJsonp("https://api.flickr.com/services/feeds/photos_public.gne?format=json", {
//         jsonpCallbackFunction: 'jsonFlickrFeed'
//     }).then(response => response.json())
//         .then(resp => successCallback(resp))
//         .catch(error => failureCallback(error));
// }

const getPosts = ({
    successCallback = function () { },
    failureCallback = function () { },
    extras = [
        'owner_name',
        'description',
        'path_alias',
        'url_sq',
        'tags',
        'url_m',
        'url_l',
        'url_t'
    ],
    page = 1,
    per_page = 15
} = {}) => {
    let reqExtras;
    if (typeof extras === 'object') {
        reqExtras = extras.join(',');
    }
    axios.get('https://www.flickr.com/services/rest/', {
        params: {
            method: 'flickr.photos.getRecent',
            format: 'json',
            nojsoncallback: '1',
            api_key: FLICKR_API_KEY,
            extras: reqExtras,
            page,
            per_page,
            safe_search: 1,
        },
    }).then(resp => {
        if (resp.data.stat === 'ok') {
            successCallback(resp.data.photos);
            return;
        }
        failureCallback(resp);
    }).catch(failureCallback);
};

export default getPosts;