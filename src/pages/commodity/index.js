import React from "react";
import RotationBigImg from "../../components/RotationBigImg";
import RotationMinImg from "../../components/RotationMinImg";

import "../../assets/css/CommodityIndex.css";

function CommodityIndex() {

    return (
        <div className="CommodityIndex">
            <h2>上海长宁来福士NIKE体验店</h2>
            <RotationBigImg/>
            <h1>店铺新品<span>全部主推产品</span></h1>
            <RotationMinImg/>
        </div>
    );
}

export default CommodityIndex;
