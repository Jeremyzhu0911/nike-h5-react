import React, {useState, useEffect} from "react";

import {getUrlData} from "../util/getUrlData";

import logo from "../assets/images/logo/logo.svg";

const ErrorPage = (props) => {

    const [state, setState] = useState({
        txt: '很抱歉',
        txt2: '',
    })

    useEffect(() => {
        switch (props.location.pathname) {
            case '/Off':
                setState({
                    txt2: getUrlData('type', props.location.search) === 'ambassador'
                        ? '您查看的顾问不存在' : '您访问的活动已下线'
                });
                break;
            case '/500':
                setState({
                    txt: 'opoos!!!',
                    txt2: '网络有点慢，请稍后重试~'
                });
                break;
            case '/404':
                setState({
                    txt2: '您访问的页面不存在'
                });
                break;
            default:
                break;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[state.txt2])

    return (
        <div className="error_page">
            <img className="logo" alt={''} src={logo}/>
            <div className="txt-box">
                <h1>{state.txt}</h1>
                <p>{state.txt2}</p>
            </div>
        </div>
    )
}

export default ErrorPage;
