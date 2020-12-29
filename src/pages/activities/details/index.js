import React, {Component} from "react";

import "../../../assets/css/pages/activities/details/style.css";
import img from "../../../assets/images/sp.jpg";

class index extends Component{
    constructor(props) {
        super(props);
        this.bundhankClick = this.bundhankClick.bind(this);
    }
    bundhankClick () {
        this.props.history.push({ pathname: '/appointment', state: { name: '活动详情页跳转',type:'活动预约' } })
        console.log(this.props.history.location.state.type)
    }
    render() {
        return (
            <div className="ActivitiesDetails">
                <h2>门店活动详情</h2>
                <div className={'content'}>
                    <div className={'big_img'}>
                        <img alt={''} src={img}/>
                    </div>
                    <p>跑步活动</p>
                    <h1>长宁来福士社区跑</h1>
                    <p className={'time'}>活动时间：2020.12.20</p>
                </div>
                <div className={'const'}>
                    <h3>活动介绍</h3>
                    <p>活动介绍活动介绍活动介绍活动介绍活动介绍活动介绍活动介绍活动介绍活动介绍活动介绍</p>
                    <div className={'big_img'}>
                        <img alt={''} src={img}/>
                    </div>
                    <div className={'big_img'}>
                        <img alt={''} src={img}/>
                    </div>
                    <p>活动介绍活动介绍活动介绍活动介绍活动介绍活动介绍活动介绍活动介绍活动介绍活动介绍</p>
                    <div className={'tips'}>
                        活动时间：2020-21-21 - 11.11 22:22 <br/>
                        活动地点：上海市阿三块巨大的 <br/>
                        还不爱来报名还不爱来报名还不爱来报名还不爱来报名
                    </div>
                    <h3>活动信息</h3>
                    <div className={'txt'}>
                        <p>活动时间</p>
                        <p>2020/12/24</p>
                    </div>
                    <div className={'txt'}>
                        <p>门店地址</p>
                        <p>2020/12/24</p>
                        <span className={'iconfont icon-dingwei'}/>
                    </div>
                    <div className={'txt'}>
                        <p>报名截止时间</p>
                        <p>2020/12/24</p>
                    </div>
                    <div className={'txt'}>
                        <p>报名人数限制</p>
                        <p>2020/12/24</p>
                    </div>
                </div>
                <div className={'order'}>
                    <div className="btn" onClick={this.bundhankClick}>
                        预约活动
                    </div>
                </div>
            </div>
        )
    }
}

export default index;
