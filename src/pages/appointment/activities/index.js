import React,{Component} from "react";

import "../../../assets/css/pages/appointment/activities/style.css";
import MinImg from "../../../components/rotationminimg";

import img from "../../../assets/images/minImg.png";

class index extends Component{
    render() {
        return (
            <div className="activities">
                <h2>我的活动</h2>
                <div className={'content'}>
                    <h5>暂无参与记录</h5>
                    <h4>跑步活动</h4>
                    <MinImg/>
                    <h4>跑步活动</h4>
                    <MinImg/>
                    <h4>跑步活动</h4>
                    <MinImg/>
                    <h4>跑步活动</h4>
                    <MinImg/>
                    <h4>为您推荐</h4>
                    <div className={'list_recommend'}>
                        <div className={'list_box'}>
                            <div className={'list_img'}>
                                <img alt={''} src={img}/>
                            </div>
                            <h3>title</h3>
                            <p>¥ 899</p>
                        </div>
                        <div className={'list_box'}>
                            <div className={'list_img'}>
                                <img alt={''} src={img}/>
                            </div>
                            <h3>title</h3>
                            <p>¥ 899</p>
                        </div>
                        <div className={'list_box'}>
                            <div className={'list_img'}>
                                <img alt={''} src={img}/>
                            </div>
                            <h3>title</h3>
                            <p>¥ 899</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default index;
