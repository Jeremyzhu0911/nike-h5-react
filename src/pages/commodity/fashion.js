import React from "react";

import "../../assets/css/CommodityFashion.css"
import RotationBigImg from "../../components/RotationBigImg";

function Fashion() {
    return (
        <div className="CommodityFashion">
            <h2>上海长宁来福士NIKE体验店</h2>

            <h1>初秋穿搭没灵感？复制就可以</h1>
            <h4>Nike Air Zoom Alphafly NEXT%</h4>
            <RotationBigImg/>
            <input type="submit" value="查看穿搭" className="s_btn"/>

            <h1>初秋穿搭没灵感？复制就可以</h1>
            <h4>Nike Air Zoom Alphafly NEXT%</h4>
            <RotationBigImg/>
            <input type="submit" value="查看穿搭" className="s_btn"/>

        </div>
    );
}

export default Fashion;
