import React from 'react';
import PhotoList from '../PhotoList';
import s from './Home.scss';

export default () => (
    <>
        <h1 className={s.header}>Flickr Photo Stream</h1>
        <div className={s.photoListContainer}>
            <PhotoList />
        </div>
    </>
);
