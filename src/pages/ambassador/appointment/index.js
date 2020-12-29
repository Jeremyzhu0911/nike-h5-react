import React, {Component} from "react";

import HeaderClose from "../../../components/headerClose";

import "../../../assets/css/pages/ambassador/appointment/style.css";

class Index extends Component{
    constructor(props) {
        super(props);
        this.state = {
            storeName: '填写预约信息',
            jordan:1
        }
        this.bundhankClick = this.bundhankClick.bind(this);
    }
    bundhankClick () {
        this.props.history.push({ pathname: '/success', state: { name: 'sunny' } })
    }
    render() {
        return (
            <div className="appointment">
                <HeaderClose datas={this.state}/>
                <div className={'appointment_time'}>
                    <h4>选择预约时间</h4>
                    <ul>
                        <li>
                            <p>周四</p>
                            <p>2020/12/24</p>
                        </li>
                        <li>
                            <p>周四</p>
                            <p>2020/12/24</p>
                        </li>
                        <li>
                            <p>周四</p>
                            <p>2020/12/24</p>
                        </li>
                    </ul>
                    <ul className={'hr'}>
                        <li className={'on'}/>
                        <li/>
                        <li/>
                    </ul>
                </div>
                <div className={'time_list'}>
                    <h4>下午<span className={'iconfont icon-shrink'}/><span className={'iconfont icon-spreadOut'}/></h4>
                    <ul>
                        <li>
                            <p>13:00 - 13:30</p>
                        </li>
                        <li>
                            <p>13:00 - 13:30</p>
                        </li>
                        <li>
                            <p>13:00 - 13:30</p>
                        </li>
                        <li>
                            <p>13:00 - 13:30</p>
                        </li>
                        <li>
                            <p>13:00 - 13:30</p>
                        </li>
                    </ul>
                </div>

                <div className={'addInfo'}>
                    <h4>填写个人信息</h4>
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
                <div className={'texts'}>如您无法正常收到短信验证码，请点击微信菜单“个人服务-在线客服”留言进行询问</div>
                <div className={'order'}>
                    <div className="btn" onClick={this.bundhankClick}>
                        提交预约申请
                    </div>
                </div>
            </div>
        )
    }
}

export default Index;
