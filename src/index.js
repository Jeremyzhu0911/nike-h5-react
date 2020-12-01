import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {HashRouter} from "react-router-dom";
import configureStore from "./store/configureStore";

//解决移动端300毫秒延迟
const FastClick = require('fastclick');
FastClick.attach(document.body);

const store = configureStore();

import AppContainer from './appContainer'

import './static/css/common.less'
import './static/css/font.less'

render(
    <Provider store={store}>
        <HashRouter basename="/">
            <AppContainer />
        </HashRouter>
    </Provider>,
    document.getElementById('root')
);
