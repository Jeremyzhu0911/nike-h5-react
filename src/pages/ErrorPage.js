import React,{Component} from "react";

import logo from "../assets/images/logo/logo.svg";

class ErrorPage extends Component{
    constructor(props){
        super(props);
        this.error_type = '';
        console.log(this.error_type)
    }
    render() {
        let txt = '很抱歉';
        let txt2;
        switch (this.error_type){
            case 'activities':
                txt2 = '您访问的活动已下线';
                break;
            case 'ambassador':
                txt2 = '您查看的顾问不存在';
                break;
            case 'limit':
                txt2 = '您访问的活动已下线';
                break;
            case '500':
                txt = 'opoos!!!';
                txt2 = '网络有点慢，请稍后重试~';
                break;
            case '404':
                txt2 = '您访问的页面不存在';
                break;
            default:
                break;
        }
        return (
            <div className="error_page">
                <img className="logo" alt={''} src={logo}/>
                <div className="txt-box">
                    <h1>{txt}</h1>
                    <p>{txt2}</p>
                </div>
            </div>
        )
    }
}

export default ErrorPage;
