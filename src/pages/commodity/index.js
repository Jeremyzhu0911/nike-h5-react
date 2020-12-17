import React from "react";
import Index from "../../components/rotationbigimg";

import "../../assets/css/pages/commodity/style.css";

function CommodityIndex() {

    return (
        <div className="CommodityIndex">
            <h2>上海长宁来福士NIKE体验店</h2>
            <Index/>
            <h1>店铺新品<span>全部主推产品</span></h1>
            <Index/>
        </div>
    );
}

export default CommodityIndex;
