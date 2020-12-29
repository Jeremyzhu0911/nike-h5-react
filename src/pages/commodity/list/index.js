import React, {Component} from "react";
import Headers from "../../../components/headers";

import "../../../assets/css/pages/commodity/list/style.css";
import img from "../../../assets/images/image_160074378798579956.jpeg";

class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchList: [
                {'id': "gender", 'name': '款式', 'list': [{'id': 'mens', 'click': false, 'name': '男士'},{'id': 'mens', 'click': false, 'name': '男士'},{'id': 'mens', 'click': false, 'name': '男士'},{'id': 'mens', 'click': false, 'name': '男士'},{'id': 'mens', 'click': false, 'name': '男士'}]},
                {'id': "gender", 'name': '类型', 'list': [{'id': 'mens', 'click': false, 'name': '鞋类'}]}
            ],
            storeName: '安捷达广州',
            header_type: 'home'
        }
        this.bundhankClick = this.bundhankClick.bind(this);
    }

    bundhankClick() {
        this.props.history.push({pathname: '/commodity/details', state: {name: 'sunny'}})
    }

    render() {
        return (
            <div className="CommodityList">
                <Headers datas={this.state}/>
                <div className={'resultHeader'}>
                    <h2>门店当季产品<br/><span>共8件商品</span></h2>
                    <div className={'btn_search'}>筛选</div>
                </div>
                <ul className={'list'}>
                    <li onClick={this.bundhankClick}>
                        <div className={'CommodityListImages'}>
                            <img alt={''} src={img}/>
                        </div>
                        <h5>阿就是打开觉得很愧疚啊</h5>
                        <p>建议零售价 ¥ 299</p>
                    </li>
                    <li>
                        <div className={'CommodityListImages'}>
                            <img alt={''} src={img}/>
                        </div>
                        <h5>阿就是打开觉得很愧疚啊</h5>
                        <p>建议零售价 ¥ 299</p>
                    </li>
                    <li>
                        <div className={'CommodityListImages'}>
                            <img alt={''} src={img}/>
                        </div>
                        <h5>阿就是打开觉得很愧疚啊</h5>
                        <p>建议零售价 ¥ 299</p>
                    </li>
                    <li>
                        <div className={'CommodityListImages'}>
                            <img alt={''} src={img}/>
                        </div>
                        <h5>阿就是打开觉得很愧疚啊</h5>
                        <p>建议零售价 ¥ 299</p>
                    </li>
                </ul>
                <div className={'overlay'}>
                    <h2>筛选产品<span>关闭</span></h2>
                    <div className={'filterSearch'}>
                        <input type={'txt'} placeholder="关键字搜索"/>
                    </div>
                    {
                        this.state.searchList.map((item, index) => {
                            return <div className={'filterItems'} key={index}>
                                        <h3>{item.name}</h3>
                                        <ul>
                                            {
                                                item.list.map((item,index) =>{
                                                    return <li key={index}>{item.name}</li>
                                                })
                                            }
                                        </ul>
                                   </div>
                        })
                    }
                    <div className={'filterBtnWrap'}>
                        <div className={'btn_full'}>显示筛选结果</div>
                    </div>
                </div>
            </div>
        )
    }
}

export default index;
