import React from "react";
import cookie from "react-cookies";
import {getUrlData} from "../../util/getUrlData";

const LimitSuccess = (props) => {

    return (
        <div className={parseInt(getUrlData("jordan")) === 1 ? "LimitSuccess jordan" : "LimitSuccess"}>
            <div className="topArea">
                <i className="iconfont icon-rili"/>
                <h2>报名成功</h2>
            </div>
            <div className="time-box">
                <p>
                    结果公布时间<br/>
                    <span>{cookie.load('result_time')}</span>
                </p>
            </div>
            <p className="tipsWechat">即刻扫描二维码，关注店铺微信公众号，<br/>预约结果将通过微信及时告知您。</p>
            <div className="emm">
                <img src={cookie.load('qrcode_url')} alt={''}/>
            </div>
            <p className="help">您也可以在公众号菜单中点击“我的预约”，查看预约结果。<br/>友情提醒：未关注公众号的小伙伴将无法获得预约结果。</p>
        </div>
    )
}

export default LimitSuccess;
