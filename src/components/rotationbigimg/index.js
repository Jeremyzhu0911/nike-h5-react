import React, {useState, useEffect} from 'react';
import "../../assets/css/components/rotationbigimg/style.css";
import img from "../../assets/images/Bitmap Copy.png";

const Index = (props) => {

    const [indexCount, setIndexCount] = useState({
        index: 0
    })

    useEffect(()=>{
        setIndexCount({...indexCount, index:indexCount.index})
    },[indexCount.index])

    console.log(props)

    return (
        <div className={props.data.isAj ? "RotationBigImg jordan":"RotationBigImg"}>
            <div className="carousel">
                <div className="carousel-box">
                    {
                        props.data.listAll.map((item, index) => {
                            return <div className="carousel-item" key={index}>
                                <img alt={''} onClick={()=>{setIndexCount({...indexCount, index:index})}} src={item.image_path}/>
                            </div>
                        })
                    }
                </div>
            </div>
            <div className="index-container">
                <ul>
                    {
                        props.data.listAll.map((item, index) => {
                            return <li className={index === indexCount.index ? 'selected' : ''} style={{width:100/props.data.listAll.length}} key={index}></li>
                        })
                    }
                </ul>
                {
                    props.data.listAll.map((item, index) => {
                        return <span key={index}>{indexCount.index+1}/{props.data.listAll.length}</span>
                    })
                }
            </div>
        </div>
    )
}

export default Index;