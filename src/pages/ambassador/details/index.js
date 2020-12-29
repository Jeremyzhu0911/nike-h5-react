import React, {Component} from "react";

import "../../../assets/css/pages/ambassador/details/style.css";
import img from "../../../assets/images/image_160074378798579956.jpeg";

class index extends Component{
    constructor(props) {
        super(props);
        this.bundhankClick = this.bundhankClick.bind(this);
    }
    bundhankClick () {
        this.props.history.push({ pathname: '/appointment', state: { name: '专家预约' } })
    }
    render() {
        return (
            <div className="Ambassadordetails">
                <h2>上海长宁来福士Nike体验店</h2>
                <div className={'content'}>
                    <h4>BenJming</h4>
                    <h5>大使klad</h5>
                    <div className={'big_img'}>
                        <img alt={''} src={img}/>
                    </div>
                    <div className={'paragraph'}>
                        <p>
                            跑步是我的工作，更是我的热情。若您在店铺看到我，欢迎一起聊一聊下一个PB目标。 跑步教会我自律，克制，永不放弃，死磕到底。最好的跑步，就是在一个陌生的地方，发现一种久违的感动。独自跑步，不受羁绊，没有约束。有一天，穿上跑鞋，带上自己，有多远，跑多远。
                            Hi~我是William, 作为店铺的跑步大使，欢迎各位预约我的一对一服务，和我聊聊你的跑步故事，找到最适合你的跑步装备。
                        </p>
                        <span>展开+</span>
                    </div>
                </div>
                <div className={'img_list'}>
                    <ul>
                        <li>
                            <img alt={''} src={img}/>
                        </li>
                        <li>
                            <img alt={''} src={img}/>
                        </li>
                        <li>
                            <img alt={''} src={img}/>
                        </li>
                        <li>
                            <img alt={''} src={img}/>
                        </li>
                        <li>
                            <img alt={''} src={img}/>
                        </li>
                        <li>
                            <img alt={''} src={img}/>
                        </li>
                        <li>
                            <img alt={''} src={img}/>
                        </li>
                    </ul>
                    <span>展开+</span>
                </div>
                <div className={'order'}>
                    <div className="btn" onClick={this.bundhankClick}>
                        提交
                    </div>
                </div>
            </div>
        )
    }
}

export default index;
