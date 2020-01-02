import React from 'react';
import PhotoList from '../PhotoList';
import s from './Home.scss';

export default () => (
    <>
        <header className={`nav justify-content-center ${s.header}`}>
            <h1>Flickr Photo Stream</h1>
        </header>
        <div className={s.photoListContainer}>
            <PhotoList />
        </div>
    </>
);
