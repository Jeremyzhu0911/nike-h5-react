import React from "react";
import "./style.less";

function Limitsuccess() {
    return (
        <div className="limitedSalesSuccessWrap">
            <div className="topArea">
                <i className="iconfont icon-rili"/>
                <h2>报名成功</h2>
            </div>
            <div className="notice">
                <div className="noticeTitle">
                    结果公布时间
                </div>
                <div className="noticeTime">
                    2020-08-20 18:00
                </div>
            </div>
            <div className="scanWrap">
                <div className="scanWrapTop">
                    即刻扫描二维码，关注店铺微信公众号<br/>
                    预约结果将通过微信及时告知您
                </div>
                <div className="scanWrapMiddle">
                    <img src={"assets/images/Image-1.jpg"} alt={''}/>
                </div>
                <div className="scanWrapBottom">
                    您也可以在公众号菜单中点击"我的预约"，查看预约结果。<br/>
                    友情提醒：未关注公众号的小伙伴将无法获得预约结果哦！
                </div>
            </div>
        </div>
    );
}

export default Limitsuccess;
