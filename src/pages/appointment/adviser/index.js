import React, {Component} from "react";
import Headers from "../../../components/headers";

import "../../../assets/css/pages/appointment/adviser/style.css";
import img from "../../../assets/images/image_160074378798579956.jpeg";

class Index extends Component{
    constructor(props) {
        super(props);
        this.state = {
            storeName: '上海太古汇Nike KICKS LOUNGE(安捷达)',
            jordan: 1
        }
        // console.log(this.props.location.state.name)
    }
    render() {
        return (
            <div className="appointment_adviser">
                <Headers datas={this.state}/>
                <h3>
                    专属顾问预约
                    <span>已结束</span>
                </h3>
                <div className={'appointment_content'}>
                    <div className={'appointment_img'}>
                        <img alt={''} src={img}/>
                    </div>
                    <div className={'appointment_info'}>
                        <p>
                            <span>专属顾问</span><br/>
                            William Zhao
                        </p>
                    </div>
                </div>
                <div className={'txt'}>
                    <p>预约时间</p>
                    <p>2020/12/24</p>
                </div>
                <div className={'txt'}>
                    <p>门店地址</p>
                    <p>2020/12/24</p>
                    <span className={'iconfont icon-dingwei'}/>
                </div>
                <div className={'order'}>
                    <div className={'btn'}>评价服务</div>
                </div>
            </div>
        )
    }
}

export default Index;
