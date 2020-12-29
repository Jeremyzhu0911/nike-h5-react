import React,{Component} from "react";

import "../../assets/css/pages/ambassador/style.css";
import img from "../../assets/images/image_160074378798579956.jpeg";

class index extends Component{
    constructor(props) {
        super(props);
        this.bundhankClick = this.bundhankClick.bind(this);
    }
    bundhankClick () {
        this.props.history.push({ pathname: '/details-ambassador', state: { name: 'sunny' } })
    }
    render() {
        return (
            <div className="AmbassadorContent">
                <h2>上海长宁来福士Nike体验店</h2>
                <div className={'list'}>
                    <ul className={"ul_align2"}>
                        <li className={'on'}>
                            <div className={'images'}>
                                <img alt={''} src={img}/>
                            </div>
                            <h4>name</h4>
                            <p>标签</p>
                        </li>
                        <li>
                            <div className={'images'}>
                                <img alt={''} src={img}/>
                            </div>
                            <h4>name</h4>
                            <p>标签</p>
                        </li>
                        <li>
                            <div className={'images'}>
                                <img alt={''} src={img}/>
                            </div>
                            <h4>name</h4>
                            <p>标签</p>
                        </li>
                        <li>
                            <div className={'images'}>
                                <img alt={''} src={img}/>
                            </div>
                            <h4>name</h4>
                            <p>标签</p>
                        </li>
                        <li>
                            <div className={'images'}>
                                <img alt={''} src={img}/>
                            </div>
                            <h4>name</h4>
                            <p>标签</p>
                        </li>
                        <li>
                            <div className={'images'}>
                                <img alt={''} src={img}/>
                            </div>
                            <h4>name</h4>
                            <p>标签</p>
                        </li>
                    </ul>
                </div>
                <div className={'synopsis'} onClick={this.bundhankClick}>
                    <div className={'images'}>
                        <img alt={''} src={img}/>
                    </div>
                    <h4>name</h4>
                    <p>标签 <span>了解详情</span></p>
                </div>
            </div>
        )
    }
}

export default index;
