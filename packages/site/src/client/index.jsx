import "core-js/stable";
import "regenerator-runtime/runtime";
import React from 'react';
import ReactDOM from 'react-dom';
import Home from './components/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import './scss/index.scss';

ReactDOM.render(
    <Home />,
    document.querySelector('#root'),
);
