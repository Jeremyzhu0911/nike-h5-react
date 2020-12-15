import React from 'react';
import {render} from 'react-dom';
import {HashRouter} from 'react-router-dom';
import App from './router/index';
import reportWebVitals from './reportWebVitals';

//解决移动端300毫秒延迟
const FastClick = require('fastclick');
FastClick.attach(document.body);


render(
        <HashRouter basename="/historical-record">
            <App/>
        </HashRouter>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
