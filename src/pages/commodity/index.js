import React, {useState, useEffect} from "react";
import axios from "axios";

import {getUrlData} from "../../config/common";

import BigImg from "../../components/rotationbigimg";
import MinImg from "../../components/rotationminimg";

import "../../assets/css/pages/commodity/style.css";


const CommodityIndex = (props) => {

    const [person,setPerson] = useState({
        title: '最新上市',
        listAll: [],
        listSwiper: [],
        realListSwiper: [],
        listBox: [],
        listSBox: [],
        isAj: !!getUrlData('jordan', props.location.search),
        store_id: parseInt(getUrlData('store_id', props.location.search)),
        store_name: '',
        openId: ''
    })

    useEffect( () => {
        axios.get("/product/default/index?store_id=" + person.store_id).then(
            (res) =>{
                let resData = res.data;
                setPerson({...person,listAll:resData.data.data,store_name:resData.data.store_info.store_name});
            }
        )
    },[person.store_id])

    const bundhankClick = () => {
        props.history.push({ pathname: '/commodity/list', state: { name: 'sunny' } })
    }

    return (
        <div className={person.isAj ? "CommodityIndex jordan":"CommodityIndex"}>
            <h2>{person.store_name}</h2>
            <BigImg data={person}/>
            <h1>店铺新品<span onClick={bundhankClick}>全部主推产品</span></h1>
            <MinImg/>
        </div>
    )
}

export default CommodityIndex;
