import React, {Component} from "react";
import BigImg from "../../components/rotationbigimg";
import MinImg from "../../components/rotationminimg";

import "../../assets/css/pages/commodity/style.css";

class index extends Component{
    constructor(props) {
        super(props);
        this.bundhankClick = this.bundhankClick.bind(this);
    }
    bundhankClick () {
        this.props.history.push({ pathname: '/commodity/list', state: { name: 'sunny' } })
    }
    render() {
        return (
            <div className="CommodityIndex">
                <h2>上海长宁来福士NIKE体验店</h2>
                <BigImg/>
                <h1>店铺新品<span onClick={this.bundhankClick}>全部主推产品</span></h1>
                <MinImg/>
            </div>
        )
    }
}

export default index;
