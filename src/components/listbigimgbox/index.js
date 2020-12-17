import React, {Component} from 'react';
import "../../assets/css/components/listbigimgbox/style.css";
import img from "../../assets/images/sp.jpg";

class Index extends Component {
    render() {
        let data = this.props.datas;
        let data2 = this.props.datas2;
        return (
            <div id="ListBigImgBox">
                <div className="content">
                    <div className="title">{data.title}</div>
                    <div className="time">{data.time}</div>
                    <div className="images">
                        <img alt={''} src={img}/>
                    </div>
                    <input type="submit" value={data2.name} className={"s_btn " + data2.cls}/>
                    <div className="down-icon iconfont icon-xiangxia"/>
                </div>
                {data2.types === 3 ?
                    <div className="mask"/> : null
                }
            </div>
        )
    }
}

export default Index;