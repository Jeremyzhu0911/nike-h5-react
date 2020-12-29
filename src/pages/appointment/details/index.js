import React, {Component} from "react";
import Headers from "../../../components/headers";

import "../../../assets/css/pages/appointment/details/style.css";
import img from "../../../assets/images/image_160074378798579956.jpeg";

class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            storeName: '安捷达广州',
            jordan: 1
        }
        // console.log(this.props.location.state.name)
    }

    render() {
        return (
            <div className="appointment_details">
                <Headers datas={this.state}/>
                <h3>预约试穿 <span>已接受</span></h3>
                <div className={'appointment_content'}>
                    <div className={'appointment_img'}>
                        <img alt={''} src={img}/>
                    </div>
                    <div className={'appointment_info'}>
                        <p>
                            专属顾问专属顾问专属顾问专属顾问<br/>
                        </p>
                        <p className={'appointment_spit'}>
                            <span>建议零售价&nbsp;&nbsp;&nbsp;¥ 1399</span><br/>
                            <span className={'ccc'}>9.5码</span>
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
                <div className={'txt'}>
                    <p>预留信息</p>
                    <p>2020/12/24</p>
                </div>
                <div className={'order'}>
                    <div className="btn">
                        展示二维码
                    </div>
                    <div className="btn2">
                        取消预约
                    </div>
                </div>
            </div>
        )
    }
}

export default index;
