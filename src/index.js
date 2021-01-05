import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux'
import {HashRouter} from 'react-router-dom';

import configUseStore from './store/configUseStore';

import App from './router/index';
import reportWebVitals from './reportWebVitals';

const store = configUseStore();

//解决移动端300毫秒延迟
const FastClick = require('fastclick');
FastClick.attach(document.body);

render(
    <Provider store={store}>
        <HashRouter>
            <App/>
        </HashRouter>
    </Provider>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
