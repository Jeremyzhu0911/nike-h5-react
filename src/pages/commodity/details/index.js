import React,{Component} from "react";
import Headers from "../../../components/headers";

import "../../../assets/css/pages/commodity/details/style.css";
import img from "../../../assets/images/sp.jpg";

class index extends Component{
    constructor(props) {
        super(props);
        this.state = {
            storeName: '安捷达广州',
            header_type: 'details'
        }
        this.bundhankClick = this.bundhankClick.bind(this);
    }
    bundhankClick() {
        this.props.history.push({pathname: '/commodity/appointment', state: {name: 'sunny'}})
    }
    render() {
        return (
            <div className="CommodityDetails">
                <Headers datas={this.state}/>
                <div className={'big_title'}>
                    <span>Nike F.C.男子足球T恤</span>
                    建议零售价<br/>¥ 229
                </div>
                <div className={'big_image'}>
                    <ul>
                        <li><img alt={''} src={img}/></li>
                        <li><img alt={''} src={img}/></li>
                        <li><img alt={''} src={img}/></li>
                    </ul>
                </div>
                <div className={'small_image'}>
                    <ul>
                        <li><img alt={''} src={img}/></li>
                    </ul>
                </div>
                <div className={'briefly'}>
                    <h3>商品简介</h3>
                    <div className={'briefly_content'}>
                        <p>敬请注意，同款但不同配色的商品有可能在材质等方面有些许差异，本页面中的商品介绍内容及建议零售价仅供参考，商品具体信息请以门店实物展示为准。</p>
                    </div>
                </div>
                <div className={'btn_box'}>
                    <ul>
                        <li onClick={this.bundhankClick}>预留产品</li>
                        <li onClick={this.bundhankClick}>预约试穿</li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default index;
