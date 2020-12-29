import React,{Component} from "react";

import "../../assets/css/pages/activities/style.css";
import img from "../../assets/images/sp.jpg";

class index extends Component{
    render() {
        return (
            <div className="ActivitiesContent">
                <h2>门店活动</h2>
                <div className={'content'}>
                    <h1>长宁来福士社区跑</h1>
                    <p>2020.12.20 跑步活动</p>
                    <div className={'big_img'}>
                        <img alt={''} src={img}/>
                    </div>
                    <div className={'btn'}>
                        <span>活动详情</span>
                    </div>
                    <div className={'page_top iconfont icon-xiangxia'}/>
                </div>
                <div className={'content'}>
                    <h1>长宁来福士社区跑</h1>
                    <p>2020.12.20 跑步活动</p>
                    <div className={'big_img'}>
                        <img alt={''} src={img}/>
                    </div>
                    <div className={'btn'}>
                        <span>活动详情</span>
                    </div>
                </div>
                <div className={'content'}>
                    <h1>长宁来福士社区跑</h1>
                    <p>2020.12.20 跑步活动</p>
                    <div className={'big_img'}>
                        <img alt={''} src={img}/>
                    </div>
                    <div className={'btn'}>
                        <span>活动详情</span>
                    </div>
                </div>

            </div>
        )
    }
}

export default index;
