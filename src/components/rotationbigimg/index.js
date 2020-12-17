import React, {Component} from 'react';
import "../../assets/css/components/rotationbigimg/style.css";
import img from "../../assets/images/Bitmap Copy.png";

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 0
        }
    }

    render() {
        return (
            <div id="RotationBigImg">
                <div className="carousel">
                    <div className="carousel-box">
                        <div className="carousel-item">
                            <img alt={''} src={img}/>
                        </div>
                        <div className="carousel-item">
                            <img alt={''} src={img}/>
                        </div>
                        <div className="carousel-item">
                            <img alt={''} src={img}/>
                        </div>
                    </div>
                </div>
                <div className="index-container">
                    <ul>
                        <li className={this.state.index === 0 ? 'selected' : ''}></li>
                        <li className={this.state.index === 1 ? 'selected' : ''}></li>
                        <li className={this.state.index === 2 ? 'selected' : ''}></li>
                    </ul>
                    <span>1/3</span>
                </div>
            </div>
        )
    }
}

export default Index;