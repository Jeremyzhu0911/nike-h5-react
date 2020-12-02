import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'lib-flexible';
import "@/assets/css/reset.css";
import "@/assets/font/iconfont.css";

//解决移动端300毫秒延迟
let FastClick = require('fastclick')
FastClick.attach(document.body)

ReactDOM.render(
    <App />,
  document.getElementById('root')
);

