import React,{Component} from "react";

import Headers from "../../../components/headers";

import "../../../assets/css/pages/ambassador/success/style.css";
import img from "../../../assets/images/image_160074378798579956.jpeg";

class Index extends Component{
    constructor(props) {
        super(props);
        this.state = {
            storeName: '安捷达广州',
            jordan:1
        }
        // console.log(this.props.location.state.name)
    }
    render() {
        return (
            <div className="Ambassadorsuccess">
                <Headers datas={this.state}/>
                <h3>预约申请成功</h3>
                <div className={'userinfo'}>
                    <div className={'userimg'}>
                        <img alt={''} src={img}/>
                    </div>
                    <div className={'username'}>
                        <p>专属顾问<br/>
                            name</p>
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
                        查看我的预约
                    </div>
                    <div className="btn2">
                        返回顾问
                    </div>
                </div>
            </div>
        )
    }
}

export default Index;
