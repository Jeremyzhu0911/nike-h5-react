import React,{Component} from "react";
import ListBigImgBox from "../../components/listbigimgbox";

import "../../assets/css/pages/limit/style.css";

class index extends Component{
    constructor(props) {
        super(props);
        this.state = {
            data:[
                {
                    title:"Air Jordan VI Retro Tech Chrome",
                    time:"10/21 上午10:00",
                    type: 0
                },
                {
                    title:"Air Zoom Tempo NEXT%",
                    time:"10/21 上午10:00",
                    type: 1
                }
            ],
            txt_type:[
                {name: "报名未开始", cls: "s_btn2", types: 0},
                {name: "参与报名", cls: "s_btn1", types: 1},
                {name: "已报名", cls: "s_btn1", types: 2},
                {name: "报名已结束", cls: "s_btn1", types: 3}
            ]
        };
    }
    render() {
        return (
            <div className="Limit_index">
                <h2>上海长宁来福士NIKE体验店</h2>
                <ListBigImgBox datas={this.state.data[0]} datas2={this.state.txt_type[0]}/>
                <ListBigImgBox datas={this.state.data[1]} datas2={this.state.txt_type[1]}/>
                <ListBigImgBox datas={this.state.data[1]} datas2={this.state.txt_type[2]}/>
                <ListBigImgBox datas={this.state.data[1]} datas2={this.state.txt_type[3]}/>
            </div>
        )
    }
}

export default index;
