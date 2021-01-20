import React, {useState, useEffect} from "react";
import img from "../../assets/images/Image-1.jpg";

const LimitSuccess = (props) => {

    console.log(props)

    return (
        <div className="LimitSuccess">
            <div className="topArea">
                <i className="iconfont icon-rili"/>
                <h2>报名成功</h2>
            </div>
            <div className="time-box">
                <p>
                    结果公布时间<br/>
                    <span>
                        2020-08-20 18:00
                        </span>
                </p>
            </div>
            <p className="tips">即刻扫描二维码，关注店铺微信公众号，<br/>预约结果将通过微信及时告知您。</p>
            <div className="emm">
                <img src={img} alt={''}/>
            </div>
            <p className="tips2">您也可以在公众号菜单中点击“我的预约”，查看预约结果。<br/>友情提醒：未关注公众号的小伙伴将无法获得预约结果。</p>
        </div>
    )
}

export default LimitSuccess;
