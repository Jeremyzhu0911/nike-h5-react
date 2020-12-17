import React, {Component} from "react";
import "../../../assets/css/pages/limit/details/style.css";
import img from "../../../assets/images/sp.jpg";
import tb from "../../../assets/images/tb.jpg";

class index extends Component {
    render (){
        return (
            <div className="Limit_details">
                <h2>上海长宁来福士NIKE体验店</h2>
                <div className="CommodityDetails">
                    <div className="commodityTitle">
                        限量发售
                    </div>
                    <div className="commodityName">
                        Air Jordan VI Retro
                    </div>
                    <div className="commodityImg">
                        <img alt={''} src={img}/>
                    </div>
                    <div className="commodityText">
                        此款女子专属，采用了多种色彩和不同材料，以黑白灰三色作为主色调，鞋面采用透明拼接设计，结合富有质感的翻毛材质以及深灰色皮革。<br/>
                        细节部分，经典的弹性鞋带扣；后跟提环和中底均采用半透明水晶底设计，同时还附带了一块 Jumpman 金属吊牌。
                    </div>
                    <div className="Img100">
                        <img alt={''} src={tb}/>
                    </div>
                    <div className="commodityTimes">
                        <div className="title">活动时间</div>
                        <div className="timeArea">
                            <p>报名时间</p>
                            <div className="time">
                                2020-10-14 10:00
                            </div>
                        </div>
                        <div className="timeArea">
                            <p>报名结束</p>
                            <div className="time">
                                2020-10-14 10:00
                            </div>
                        </div>
                        <div className="timeArea">
                            <p>结果公示</p>
                            <div className="time">
                                2020-10-15 15:00
                            </div>
                        </div>
                        <div className="timeArea">
                            <p>到店签到</p>
                            <div className="time">
                                2020-10-16 15:00
                            </div>
                        </div>
                    </div>
                    <div className="btn">
                        下一步
                    </div>
                </div>
            </div>
        )
    }

}

export default index;
