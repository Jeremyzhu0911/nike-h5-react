import React,{Component} from "react";
import img from "../../assets/images/sp.jpg";

class CommodityAppointment extends Component{
    constructor () {
        super(...arguments);
        this.state = {
            isEmptyState: true
        }
    }
    triggerAddTripState = () => {
        this.setState({
            ...this.state,
            isEmptyState: !this.state.isEmptyState
        })
    }
    goto_page = () => {
        this.props.history.push({ pathname: '/success', state: { name: 'sunny' } })
    }
    render() {
        return (
            <div className="CommodityAppointment">
                {
                    this.state.isEmptyState ? <div className={'information'}>
                        <div className={"big_title"}>
                            填写预约信息
                            <span>取消</span>
                        </div>
                        <div className={'content'}>
                            <h3>选择颜色</h3>
                            <p>已选：CT6619-010</p>
                            <div className={'content_img'}>
                                <img alt={''} src={img}/>
                            </div>
                        </div>
                        <div className={'footage'}>
                            <h3>选择尺码</h3>
                            <ul>
                                <li>10C</li>
                                <li>10.5C</li>
                                <li>10C</li>
                                <li>10.5C</li>
                                <li>10C</li>
                                <li>10.5C</li>
                            </ul>
                        </div>
                        <div className={'choice_time'}>
                            <h3>选择来店日期</h3>
                            <select className="opt-datetime">
                                <option value="2020-12-30">2020-12-30</option>
                                <option value="2020-12-31">2020-12-31</option>
                                <option value="2021-01-01">2021-01-01</option>
                            </select>
                        </div>
                        <div className={'btn_box'}>
                            <div className={'btn'} onClick={this.triggerAddTripState}>
                                下一步
                            </div>
                        </div>
                    </div> : <div className={'infoForm'}>
                        <div className={"big_title"}>
                            完善个人信息
                            <span onClick={this.triggerAddTripState}>上一步</span>
                        </div>
                        <h6>如您无法正常收到短信验证码，请点击微信菜单“个人服务-在线客服”留言进行询问</h6>
                        <div className={'addInfo'}>
                            <ul>
                                <li>
                                    <input type={'text'}  placeholder="您的姓名"/>
                                </li>
                                <li className={'mobile'}>
                                    <input type={'tel'}  placeholder="手机号"/>
                                    <span>获取验证码</span>
                                </li>
                                <li>
                                    <input type={'num'}  placeholder="请输入验证码"/>
                                </li>
                            </ul>
                        </div>
                        <div className={'gender'}>
                            <h4>称呼</h4>
                            <ul>
                                <li className={'on'}><p>先生</p></li>
                                <li><p>女士</p></li>
                            </ul>
                        </div>
                        <div className={'tips'}>
                            <p>同意隐私信息授权条款</p>
                            <span>按钮</span>
                        </div>
                        <div className={'order'}>
                            <div className="btn" onClick={this.goto_page}>
                                提交预约申请
                            </div>
                        </div>
                        <div className={'texts'}>预约信息提交后将无法更改，请确认信息内容后进行提交。</div>
                    </div>
                }


            </div>
        )
    }
}

export default CommodityAppointment;
