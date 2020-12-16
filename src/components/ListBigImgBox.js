import React, {Component} from 'react';
import "../assets/css/ListBigImgBox.css";
import img from "../assets/images/sp.jpg";

class ListBigImgBox extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        let data = this.props.datas;
        console.log(data)
        return (
            <div id="ListBigImgBox">
                <div className="title">Air Jordan VI Retro Tech Chrome</div>
                <div className="time">10/21 上午10:00</div>
                <div className="images">
                    <img alt={''} src={img}/>
                </div>
                <input type="submit" value="参与报名" className="s_btn s_btn1"/>
                <div className="mask"/>
            </div>
        )
    }
}

export default ListBigImgBox;