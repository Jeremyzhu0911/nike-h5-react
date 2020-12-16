import React from 'react';
import "../assets/css/RotationMinImg.css";
import img from "../assets/images/minImg.png";

class RotationMinImg extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            index: 0
        }
    }
    render() {

        return (
            <div id="RotationMinImg">
                <div className="carousel">
                    <div className="carousel-box">
                        <div className="carousel-item">
                            <img alt={''} src={img}/>
                            <h4>Nike Aero Swift</h4>
                            <p>¥ 899</p>
                        </div>
                        <div className="carousel-item">
                            <img alt={''} src={img}/>
                            <h4>Nike Aero Swift</h4>
                            <p>¥ 899</p>
                        </div>
                        <div className="carousel-item">
                            <img alt={''} src={img}/>
                            <h4>Nike Aero Swift</h4>
                            <p>¥ 899</p>
                        </div>
                        <div className="carousel-item">
                            <img alt={''} src={img}/>
                            <h4>Nike Aero Swift</h4>
                            <p>¥ 899</p>
                        </div>
                        <div className="carousel-item">
                            <img alt={''} src={img}/>
                            <h4>Nike Aero Swift</h4>
                            <p>¥ 899</p>
                        </div>
                        <div className="carousel-item">
                            <img alt={''} src={img}/>
                            <h4>Nike Aero Swift</h4>
                            <p>¥ 899</p>
                        </div>
                        <div className="carousel-item">
                            <img alt={''} src={img}/>
                            <h4>Nike Aero Swift</h4>
                            <p>¥ 899</p>
                        </div>
                        <div className="carousel-item">
                            <img alt={''} src={img}/>
                            <h4>Nike Aero Swift</h4>
                            <p>¥ 899</p>
                        </div>
                        <div className="carousel-item">
                            <img alt={''} src={img}/>
                            <h4>Nike Aero Swift</h4>
                            <p>¥ 899</p>
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

export default RotationMinImg;