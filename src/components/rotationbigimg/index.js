import React, {useState, useEffect} from 'react';
import "../../assets/css/components/rotationbigimg/style.css";
import img from "../../assets/images/Bitmap Copy.png";

const Index = (props) => {

    const [commodityList, setCommodityList] = useState({
        index_count: 0
    })

    useEffect(()=>{
        setCommodityList({...commodityList, index_count:commodityList.index_count})
    },[commodityList.index_count])

    console.log(commodityList)

    return (
        <div className="RotationBigImg">
            <div className="carousel">
                <div className="carousel-box">
                    {
                        props.data.map((item, index) => {
                            return <div className="carousel-item" key={index}>
                                <img alt={''} onClick={()=>{setCommodityList({...commodityList, index_count:index})}} src={item.image_path}/>
                            </div>
                        })
                    }
                </div>
            </div>
            <div className="index-container">
                <ul>
                    {
                        props.data.map((item, index) => {
                            return <li className={index === commodityList.index_count ? 'selected' : ''} style={{width:100/props.data.length}} key={index}></li>
                        })
                    }
                </ul>
                {
                    props.data.map((item, index) => {
                        return <span key={index}>{commodityList.index_count+1}/{props.data.length}</span>
                    })
                }
            </div>
        </div>
    )
}

export default Index;