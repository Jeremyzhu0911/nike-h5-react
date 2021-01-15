import React, {useState, useEffect} from 'react';
import img from "../assets/images/Bitmap Copy.png";
import {getUrlData} from "../util/getUrlData";

const Rotationbigimg = (props) => {

    const [indexCount, setIndexCount] = useState({
        index: 0
    })

    useEffect(()=>{
        setIndexCount({...indexCount, index:indexCount.index})
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[indexCount.index])

    return (
        <div className={!!getUrlData('jordan') ? "RotationBigImg jordan":"RotationBigImg"}>
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

export default Rotationbigimg;