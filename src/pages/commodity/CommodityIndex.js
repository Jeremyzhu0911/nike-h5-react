import React, {useState, useEffect} from "react";
import axios from "axios";
import LocalStore from '../../util/localStore';
import {getUrlData} from "../../config/common";

import BigImg from "../../components/rotationbigimg";
import MinImg from "../../components/rotationminimg";

import "../../assets/css/pages/commodity/style.css";


const CommodityIndex = (props) => {

    const [loading, setLoading] = useState(true)

    const [userInfo,setUserInfo] = useState({
        isAj: !!getUrlData('jordan', props.location.search),
        store_id: parseInt(getUrlData('store_id', props.location.search)),
        store_name: '',
        openId: ''
    })

    const [state, setState] = useState({
        title: '最新上市',
        listAll: [],
        listSwiper: [],
        realListSwiper: [],
        listBox: [],
        listSBox: [],
    })

    useEffect(() => {
        if(loading){
            axios.get("/product/default/index?store_id=" + userInfo.store_id).then(
                (res) => {
                    let resData = res.data;
                    if (Number(resData.code) === 200) {
                        setState({
                            ...state,
                            listAll: resData.data.data,
                        });
                        setUserInfo({
                            ...userInfo,
                            store_name: resData.data.store_info.store_name
                        })

                        LocalStore.setItem('store_id', userInfo.store_id);
                        LocalStore.setItem('isAj', userInfo.isAj);
                        LocalStore.setItem('store_name', resData.data.store_info.store_name);

                        setLoading(false)
                    }
                }
            )
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loading])

    const bundhankClick = () => {
        // props.history.push({pathname: "/commodity/list", state: { userInfo }})
        props.history.push("/commodity/list" + props.location.search)
    }

    if (loading){
        return (<div>正在加载...</div>)
    }

    return (
        <div className={userInfo.isAj ? "CommodityIndex jordan" : "CommodityIndex"}>
            <h2>{userInfo.store_name}</h2>
            <BigImg data={state}/>
            <h1>店铺新品<span onClick={bundhankClick}>全部主推产品</span></h1>
            <MinImg/>
        </div>
    )


}

export default CommodityIndex;
