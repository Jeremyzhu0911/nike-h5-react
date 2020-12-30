import React,{Component} from "react";

import "../../../assets/css/pages/appointment/luckydraw/style.css";
import img from "../../../assets/images/image_160074378798579956.jpeg";

class Index extends Component{
    render() {
        return (
            <div className="appointment_luckydraw">
                <div className={'luckydraw_box'}>
                    <h4>查看活动详情页 ></h4>
                    <div className={'luckydraw_img'}>
                        <img alt={''} src={img}/>
                        <div className={'luckydraw_txt'}>
                            <h3>学姐中大鞋</h3>
                            <p>11.5 <span>取消报名</span></p>
                        </div>
                    </div>
                </div>
                <ul className="info-ul">
                    <li>
                        <label>门店地址</label>
                        <span>广州市天河路230-232号万菱国际中心31层04-06单元</span>
                    </li>
                    {/*如果是已取消的，那么如下都没有*/}
                    <li>
                        <label>结果公布时间</label>
                        <span>infoData.time</span>
                    </li>
                </ul>
                <div className={'end_show'}>结果未公布</div>
                <div className={'order'}>
                    <div className={'btn'}>取消报名</div>
                </div>
                <div className={'confirm_again'}>
                    <h4>是否继续本次操作</h4>
                    <p>取消后不可撤回，如需恢复预约，请重新提交预约申请，是否继续本次操作</p>
                    <div className={'btn_box'}>
                        <span>继续</span>
                        <span>我再想想</span>
                    </div>
                </div>
            </div>
        )
    }
}

export default Index;
