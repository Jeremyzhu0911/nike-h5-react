import React, {Component} from "react";
import ListBigImgBox from "../../../components/ListBigImgBox";
import "../../../assets/css/Limitlist.css";

class Limitlist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data:[
                {
                    title:"Air Jordan VI Retro Tech Chrome",
                    time:"10/21 上午10:00",
                    type: 0
                }
            ],
            data2:[
                {
                    title:"Air Zoom Tempo NEXT%",
                    time:"10/21 上午10:00",
                    type: 1
                }
            ]
        };
    }

    render (){
        return (
            <div className="Limitlist">
                <h2>上海长宁来福士NIKE体验店</h2>
                <ListBigImgBox datas={this.state.data}/>
                <ListBigImgBox datas={this.state.data2}/>
            </div>
        )
    }
}

export default Limitlist;
