import React, {Component} from "react";

import "../../assets/css/HistoricalRecord.css";
import l from "../../assets/images/record/l.png";
import l1 from "../../assets/images/record/l (1).png";
import gou from "../../assets/images/record/gou.png";
import gou1 from "../../assets/images/record/gou1.png";
import loading_gif from "../../assets/images/circle-transparent.gif";

class Historical extends Component {
    constructor(props) {
        super(props);
        this.state = 0;
        this.isAj = false;
        this.iphone = "177****9523";
        this.testing_txt = "发送"; //60秒重新发送
        this.btnYes = "返回";
        this.btnNo = "取消";
        this.btnboolean = false;
        this.dataList = {type_name: "aaaa", title: "标题", booking_time: "2002年"};
    }

    render() {
        return (
            <div className="Historical">
                <div className="section">
                    {this.state !== 6 ?
                        <div className="histirucal-img">
                            <img className="img" alt={''} src={
                                this.isAj ?
                                    this.state !== 5 ? l1 : gou1
                                    :
                                    this.state !== 5 ? l : gou
                            }/>
                        </div> : null
                    }
                    {this.state === 0 ?
                        <h1>您暂无历史记录</h1> :
                        this.state === 1 ?
                            <h1>无法删除</h1> :
                            this.state === 2 ?
                                <h1>请求处理中</h1> :
                                this.state === 3 || this.state === 4 ?
                                    <h1>历史记录删除请求</h1> :
                                    this.state === 5 ?
                                        <h1>申请成功</h1> : null
                    }
                </div>
                {this.state === 0 ?
                    <div className="histirucal-state0 p-d-t">历史记录包含：您在本门店的预约记录，留言记录，活动参与记录。</div> : null
                }
                {this.state === 3 ?
                    <div className="histirucal3">您确认要删除历史记录吗？</div> : null
                }
                {this.state === 3 ?
                    <div className="histirucal-state0">
                        历史记录包含：您在本门店的预约记录，留言记录，活动参与记录。此请求一旦完成，不可恢复，请谨慎操作。
                    </div> : null
                }
                <div className="histirucal-box">
                    {this.state === 1 ?
                        <p>
                            您有如下预约尚未完成
                            <br/>如需删除所有历史记录
                            <br/>请在完成所有预约后再次联系客服人员
                        </p> :
                        this.state === 2 ?
                            <p>
                                您的历史记录删除请求正在处理中
                                <br/>完成后将会以短信的形式通知您
                                <br/>请耐心等待结果
                            </p> :
                            this.state === 4 ?
                                <p className="state4">
                                    请确认以下是否为本人手机号
                                    <br/>若非本人手机号，则无权限删除该用户的历史记录
                                </p> :
                                this.state === 5 ?
                                    <p className="state4">
                                        您的历史记录删除请求已提交
                                        <br/>完成后将会以短信的形式通知您
                                        <br/>请耐心等待结果
                                    </p> : null
                    }
                    {this.state === 1 ?
                        <h2>未完成的预约记录</h2> :
                        this.state === 4 ?
                            <div className="mobile_phone">
                                <span>手机号</span>
                                <span>{this.iphone}</span>
                            </div> : null
                    }
                    {this.state === 1 ?
                        <ul>
                            {/*{*/}
                            {/*    this.dataList.map((item, index) => {*/}
                            {/*        return <li key={index}>*/}
                            {/*            <h4>{item.type_name}</h4>*/}
                            {/*            <h3>{item.title}</h3>*/}
                            {/*            <span>{item.booking_time}</span>*/}
                            {/*        </li>*/}
                            {/*    })*/}
                            {/*}*/}
                            <li>
                                <h4>名字</h4>
                                <h3>title</h3>
                                <span>2002.2.2</span>
                            </li>
                        </ul> :
                        this.state === 4 ?
                            <div className="mobile_phone">
                                <span>验证码</span>
                                <span className="testing_ck">{this.testing_txt}</span>
                                <input
                                    type="text"
                                    id="mobile-testing"
                                    className="testing"
                                    placeholder
                                    maxLength="6"
                                />
                            </div> : null
                    }
                </div>
                {this.state === 4 ?
                    <div className="histirucal-state0"
                    >历史记录包含：您在本门店的预约记录，留言记录，活动参与记录。此请求一旦完成，不可恢复，请谨慎操作。
                    </div> : null
                }
                {
                    this.state !== 6 ?
                        <div className="fixbtn-box">
                            <button className="bttn btn-yes">{this.btnYes}</button>
                            {this.btnboolean ?
                                <button className="bttn btn-no">{this.btnNo}</button>:null
                            }
                        </div> : null
                }
                {
                    this.state === 6 ?
                        <div className="loading">
                            <img className="icon" src={loading_gif} alt={''}/>
                            <p className="tip">加载中</p>
                        </div> : null
                }
            </div>
        );
    }
}

export default Historical;
