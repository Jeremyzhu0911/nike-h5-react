import React, {useState, useEffect} from "react";
import cookie from 'react-cookies';
import axios from "axios";
import {getUrlData} from "../../util/getUrlData";

import BigImg from "../../components/Rotationbigimg";
import MinImg from "../../components/RotationMinImg";

const CommodityIndex = (props) => {

    const [loading, setLoading] = useState(true)

    const [CommodityIndexData, setCommodityIndexData] = useState({
        title: '最新上市',
        listAll: [],
        listSwiper: [],
        realListSwiper: [],
        listBox: [],
        listSBox: [],
    })

    useEffect(() => {
        if (loading) {
            axios.get("/product/default/index?store_id=" + getUrlData('store_id')).then(
                (res) => {
                    let resData = res.data;
                    if (Number(resData.code) === 200) {
                        setCommodityIndexData({
                            ...CommodityIndexData,
                            listAll: resData.data.data,
                        });

                        cookie.save('store_name', resData.data.store_info.store_name)

                        setLoading(false)
                    }
                },
                (error)=>{
                    console.log(error)
                    props.history.push('/500');
                }
            )
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loading])


    if (loading) {
        return (<div>正在加载...</div>)
    }

    return (
        <div className={!!getUrlData('jordan') ? "CommodityIndex jordan" : "CommodityIndex"}>
            <h2>{cookie.load('store_name')}</h2>
            <BigImg {...props} data={CommodityIndexData}/>
            <h1>店铺新品<span onClick={() => {
                props.history.push("/commodity/list" + props.location.search)
            }}>全部主推产品</span></h1>
            <MinImg/>
        </div>
    )


}

export default CommodityIndex;
